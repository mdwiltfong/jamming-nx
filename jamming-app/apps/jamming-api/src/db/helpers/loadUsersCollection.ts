import db from '../helpers/db.helper';
import dotenv from 'dotenv';
import { validationSchemas } from './collectionSchemas';
console.log(dotenv.config());

db.loadCollection('users', validationSchemas.userValidationSchema);

db.loadCollection('playlists', validationSchemas.playlistValidationSchema);
