import * as yup from 'yup';
import { IUser } from '../db/helpers/models/User';
import { NextFunction, Request, Response } from 'express';
import SchemaErrorHandler from './SchemaErrorHandler';

export const userPayloadSchema: yup.ObjectSchema<IUser<String>> = yup.object({
  _id: yup.string(),
  firstName: yup.string().required(),
  spotifyID: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const urlSchema = yup.string().test(
  'validUrl',
  (d: yup.ValidationError) => `${d.value} is not a valid URL`,
  (URL) => {
    const regex =
      /^\/[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i;
    return regex.test(URL);
  }
);

export async function validateURL(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const url = req.url;

    if (urlSchema.isValidSync(url)) {
      console.log(url + ' is a valid URL');
      next();
      return true;
    } else {
      throw new SchemaErrorHandler('Invalid URL format');
    }
  } catch (error) {
    next(error);
  }
}
