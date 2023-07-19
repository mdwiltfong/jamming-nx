import express, { Express, NextFunction, Request, Response } from 'express';
import { Model } from './db/helpers/db.helper';
import { User } from './db/helpers/models/User';
import { ObjectId } from 'mongodb';
import morgan from 'morgan';

const userModel = new Model<User>('users');
const app: Express = express();
app.use(morgan('tiny'));
app.get('/status', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});

app.get(
  '/users/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await userModel.findDocument(
        {
          _id: new ObjectId(id),
        },
        { name: 'users' }
      );
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
);

export default app;
