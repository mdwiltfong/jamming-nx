import db from '../helpers/db.helper';
import dotenv from 'dotenv';
import { validationSchemas } from './collectionSchemas';
import { mockData } from './mockData';
console.log(dotenv.config());

db.loadCollection(
  'users',
  validationSchemas.userValidationSchema,
  mockData.mockUsers
);
