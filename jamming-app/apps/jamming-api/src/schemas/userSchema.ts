import * as yup from 'yup';
import { IUser } from '../db/helpers/models/User';

export const userPayloadSchema: yup.ObjectSchema<IUser<String>> = yup.object({
  _id: yup.string(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

yup.addMethod(yup.string, 'validateURL', function validateURL(message) {
  return this.matches(/^\/users\/[a-zA-Z0-9]+$/, {
    message,
    name: 'email',
    excludeEmptyString: true,
  });
});

yup.string().validateURL('Invalid URL');
