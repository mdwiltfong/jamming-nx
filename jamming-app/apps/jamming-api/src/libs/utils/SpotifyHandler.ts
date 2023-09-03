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
  private static spotifyUserId: string = '';
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
          Authorization: 'Bearer ' + this.token,
        },
      };
      data ? (axiosOptions['data'] = data) : null;
      const response = (await axios(axiosOptions)).data;
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  public static async getPlaylists(): Promise<any> {
    try {
      const response = await this.spotifyAPIRequest(
        'GET',
        `/v1/users/${this.spotifyUserId}/playlists`
      );
      return response.items;
    } catch (error) {
      console.error(error);
    }
  }
  public static setSpotifyUserId(id: string): void {
    this.spotifyUserId = id;
  }
  public static setToken(token: string): void {
    this.token = token;
  }
}
