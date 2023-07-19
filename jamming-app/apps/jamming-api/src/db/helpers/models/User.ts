import { ObjectId } from 'mongodb';

export interface IUser<T> {
  _id: T;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
}

export interface IPlaylist<T> {
  _id: T;
  userId: T;
  name: String;
  spotifyUserId: String;
  spotifyPlaylistId: String;
  imageUrl: String;
}

export class User implements IUser<ObjectId> {
  constructor(
    public _id: ObjectId,
    public firstName: String,
    public lastName: String,
    public email: String,
    public password: String
  ) {}
}

export class Playlist implements IPlaylist<ObjectId> {
  constructor(
    public _id: ObjectId,
    public userId: ObjectId,
    public name: String,
    public spotifyUserId: String,
    public spotifyPlaylistId: String,
    public imageUrl: String
  ) {}
}
