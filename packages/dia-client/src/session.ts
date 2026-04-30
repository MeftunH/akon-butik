import { DiaApiError, DiaInvalidSessionError, DiaTransportError } from './errors.js';
import { postJson } from './transport.js';
import type { DiaResponse } from './types.js';

export interface SessionConfig {
  baseUrl: string; // e.g. https://akonbutik.ws.dia.com.tr/api/v3
  username: string;
  password: string;
  apiKey: string;
  lang?: 'tr' | 'en';
  /** When true, evicts any prior session for this user. Required when running a single worker. */
  disconnectSameUser?: boolean;
}

interface LoginResponse {
  code: string;
  msg?: string;
  session_id?: string;
}

/**
 * Manages a single DIA session per process.
 *
 * DIA constraint: when `disconnect_same_user: true`, only one active session per user is
 * possible — any concurrent worker using the same DIA user will evict each other. Therefore
 * **one DIA user per worker process**, and we keep that user's session alive here.
 */
export class SessionManager {
  private sessionId: string | null = null;
  private loginInFlight: Promise<string> | null = null;

  constructor(private readonly config: SessionConfig) {}

  /** Returns a valid session_id, logging in if needed. */
  async getSessionId(): Promise<string> {
    if (this.sessionId) return this.sessionId;
    return this.login();
  }

  /** Force a re-login. Used by withSession() on INVALID_SESSION. */
  async login(): Promise<string> {
    this.loginInFlight ??= this.doLogin().finally(() => {
      this.loginInFlight = null;
    });
    return this.loginInFlight;
  }

  private async doLogin(): Promise<string> {
    const url = `${this.config.baseUrl}/sis/json`;
    const payload = {
      login: {
        username: this.config.username,
        password: this.config.password,
        disconnect_same_user: this.config.disconnectSameUser ?? true,
        lang: this.config.lang ?? 'tr',
        params: { apikey: this.config.apiKey },
      },
    };
    const res = await postJson<LoginResponse>(url, payload);
    if (res.code !== '200' || !res.session_id) {
      throw new DiaApiError(res.code, res.msg ?? 'unknown login error', {
        service: 'login',
        payload,
      });
    }
    this.sessionId = res.session_id;
    return res.session_id;
  }

  /**
   * Call a DIA service. Auto-recovers from INVALID_SESSION exactly once by re-logging in
   * and retrying. Other DIA errors propagate to the caller.
   */
  async call<TResult>(
    module: 'sis' | 'scf',
    service: string,
    payload: Record<string, unknown>,
    options: { skipSession?: boolean } = {},
  ): Promise<TResult> {
    const url = `${this.config.baseUrl}/${module}/json`;
    const sessionId = options.skipSession ? undefined : await this.getSessionId();
    const body = { [service]: { ...payload, ...(sessionId && { session_id: sessionId }) } };

    let res: DiaResponse<TResult>;
    try {
      res = await postJson<DiaResponse<TResult>>(url, body);
    } catch (err) {
      if (err instanceof DiaTransportError) throw err;
      throw new DiaTransportError(String(err), err);
    }

    if (res.code === '200' && res.result !== undefined) {
      return res.result;
    }

    if (isInvalidSessionCode(res.code) && !options.skipSession) {
      // re-login and retry exactly once
      this.sessionId = null;
      await this.login();
      const retryBody = {
        [service]: { ...payload, session_id: await this.getSessionId() },
      };
      const retry = await postJson<DiaResponse<TResult>>(url, retryBody);
      if (retry.code === '200' && retry.result !== undefined) {
        return retry.result;
      }
      if (isInvalidSessionCode(retry.code)) {
        throw new DiaInvalidSessionError(retry.code);
      }
      throw new DiaApiError(retry.code, retry.msg ?? 'unknown error', {
        service,
        payload: retryBody,
      });
    }

    throw new DiaApiError(res.code, res.msg ?? 'unknown error', { service, payload: body });
  }
}

function isInvalidSessionCode(code: string): boolean {
  // DIA documents these codes as session-related; widen the set if more turn up in production.
  return code === '404' || code === 'INVALID_SESSION' || code === 'SESSION_EXPIRED';
}
