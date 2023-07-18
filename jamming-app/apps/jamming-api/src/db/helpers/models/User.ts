import { ObjectId } from 'mongodb';

export class User {
  constructor(
    public _id: ObjectId,
    public firstName: String,
    public lastName: String,
    public email: String,
    public password: String
  ) {}
}

export class Playlist {
  constructor(
    public _id: ObjectId,
    public userId: ObjectId,
    public name: String,
    public spotifyUserId: String,
    public spotifyPlaylistId: String,
    public imageUrl: String
  ) {}
}
