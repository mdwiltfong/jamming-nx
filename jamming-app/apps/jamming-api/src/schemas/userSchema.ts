import * as yup from 'yup';
import { IUser } from '../db/helpers/models/User';
import { NextFunction, Request, Response } from 'express';

export const userPayloadSchema: yup.ObjectSchema<IUser<String>> = yup.object({
  _id: yup.string(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

yup.addMethod(yup.string, 'validateURL', function validateURL(message) {
  return this.matches(/^\/users\/[0-9a-fA-F]+$/, {
    message,
    name: 'email',
    excludeEmptyString: true,
  });
});

yup.string().validateURL('Invalid URL');

export function validateURL(req: Request, res: Response, next: NextFunction) {
  try {
    const url = req.url;
    if (yup.string().validateURL(url)) {
      console.log(url + ' is a valid URL');
      next();
      return true;
    } else {
      throw new Error('Invalid URL');
    }
  } catch (error) {
    next(error);
  }
}
