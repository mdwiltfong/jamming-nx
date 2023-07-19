import * as yup from 'yup';
import { IPlaylist, IUser } from '../db/helpers/models/User';

export const userSchema: yup.ObjectSchema<IUser<String>> = yup.object({
  _id: yup.string(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const playlistSchema: yup.ObjectSchema<IPlaylist<String>> = yup.object({
  _id: yup.string(),
  userId: yup.string().required(),
  name: yup.string().required(),
  spotifyUserId: yup.string().required(),
  spotifyPlaylistId: yup.string().required(),
  imageUrl: yup.string().required(),
});
