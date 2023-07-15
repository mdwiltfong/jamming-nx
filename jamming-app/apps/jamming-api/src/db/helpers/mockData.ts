import { ObjectId } from 'mongodb';

// Mockusers with "password" as their password
const mockUsers = [
  {
    _id: new ObjectId(1),
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    password: 'U2FsdGVkX19nR6kAxLmriGbdDMIS/RF3NyrQyD5NwA4=',
  },
  {
    _id: new ObjectId(2),
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    password: 'U2FsdGVkX19nR6kAxLmriGbdDMIS/RF3NyrQyD5NwA4=',
  },
  {
    _id: new ObjectId(3),
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    password: 'U2FsdGVkX19nR6kAxLmriGbdDMIS/RF3NyrQyD5NwA4=',
  },
  {
    _id: new ObjectId(4),
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@example.com',
    password: 'U2FsdGVkX19nR6kAxLmriGbdDMIS/RF3NyrQyD5NwA4=',
  },
  {
    _id: new ObjectId(5),
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    password: 'U2FsdGVkX19nR6kAxLmriGbdDMIS/RF3NyrQyD5NwA4=',
  },
];
const mockPlaylists = [
  {
    _id: new ObjectId(1),
    userId: new ObjectId(1),
    name: 'Playlist 1',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: new ObjectId(2),
    userId: new ObjectId(2),
    name: 'Playlist 2',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: new ObjectId(3),
    userId: new ObjectId(3),
    name: 'Playlist 3',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: new ObjectId(4),
    userId: new ObjectId(4),
    name: 'Playlist 4',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: new ObjectId(5),
    userId: new ObjectId(5),
    name: 'Playlist 5',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
];

export const mockData = {
  mockUsers,
  mockPlaylists,
};
