import express, { Express, NextFunction, Request, Response } from 'express';
import colors from 'colors';
import BaseError from '../db/errorHandlers/BaseError';
import util from 'util';
const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    console.log(colors.red.underline('Middleware Error Handling'));
    const errStatus = err.httpCode;
    const errMsg = err.message;
    console.error(util.inspect(err.stack, false, null, true));
    res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
    });
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default ErrorHandler;
