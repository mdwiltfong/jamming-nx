import dotenv from 'dotenv';
import path from 'path';

const envFile = dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

console.log(envFile);

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  EXPRESS_URL_DEV: string | undefined;
  SPOTIFY_ACCOUNTS_URL: string;
  SPOTIFY_API_URL: string;
  MONGODB_URI: string;
  CLIENT_ID: string;
  REDIRECT_URI: string;
  CLIENT_SECRET: string;
}

interface Config extends ENV {}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
    EXPRESS_URL_DEV: process.env.EXPRESS_URL_DEV,
    SPOTIFY_ACCOUNTS_URL: process.env.SPOTIFY_ACCOUNTS_URL,
    SPOTIFY_API_URL: process.env.SPOTIFY_API_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    CLIENT_ID: process.env.CLIENT_ID,
    REDIRECT_URI: process.env.REDIRECT_URI,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing value for ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
