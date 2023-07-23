import { Router, Request, Response, NextFunction } from 'express';
import { Model } from '../db/helpers/db.helper';
import { Playlist } from '../db/helpers/models/User';
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
      return res.status(200).json(playlist);
    } catch (error) {
      return next(error);
    }
  }
);

export default playlistRouter;
