import { Router, Request, Response, NextFunction } from 'express';
import config from '../libs/utils/config';
import passport from 'passport';
const authRouter = Router();
authRouter.get(
  '/login',
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'playlist-modify-public',
      'playlist-modify-private',
    ],
  })
);

authRouter.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    console.log('success');
    res.redirect(config.EXPRESS_URL_DEV + '4200');
  }
);

export default authRouter;
