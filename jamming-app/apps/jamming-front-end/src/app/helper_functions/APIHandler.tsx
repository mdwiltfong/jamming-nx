import axios from 'axios';
export interface loginCredentials {
  email: string;
  password: string;
}
export interface axiosOptions {
  method: 'GET' | 'PUT' | 'DELETE' | 'POST';
  url: string;
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  data?: any;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface PlayLists {
  id: string;
  name: string;
  description: string;
}
console.log(import.meta.env.VITE_API_URL);
export default class APIHandler<T extends User, PlayLists> {
  private static token: string = '';
  private static apiURL: URL = new URL(import.meta.env.VITE_API_URL as string);
  constructor() {}
  private static async httpRequest<T>(
    httpMethod: 'GET' | 'PUT' | 'DELETE' | 'POST',
    endpoint: string,
    data?: any
  ): Promise<T> {
    try {
      const url = new URL(endpoint, this.apiURL.href);
      const axiosOptions: axiosOptions = {
        method: httpMethod,
        url: url.href,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      data ? (axiosOptions['data'] = data) : null;
      const response = (await axios(axiosOptions)) as T;
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public static async login<T>(credentials: loginCredentials): Promise<T> {
    try {
      const response = await this.httpRequest<T>(
        'GET',
        this.apiURL.href + 'auth/login',
        credentials
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public static setToken(token: string): void {
    this.token = token;
  }
}
