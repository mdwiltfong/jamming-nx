import colors from 'colors';
import {
  MongoNetworkError,
  MongoParseError,
  MongoServerSelectionError,
  MongoNetworkTimeoutError,
  MongoServerError,
} from 'mongodb';

export default class MongoDBErrorHandler extends Error {
  constructor(
    private error:
      | MongoNetworkError
      | MongoParseError
      | MongoServerSelectionError
      | MongoNetworkTimeoutError
      | MongoServerError
  ) {
    super(error.message);
    console.log(colors.underline.red(error.name));
    console.log(colors.red(error.errmsg));
    console.log(colors.red('Possble Causes:'));
    console.log(error.cause);
    Error.captureStackTrace(this, this.constructor);
  }
}
