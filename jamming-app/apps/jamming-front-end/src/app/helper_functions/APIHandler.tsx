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
  withCredentials: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  username: string;
  profileUrl: string;
  photos: Array<{ value: string }>;
}
export interface PlayList {
  id: string;
  name: string;
  description: string;
}
console.log(import.meta.env.VITE_API_URL);

interface HTTPResponse {
  data: UserDataHTTPResponse;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request: any;
}

interface UserDataHTTPResponse {
  user: User | null;
}

export default class APIHandler<T extends User, PlayList> {
  private static token: string = '';
  private static apiURL: URL = new URL(import.meta.env.VITE_API_URL as string);
  constructor() {}
  private static async httpRequest<HTTPResponse>(
    httpMethod: 'GET' | 'PUT' | 'DELETE' | 'POST',
    endpoint: string,
    data?: any
  ): Promise<HTTPResponse> {
    try {
      const url = new URL(endpoint, this.apiURL.href);
      const axiosOptions: axiosOptions = {
        method: httpMethod,
        url: url.href,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true,
      };
      data ? (axiosOptions['data'] = data) : null;
      const response = (await axios(axiosOptions)) as HTTPResponse;
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public static async getCurrentSession(): Promise<User | null> {
    try {
      const response = await this.httpRequest<HTTPResponse>(
        'GET',
        this.apiURL.href + 'auth/current-session'
      );
      return response.data.user as User;
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
