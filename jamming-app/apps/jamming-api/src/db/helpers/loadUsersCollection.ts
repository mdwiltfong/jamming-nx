import db from '../helpers/db.helper';
import dotenv from 'dotenv';
console.log(dotenv.config());

db.loadCollection('users', 'cluster0');
