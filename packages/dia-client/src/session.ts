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

/**
 * DIA's `sis_login` response shape (API v3): on success, `code === "200"`
 * and the **session id is returned in `msg`**, not in a dedicated field.
 * On failure, `msg` carries the human error and `code` is non-200.
 */
interface LoginResponse {
  code: string;
  msg?: string;
  /** Some older DIA deployments returned session_id here; tolerate both. */
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
    const sessionId = res.session_id ?? res.msg;
    if (res.code !== '200' || !sessionId) {
      throw new DiaApiError(res.code, res.msg ?? 'unknown login error', {
        service: 'login',
        payload,
      });
    }
    this.sessionId = sessionId;
    return sessionId;
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

    if (isSessionError(res) && !options.skipSession) {
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
      if (isSessionError(retry)) {
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

function isSessionError<T>(res: DiaResponse<T>): boolean {
  // DIA's session-expired path can surface in two ways depending on the
  // service and tenant config:
  //   1. {code:"INVALID_SESSION"} or {code:"SESSION_EXPIRED"} — the original
  //      documented form
  //   2. {code:"401", msg:"INVALID_SESSION"} — what akonbutik.ws.dia.com.tr
  //      returns in practice when the session id was evicted by another
  //      login (`disconnect_same_user: true`)
  // Treat both as recoverable so the auto re-login kicks in.
  if (res.code === '404' || res.code === 'INVALID_SESSION' || res.code === 'SESSION_EXPIRED') {
    return true;
  }
  if (res.code === '401' && res.msg && /INVALID_SESSION|SESSION_EXPIRED/i.test(res.msg)) {
    return true;
  }
  return false;
}
