import axios from 'axios';
import { axiosOptions } from '../../types/types';
import config from './config';
export default class SpotifyHandler {
  private static token: string = '';
  private static apiURL: URL = new URL(config.SPOTIFY_API_URL);
  private static accountsURL: URL = new URL(config.SPOTIFY_ACCOUNTS_URL);
  constructor() {}
  private static async spotifyAPIRequest(
    httpMethod: 'GET' | 'PUT' | 'DELETE' | 'POST',
    endpoint: string,
    data?: any
  ) {
    try {
      const url = new URL(endpoint, this.apiURL.href);
      const axiosOptions: axiosOptions = {
        method: httpMethod,
        url: url.href,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      data ? (axiosOptions['data'] = data) : null;
      const response = await axios(axiosOptions);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  private static async getToken(): Promise<String> {
    if (this.token.length > 0) {
      return this.token;
    }
    return this.token;
  }
}
