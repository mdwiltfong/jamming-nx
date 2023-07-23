import { request } from 'http';
import app from './main';
import supertest, { Request, Response } from 'supertest';
import { mockData } from './db/helpers/mockData';
import MongoDBHelper from './db/helpers/db.helper';
import { userPayloadSchema } from './schemas/userSchema';
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
      '/users//269ae06f-fb32-4935-85e1-3df76e42d92a'
    );
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      errorCode: 400,
      errorSummary: 'User not found',
      errorLink: 'link',
      errorId: '1234',
    });
  });
});
