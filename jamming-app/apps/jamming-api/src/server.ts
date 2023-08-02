import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import userRouter from './routes/userRouter';
import { validateURL } from './schemas/userSchema';
import playlistRouter from './routes/playlistRouter';
import ErrorHandler from './middleware/ErrorHandler';
const app: Express = express();
app.use(morgan('combined'));
app.get('/status', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});

app.use('/users', validateURL, userRouter);
app.use('/playlists', validateURL, playlistRouter);
app.use(ErrorHandler);

export default app;
