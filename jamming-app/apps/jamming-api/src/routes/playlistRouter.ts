import { Router, Request, Response, NextFunction } from 'express';
import { Model } from '../db/helpers/db.helper';
import { Playlist } from '../db/helpers/models/User';
import { DocumentNotFoundError } from '../db/helpers/error_handlers/DocumentNotFoundError';
import SpotifyHandler from '../libs/utils/SpotifyHandler';
const playlistModel = new Model<Playlist>('playlists');
const playlistRouter = Router();

playlistRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const playlist = await playlistModel.findDocument(
        {
          _id: id,
        },
        {
          name: 'playlists',
        }
      );
      if (playlist == null) {
        throw new DocumentNotFoundError(`Playlist not found with id ${id}`);
      }
      return res.status(200).json(playlist);
    } catch (error) {
      return next(error);
    }
  }
);

playlistRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const playlists = await SpotifyHandler.getPlaylists();
      return res.status(200).json(playlists);
    } catch (error) {}
  }
);

export default playlistRouter;
