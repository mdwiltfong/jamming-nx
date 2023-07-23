export enum ErrorCodes {
  APIValidationError = 100,
  APIAuthenticationError = 200,
  APIIncorrectURLFormatError = 300,
}

interface IServerErrorHandler {
  errorCode: number;
  errorHTTPCode: number;
  errorSummary: string;
  errorLink: string;
  errorId: string;
}
export default class ServerErrorHandler
  extends Error
  implements IServerErrorHandler
{
  constructor(
    public errorCode: ErrorCodes,
    public errorHTTPCode: number,
    public errorSummary: string,
    public errorLink: string,
    public errorId: string
  ) {
    super(errorSummary);
  }
}
