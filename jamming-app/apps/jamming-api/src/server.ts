import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import userRouter from './routes/userRouter';
import { validateURL } from './schemas/userSchema';
import playlistRouter from './routes/playlistRouter';
import ErrorHandler from './middleware/ErrorHandler';
import authRouter from './routes/authRouter';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { Strategy } from 'passport-spotify';
import config from './libs/utils/config';
import cors from 'cors';
const app: Express = express();
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: config.MONGODB_URI,
      collectionName: 'sessions',
    }),
  })
);
passport.use(
  new Strategy(
    {
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: config.REDIRECT_URI,
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      done(null, profile);
    }
  )
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.get('/status', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});
app.use('/auth', authRouter);
app.use('/users', validateURL, userRouter);
app.use('/playlists', validateURL, playlistRouter);
app.use(ErrorHandler);

export default app;
