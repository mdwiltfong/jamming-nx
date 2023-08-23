export interface IUser<T> {
  _id: T;
  spotifyID: string;
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

export class User implements IUser<String> {
  constructor(
    public _id: String,
    public spotifyID: string,
    public firstName: String,
    public lastName: String,
    public email: String,
    public password: String
  ) {}
}

export class Playlist implements IPlaylist<String> {
  constructor(
    public _id: String,
    public userId: String,
    public name: String,
    public spotifyUserId: String,
    public spotifyPlaylistId: String,
    public imageUrl: String
  ) {}
}
