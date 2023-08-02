import BaseError from './BaseError';

class ApiError extends BaseError {
  constructor(name, httpCode, description, isOperational) {
    super('API Error', httpCode, description, isOperational);
    Error.captureStackTrace(this, this.constructor);
  }
}
