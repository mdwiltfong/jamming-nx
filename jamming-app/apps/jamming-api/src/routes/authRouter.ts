import { Router, Request, Response, NextFunction } from 'express';
import config from '../libs/utils/config';
import querystring from 'querystring';
import { request } from 'http';
import SpotifyHandler from '../libs/utils/SpotifyHandler';
const authRouter = Router();
authRouter.get('/login', (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: #7 Create a function that will hash the session cookie with a salt. We will also have to verify that the generated state matches the state in the response
    const state = 'some-random-state';
    const scope = 'playlist-modify-public user-read-email user-read-private';
    res.redirect(
      'https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: config.CLIENT_ID,
          scope: scope,
          redirect_uri: config.REDIRECT_URI,
          state: state,
        })
    );
  } catch (error) {
    next(error);
  }
});

authRouter.get(
  '/callback',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const code = (req.query.code as string) || null;
      const state = req.query.state || null;
      const storedState = req.cookies || null;
      if (state === null) {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'state_mismatch',
            })
        );
      } else {
        const tokenResponse = await SpotifyHandler.getAccessToken(code);
        SpotifyHandler.setToken(tokenResponse.data.access_token);
        res.redirect('/status');
      }
    } catch (error) {
      next(error);
    }
  }
);

export default authRouter;
