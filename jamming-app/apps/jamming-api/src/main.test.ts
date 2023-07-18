import { request } from 'http';
import app from './main';
import supertest, { Request, Response } from 'supertest';

describe('Server Tests', () => {
  test('Server is running', async () => {
    const response: Response = await supertest(app).get('/status');
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: 'Hello World',
    });
  });
});
