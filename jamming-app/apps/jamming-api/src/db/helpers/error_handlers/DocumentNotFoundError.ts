import BaseError from '../../errorHandlers/BaseError';

export class DocumentNotFoundError extends BaseError {
  constructor(message: string) {
    super('Document Not Found Error', 404, message, true);
  }
}
