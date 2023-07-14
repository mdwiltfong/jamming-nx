import { MongoClient } from 'mongodb';
import MongoDBHelper from '../db.helper';
import color from 'colors';
import { validationSchemas } from '../collectionSchemas';
import { mockData } from '../mockData';
describe(color.cyan('MongoDBHelper connectivity tests'), () => {
  test('Function can connect to DB instance', async () => {
    try {
      const db = await MongoDBHelper.connect();
    } catch (error) {
      console.error(error);
    }
  });
  test('Function is able to disconnect from DB', async () => {
    try {
      const db = await MongoDBHelper.disconnect();
    } catch (error) {
      console.error(error);
    }
  });
});

describe(color.cyan('MongoDBHelp load collection'), () => {
  test('Helper Function can load User collection', async () => {
    try {
      await MongoDBHelper.loadCollection(
        'users',
        validationSchemas.userValidationSchema,
        mockData.mockUsers
      );
    } catch (error) {
      console.error(error);
    }
  });
  test('Helper function can load playlist collection', async () => {
    try {
      await MongoDBHelper.loadCollection(
        'playlists',
        validationSchemas.playlistValidationSchema,
        mockData.mockPlaylists
      );
    } catch (error) {
      console.log(error);
    }
  });
});
