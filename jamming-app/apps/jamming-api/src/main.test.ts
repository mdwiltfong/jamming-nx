import { request } from 'http';
import app from './main';
import supertest, { Request, Response } from 'supertest';
import { mockData } from './db/helpers/mockData';
describe('Server Tests', () => {
  test('Server is running', async () => {
    const response: Response = await supertest(app).get('/status');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: 'Hello World',
    });
  });
});

describe.only('User Router Tests', () => {
  test("GET /users/:id returns a user's information", async () => {
    const mockUser = mockData.mockUsers[0];
    console.log(mockUser);
    const response: Response = await supertest(app).get(
      `/users/${mockData.mockUsers[0]._id}`
    );
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response).toMatchObject({
      _id: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
    });
  });
});
