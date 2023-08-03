import { v4 as uuidv4 } from 'uuid';
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
// Mockusers with "password" as their password
const mockUsers: User[] = [
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
interface Playlist {
  _id: string;
  userId: User['_id'];
  name: string;
  spotifyUserId: string;
  spotifyPlayListId: string;
  imageUrl: string;
}
const mockPlaylists: Playlist[] = [
  {
    _id: 'd06e047a-0290-405b-bf39-a42c3bbff280',
    userId: mockUsers[0]._id,
    name: 'Playlist 1',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: 'b4e59214-c124-42a0-bf9c-578ef9dbe9b2',
    userId: mockUsers[1]._id,
    name: 'Playlist 2',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: '24b72799-b9d3-488b-a157-21d8c096ab89',
    userId: mockUsers[2]._id,
    name: 'Playlist 3',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: '979a9bd7-14a4-4022-9ed2-ee1ac05e31a2',
    userId: mockUsers[3]._id,
    name: 'Playlist 4',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
  {
    _id: 'f38307b4-f717-4553-90d0-916a33943e1b',
    userId: mockUsers[4]._id,
    name: 'Playlist 5',
    spotifyUserId: '6rqhFgbbKwnb9MLmUQDhG6',
    spotifyPlayListId: '37i9dQZF1DXcBWIGoYBM5M',
    imageUrl:
      'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
  },
];

interface Token {
  _id: string;
  accessToken: string;
  refreshToken: string;
  userId: string;
  clientId: string;
  expiresAt: Date;
}

const mockTokens: Token[] = [
  {
    _id: 'd06e047a-0290-405b-bf39-a42c3bbff280',
    accessToken: uuidv4(),
    refreshToken: uuidv4(),
    userId: '40fdf6ee-8403-4f5a-bc62-020dab7c43a8',
    clientId: '987faee9-8a1b-4651-9f58-d82933e5053b',
    expiresAt: new Date(Date.now() + 3600 * 1000), // Expires in 1 hour
  },
  {
    _id: 'b4e59214-c124-42a0-bf9c-578ef9dbe9b2',
    accessToken: uuidv4(),
    refreshToken: uuidv4(),
    userId: '269ae06f-fb32-4935-85e1-3df76e42d92f',
    clientId: '91659038-4dfe-4bc4-a997-31f6f1b2598d',
    expiresAt: new Date(Date.now() + 3600 * 1000), // Expires in 1 hour
  },
  {
    _id: '24b72799-b9d3-488b-a157-21d8c096ab89',
    accessToken: uuidv4(),
    refreshToken: uuidv4(),
    userId: 'adf3677a-5377-49ca-8338-071daa0ed211',
    clientId: '40fdf6ee-8403-4f5a-bc62-020dab7c43a8',
    expiresAt: new Date(Date.now() + 3600 * 1000), // Expires in 1 hour
  },
];

export const mockData: {
  mockUsers: User[];
  mockPlaylists: Playlist[];
  mockTokens: Token[];
} = {
  mockUsers,
  mockPlaylists,
  mockTokens,
};
