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
      'playlist-read-private',
      'playlist-read-collaborative',
    ],
  })
);

authRouter.get(
  '/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    console.log('success');
    res.redirect(config.EXPRESS_URL_DEV + '4200' + '/profile');
  }
);

authRouter.get('/current-session', (req: Request, res: Response) => {
  console.log('current session');
  console.log(req.session)
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(200).json({ user: null });
  }
});

authRouter.post(
  '/logout',
  (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ msg: 'Logged out' });
    });
  }
);

export default authRouter;
