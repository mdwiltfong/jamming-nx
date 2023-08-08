import axios from 'axios';
import { axiosOptions } from '../../types/types';
import config from './config';

interface AccessTokenResponse {
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
  };
}

export default class SpotifyHandler {
  private static token: string = '';
  private static apiURL: URL = new URL(config.SPOTIFY_API_URL);
  private static accountsURL: URL = new URL(config.SPOTIFY_ACCOUNTS_URL);
  constructor() {}
  private static async spotifyAPIRequest(
    httpMethod: 'GET' | 'PUT' | 'DELETE' | 'POST',
    endpoint: string,
    data?: any
  ): Promise<any> {
    try {
      const url = new URL(endpoint, this.apiURL.href);
      const axiosOptions: axiosOptions = {
        method: httpMethod,
        url: url.href,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(config.CLIENT_ID + ':' + config.CLIENT_SECRET).toString(
              'base64'
            ),
        },
      };
      data ? (axiosOptions['data'] = data) : null;
      const response = await axios(axiosOptions);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  public static async getAccessToken(
    authCode: string
  ): Promise<AccessTokenResponse> {
    try {
      const body = {
        code: authCode,
        redirect_uri: config.REDIRECT_URI,
        grant_type: 'authorization_code',
      };
      return this.spotifyAPIRequest(
        'POST',
        'https://accounts.spotify.com/api/token',
        body
      );
    } catch (error) {
      console.error(error);
    }
  }
  public static setToken(token: string): void {
    this.token = token;
  }
}
