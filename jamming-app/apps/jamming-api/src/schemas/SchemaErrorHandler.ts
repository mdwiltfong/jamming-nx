import colors from 'colors';
import ServerErrorHandler, {
  ErrorCodes,
} from '../db/helpers/error_handlers/ServerErrorHandler';

export default class SchemaErrorHandler extends ServerErrorHandler {
  constructor(message: string) {
    super(
      ErrorCodes.APIIncorrectURLFormatError,
      400,
      message,
      'Invalid URL',
      '1234'
    );
  }
}
