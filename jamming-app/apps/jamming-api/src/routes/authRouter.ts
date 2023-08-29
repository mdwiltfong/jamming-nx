import { Router, Request, Response, NextFunction } from 'express';
import config from '../libs/utils/config';
import passport from 'passport';
import { nextTick } from 'process';
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
    console.log(req.session);
    res.redirect(config.EXPRESS_URL_DEV + '4200' + '/profile');
  }
);

authRouter.get(
  '/current-session',
  (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ user: req.user });
    } else {
      res.status(200).json({ user: null });
    }
  }
);

export default authRouter;
