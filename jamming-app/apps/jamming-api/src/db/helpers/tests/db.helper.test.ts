import { ObjectId } from 'mongodb';
import MongoDBHelper from '../db.helper';
import color from 'colors';
import { validationSchemas } from '../collectionSchemas';
import { mockData } from '../mockData';
import { User } from '../models/User';
describe(color.cyan('MongoDBHelper connectivity tests'), () => {
  test('Function can connect to DB instance', async () => {
    const db = await MongoDBHelper.connect();
  });
  test('Function is able to disconnect from DB', async () => {
    const db = await MongoDBHelper.disconnect();
  });
});

describe(color.cyan('MongoDBHelper can  load collection'), () => {
  test('Helper Function can load User collection', async () => {
    await MongoDBHelper.loadCollection(
      'users',
      validationSchemas.userValidationSchema,
      mockData.mockUsers
    );
  });
  test('Helper function can load playlist collection', async () => {
    await MongoDBHelper.loadCollection(
      'playlists',
      validationSchemas.playlistValidationSchema,
      mockData.mockPlaylists
    );
  });
  test('Helper can retrieve a single user', async () => {
    const user = await MongoDBHelper.findUser({ firstName: 'Emily' });
    expect(user).toMatchObject({
      _id: expect.any(ObjectId),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
    });
  });
  test('Helper can retrieve an array of users', async () => {
    const users = (await MongoDBHelper.findUsers()) as User[];
    expect(users.length).toBeGreaterThan(0);
  });
});
