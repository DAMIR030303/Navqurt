/**
 * Professional logger utility for error handling and logging
 * Supports development and production environments
 * Can be easily extended to integrate with Sentry or other error tracking services
 */

/* eslint-disable no-console */

interface LogContext {
  [key: string]: unknown
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  /**
   * Log error messages
   * In development: logs to console
   * In production: can be extended to send to error tracking service (e.g., Sentry)
   */
  error(message: string, error?: unknown, context?: LogContext): void {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error || '', context || '')
    } else {
      // Production: Send to error tracking service
      // TODO: Integrate with Sentry or similar service
      // Example: Sentry.captureException(error, { extra: { message, ...context } })
    }
  }

  /**
   * Log warning messages
   */
  warn(message: string, data?: unknown, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data || '', context || '')
    }
    // Production: Can be sent to monitoring service
  }

  /**
   * Log info messages
   */
  info(message: string, data?: unknown, context?: LogContext): void {
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, data || '', context || '')
    }
  }

  /**
   * Log debug messages (only in development)
   */
  debug(message: string, data?: unknown, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${message}`, data || '', context || '')
    }
  }
}

export const logger = new Logger()

