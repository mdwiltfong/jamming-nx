import { WithId } from 'mongodb';

export interface axiosOptions {
  method: 'GET' | 'PUT' | 'DELETE' | 'POST';
  url: string;
  headers: {
    'Content-Type': string;
  };
  data?: any;
}
