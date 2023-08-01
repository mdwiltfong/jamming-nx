import express, { Express, NextFunction, Request, Response } from 'express';
import BaseError from '../db/errorHandlers/BaseError';
const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    console.log('Middleware Error Hadnling');
    const errStatus = err.httpCode || 500;
    const errMsg = err.message;
    res.status(errStatus).json({
      success: false,
      status: errStatus,
      message: errMsg,
      stack: err.stack,
    });
  } else {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default ErrorHandler;
