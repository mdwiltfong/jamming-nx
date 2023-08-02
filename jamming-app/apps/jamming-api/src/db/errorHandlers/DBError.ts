import BaseError from './BaseError';

class DBError extends BaseError {
  constructor(query, collectionName, httpCode, description, isOperational) {
    super('DB Error', httpCode, description, isOperational);
    Error.captureStackTrace(this, this.constructor);
  }
}
