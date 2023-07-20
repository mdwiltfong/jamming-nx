import { StringSchema } from 'yup';
declare module 'yup' {
  interface StringSchema {
    validateURL(url: string): this;
  }
}
