import db from '../helpers/db.helper';
import dotenv from 'dotenv';
import { validationSchemas } from './collectionSchemas';
import { mockData } from './mockData';
try {
  db.loadCollection(
    'playlists',
    validationSchemas.playlistValidationSchema,
    mockData.mockPlaylists
  );
} catch (error) {
  console.error(error);
}
