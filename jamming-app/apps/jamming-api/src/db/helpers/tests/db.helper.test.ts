import { ObjectId, WithId } from 'mongodb';
import MongoDBHelper, { Model } from '../db.helper';
import color from 'colors';
import { validationSchemas } from '../collectionSchemas';
import { mockData } from '../mockData';
import { Playlist, User } from '../models/User';
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
});

describe(color.cyan('Model generic tests'), () => {
  test('Can find user document', async () => {
    const userModel = new Model<User>('user');
    const user = (await userModel.findDocument(
      { firstName: 'Alice' },
      {
        name: 'users',
      }
    )) as User;

    expect(user).toMatchObject({
      _id: expect.any(ObjectId),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
    });
  });
  test('Can find playlist document', async () => {
    const playListModel = new Model<Playlist>('playlist');
    const playlist = await playListModel.findDocument(
      {
        name: 'Playlist 5',
      },
      {
        name: 'playlists',
      }
    );
    expect(playlist).toMatchObject({
      _id: expect.any(ObjectId),
      userId: expect.any(ObjectId),
      name: expect.any(String),
      spotifyPlayListId: expect.any(String),
      spotifyUserId: expect.any(String),
      imageUrl: expect.any(String),
    });
  });
});
