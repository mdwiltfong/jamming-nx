import db from '../helpers/db.helper';
import dotenv from 'dotenv';
console.log(dotenv.config());
db.connect();

const collection = db.getClient().db('cluster0').collection('users');

if (collection) {
  const deleteResult = collection.deleteMany({});
  console.log('Deleted documents =>', deleteResult);
}

db.getClient()
  .db('cluster0')
  .createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['username', 'password'],
        properties: {
          username: {
            bsonType: 'string',
            description: 'must be a string and is required',
          },
          password: {
            bsonType: 'string',
            minLength: 8,
            description:
              'must be a string at least 8 characters long, and is required',
          },
        },
      },
    },
  });

db.getClient().close();
