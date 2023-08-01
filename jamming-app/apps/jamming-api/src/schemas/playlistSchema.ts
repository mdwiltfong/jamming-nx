import * as yup from 'yup';
import { IPlaylist, IUser } from '../db/helpers/models/User';
export const playlistSchema: yup.ObjectSchema<IPlaylist<String>> = yup.object({
  _id: yup.string(),
  userId: yup.string().required(),
  name: yup.string().required(),
  spotifyUserId: yup.string().required(),
  spotifyPlaylistId: yup.string().required(),
  imageUrl: yup.string().required(),
});
