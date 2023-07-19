import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import userRouter from './routes/userRouter';
const app: Express = express();
app.use(morgan('tiny'));
app.get('/status', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});

app.use('/users', userRouter);

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
