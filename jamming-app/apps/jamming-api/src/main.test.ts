import app from './main';
import supertest, { Response } from 'supertest';
import { mockData } from './db/helpers/mockData';
import MongoDBHelper from './db/helpers/db.helper';

import { validationSchemas } from './db/helpers/collectionSchemas';

beforeAll(async () => {
  await MongoDBHelper.loadCollection(
    'users',
    validationSchemas.userValidationSchema,
    mockData.mockUsers
  );
  await MongoDBHelper.loadCollection(
    'playlists',
    validationSchemas.playlistValidationSchema,
    mockData.mockPlaylists
  );
  await MongoDBHelper.loadCollection(
    'sessions',
    validationSchemas.sessionSchema
  );
});
describe('Server Tests', () => {
  test('Server is running', async () => {
    const response: Response = await supertest(app).get('/status');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: 'Hello World',
    });
  });
});

describe('User Router Tests', () => {
  test("GET /users/:id returns a user's information", async () => {
    const mockUser = mockData.mockUsers[0];
    console.log(mockUser);
    const response: Response = await supertest(app).get(
      `/users/${mockData.mockUsers[0]._id}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
    });
  });
  test("GET /users/:id returns a 404 if the user doesn't exist", async () => {
    const response: Response = await supertest(app).get(
      '/users/269ae06f-fb32-4935-85e1-3df76e42d92a'
    );
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      success: false,
      status: 404,
      message: 'User not found with id 269ae06f-fb32-4935-85e1-3df76e42d92a',
    });
  });
  test('GET /users/:id returns a 400 if the user ID is not a valid UUID', async () => {
    const response: Response = await supertest(app).get(
      '/users/not-a-valid-uuid'
    );
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      status: 400,
      message: 'Invalid URL format',
    });
  });
});

describe.only('Playlist Router Tests', () => {
  test.skip('Only validated requests can be made to /playlists', async () => {
    const response: Response = await supertest(app).post('/playlists').send({
      name: 'Test Playlist',
      spotifyPlayListId: '123456789',
      spotifyUserId: '123456789',
      imageUrl:
        'https://i.scdn.co/image/ab67706f00000003d0f0e3e0e5e1e0e5e1e0e5e1',
    });
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      status: 400,
      message: 'Invalid request body',
    });
  });

  test.only("GET /playlists/:id returns a playlist's information", async () => {
    const mockPlaylist = mockData.mockPlaylists[0];
    const loggedInStatus = await supertest(app).get('/auth/login');
    console.log(loggedInStatus.headers['set-cookie']);
    const response: Response = await supertest(app)
      .get(`/playlists/${mockPlaylist._id}`)
      .set('Cookie', loggedInStatus.headers['set-cookie']);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      userId: expect.any(String),
      name: expect.any(String),
      spotifyPlaylistId: expect.any(String),
      spotifyUserId: expect.any(String),
      imageUrl: expect.any(String),
    });
  });
  test("GET /playlists/:id returns a 404 if the playlist doesn't exist", async () => {
    const response: Response = await supertest(app).get(
      '/playlists/269ae06f-fb32-4935-85e1-3df76e42d92a'
    );
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      success: false,
      status: 404,
      message:
        'Playlist not found with id 269ae06f-fb32-4935-85e1-3df76e42d92a',
    });
  });
  test('GET /playlists/:id returns a 400 if the playlist ID is not a valid UUID', async () => {
    const response: Response = await supertest(app).get(
      '/playlists/not-a-valid-uuid'
    );
    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      success: false,
      status: 400,
      message: 'Invalid URL format',
    });
  });
});
