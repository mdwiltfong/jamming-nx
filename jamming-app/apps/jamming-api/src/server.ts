import express, { Express, Request, Response } from 'express';
import { Model } from './db/helpers/db.helper';
import { User } from './db/helpers/models/User';
import MongoDBErrorHandler from './db/errorHandlers/MongoDBErrorHandler';
import { ObjectId } from 'mongodb';

const userModel = new Model<User>('users');
const app: Express = express();

app.get('/status', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});

app.get('/users', async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { id } = body;
    const user = await userModel.findDocument(
      {
        _id: new ObjectId(id),
      },
      { name: 'users' }
    );
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof MongoDBErrorHandler) {
      throw new Error(error.message);
    }
  }
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.json({ message: err.message });
    console.error(err);
  }
);

export default app;
