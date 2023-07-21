import { v4 as uuidv4 } from 'uuid';

// Mockusers with "password" as their password
const mockUsers = [
  {
    _id: '40fdf6ee-8403-4f5a-bc62-020dab7c43a8',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice.smith@example.com',
    password: 'U2FsdGVkX19nR6kAxLmriGbdDMIS/RF3NyrQyD5NwA4=',
  },
  {
    _id: '987faee9-8a1b-4651-9f58-d82933e5053b',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    password: 'U2FsdGVkX19nR6kAxLmriGbdDMIS/RF3NyrQyD5NwA4=',
  },
  {
    _id: '269ae06f-fb32-4935-85e1-3df76e42d92f',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    password: 'U2FsdGVkX19nR6kAxLmriGbdDMIS/RF3NyrQyD5NwA4=',
  },
  {
    _id: '91659038-4dfe-4bc4-a997-31f6f1b2598d',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@example.com',
    password: 'U2FsdGVkX19nR6kAxLmriGbdDMIS/RF3NyrQyD5NwA4=',
  },
  {
    _id: 'adf3677a-5377-49ca-8338-071daa0ed211',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    password: 'U2FsdGVkX19nR6kAxLmriGbdDMIS/RF3NyrQyD5NwA4=',
  },
];
const mockPlaylists = [
  {
    _id: uuidv4(),
    userId: mockUsers[0]._id,
    name: 'Playlist 1',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: uuidv4(),
    userId: mockUsers[1]._id,
    name: 'Playlist 2',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: uuidv4(),
    userId: mockUsers[2]._id,
    name: 'Playlist 3',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: uuidv4(),
    userId: mockUsers[3]._id,
    name: 'Playlist 4',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: uuidv4(),
    userId: mockUsers[4]._id,
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
