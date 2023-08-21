import { Router, Request, Response, NextFunction } from 'express';

import config from '../libs/utils/config';

import passport from 'passport';

const spotifyRouter = Router();

spotifyRouter.get(
  '/users/:user_id/playlists',
  passport.authenticate('spotify'),
  async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  }
);
