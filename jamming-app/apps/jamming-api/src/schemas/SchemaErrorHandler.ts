import BaseError from '../db/errorHandlers/BaseError';

// TODO: All error classes need to inherit from BaseError class
export default class SchemaErrorHandler extends BaseError {
  constructor(message: string) {
    super('Schema Validation Error', 400, message, true);
  }
}
