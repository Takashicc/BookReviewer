export const HttpCode = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;
type HttpCode = typeof HttpCode[keyof typeof HttpCode];

interface AppErrorArgs {
  message: string;
  name?: string;
  httpCode: HttpCode;
  isOperational?: boolean;
}

/**
 * Base Error class for all error classes
 */
export abstract class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean = true;

  constructor(args: AppErrorArgs) {
    super(args.message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name || "Error";
    this.httpCode = args.httpCode;
    if (args.isOperational !== undefined) {
      this.isOperational = args.isOperational;
    }

    Error.captureStackTrace(this);
  }
}

/**
 * Error class for book not found in api
 */
export class RakutenBookNotFoundError extends AppError {}

/**
 * Error class for too many requests in api
 */
export class RakutenBookTooManyRequestsError extends AppError {}

/**
 * Error class for system errors in api
 */
export class RakutenBookSystemError extends AppError {}

/**
 * Error class for system maintenance in api
 */
export class RakutenBookMaintenanceError extends AppError {}
