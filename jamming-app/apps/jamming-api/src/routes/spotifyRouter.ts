import { Router, Request, Response, NextFunction } from 'express';

import config from '../libs/utils/config';

import passport from 'passport';
import SpotifyHandler from '../libs/utils/SpotifyHandler';
import { SearchItemType } from '../types/types';

const spotifyRouter = Router();

interface SearchRequest {
  q: string;
  type: SearchItemType;
}

spotifyRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const searchRequest = req.body.data as SearchRequest;
      console.log(req);
      const response = await SpotifyHandler.search(
        searchRequest.q,
        searchRequest.type
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default spotifyRouter;
