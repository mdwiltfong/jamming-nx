import SpotifyHandler from './SpotifyHandler';
import axios from 'axios';

jest.mock('axios');

describe('SpotifyHandler Tests', () => {
  describe('getPlaylists', () => {
    test('returns an array of playlists', async () => {
      const mockResponse = {
        data: {
          items: [
            { id: 'playlist1', name: 'Playlist 1' },
            { id: 'playlist2', name: 'Playlist 2' },
          ],
        },
      };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(
        mockResponse
      );

      const playlists = await SpotifyHandler.getPlaylists();

      expect(Array.isArray(playlists)).toBe(true);
      expect(playlists.length).toBe(2);
      expect(playlists[0].id).toBe('playlist1');
      expect(playlists[0].name).toBe('Playlist 1');
      expect(playlists[1].id).toBe('playlist2');
      expect(playlists[1].name).toBe('Playlist 2');
    });
  });
});
