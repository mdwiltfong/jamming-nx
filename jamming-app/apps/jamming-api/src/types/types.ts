export interface axiosOptions {
  method: 'GET' | 'PUT' | 'DELETE' | 'POST';
  url: string;
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  data?: any;
}

export enum SearchItemType {
  ALBUM = 'album',
  ARTIST = 'artist',
  PLAYLIST = 'playlist',
  TRACK = 'track',
}
