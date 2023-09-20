import SpotifyHandler from './SpotifyHandler';
import axios, { AxiosStatic } from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<AxiosStatic> & jest.Mock;

describe('SpotifyHandler Tests', () => {
  test('Handler throws error if no token or userID is provided', () => {
    expect(() => {
      try {
        SpotifyHandler.getPlaylists();
      } catch (error) {
        expect(error.message).toBe('No token or user ID set');
      }
    });
  });
  describe('getPlaylists', () => {
    test('returns an array of playlists', async () => {
      const mockResponse = {
        data: {
          items: [
            {
              collaborative: false,
              description: 'string',
              external_urls: {
                spotify: 'string',
              },
              href: 'string',
              id: 'string',
              images: [
                {
                  url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228',
                  height: 300,
                  width: 300,
                },
              ],
              name: 'string',
              owner: {
                external_urls: {
                  spotify: 'string',
                },
                followers: {
                  href: 'string',
                  total: 0,
                },
                href: 'string',
                id: 'string',
                type: 'user',
                uri: 'string',
                display_name: 'string',
              },
              public: false,
              snapshot_id: 'string',
              tracks: {
                href: 'string',
                total: 0,
              },
              type: 'string',
              uri: 'string',
            },
          ],
        },
      };
      mockedAxios.mockResolvedValue(mockResponse);

      SpotifyHandler.setToken('testToken');
      SpotifyHandler.setSpotifyUserId('testUserId');
      const playlists = await SpotifyHandler.getPlaylists();

      expect(Array.isArray(playlists)).toBe(true);
      expect(playlists.length).toBe(1);
      expect(playlists[0].id).toBe('string');
      expect(playlists[0].name).toBe('string');
    });
  });
});
