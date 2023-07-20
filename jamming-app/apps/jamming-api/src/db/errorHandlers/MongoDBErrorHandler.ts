import colors from 'colors';
import {
  MongoNetworkError,
  MongoParseError,
  MongoServerSelectionError,
  MongoNetworkTimeoutError,
  MongoServerError,
} from 'mongodb';

export default class MongoDBErrorHandler extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
