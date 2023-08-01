import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import userRouter from './routes/userRouter';
import { validateURL } from './schemas/userSchema';
import ServerErrorHandler from './db/helpers/error_handlers/ServerErrorHandler';
import playlistRouter from './routes/playlistRouter';
const app: Express = express();
app.use(morgan('combined'));
app.get('/status', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});

app.use('/users', validateURL, userRouter);
app.use('/playlists', validateURL, playlistRouter);
app.use(
  (
    err: ServerErrorHandler,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const respBody = {
      errorCode: err.errorCode,
      errorSummary: err.errorSummary,
      errorLink: err.errorLink,
      errorId: err.errorId,
    };
    res.status(err.errorHTTPCode).json(respBody);
  }
);

export default app;
