/** Base class for any error originating from the DIA client. */
export class DiaError extends Error {
  override name = 'DiaError';
}

/** Network/transport failure (DNS, TCP reset, timeout, non-200 HTTP). */
export class DiaTransportError extends DiaError {
  override name = 'DiaTransportError';
  constructor(
    message: string,
    override readonly cause?: unknown,
  ) {
    super(message);
  }
}

/** DIA returned a body but the session_id is invalid/expired. The caller should re-login and retry. */
export class DiaInvalidSessionError extends DiaError {
  override name = 'DiaInvalidSessionError';
  constructor(readonly diaCode: string) {
    super(`DIA session invalid (code=${diaCode})`);
  }
}

/** DIA returned a recognised non-success code (e.g. validation error, permission denied). */
export class DiaApiError extends DiaError {
  override name = 'DiaApiError';
  constructor(
    readonly diaCode: string,
    readonly diaMessage: string,
    readonly request: { service: string; payload: unknown },
  ) {
    super(`DIA ${request.service} failed: ${diaCode} ${diaMessage}`);
  }
}
