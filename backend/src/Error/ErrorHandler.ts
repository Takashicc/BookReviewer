import { Response } from "express";
import { AppError, HttpCode } from "./Error";
import log4js from "../config/log4js";

const logger = log4js.getLogger();

class ErrorHandler {
  /**
   * Check the error is trusted error or not.
   *
   * @param error Error
   * @returns true if trusted. false otherwise.
   */
  private isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }

    return false;
  }

  /**
   * Handle capturable and critical error.
   *
   * @param error Error
   * @param response Response
   */
  public handleError(error: Error | AppError, response?: Response): void {
    logger.error(error);
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as AppError, response);
    } else {
      this.handleCriticalError(error, response);
    }
  }

  /**
   * Handle capturable error.
   *
   * @param error Error
   * @param response Response
   */
  private handleTrustedError(error: AppError, response: Response): void {
    response.status(error.httpCode).json({ message: error.message });
  }

  /**
   * Handle critical error.
   *
   * @param error Error
   * @param response Response
   */
  private handleCriticalError(error: Error, response?: Response): void {
    if (response) {
      response
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
}

export const errorHandler = new ErrorHandler();
