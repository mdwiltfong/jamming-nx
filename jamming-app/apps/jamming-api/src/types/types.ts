import { Collection, CollectionInfo, ObjectId } from 'mongodb';
import { Playlist, User } from '../db/helpers/models/User';

export interface axiosOptions {
  method: 'GET' | 'PUT' | 'DELETE' | 'POST';
  url: string;
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  data?: any;
}
