import dotenv from 'dotenv';

const envFile = dotenv.config({
  path: process.cwd() + '/.env',
});

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  EXPRESS_URL_DEV: string | undefined;
  SPOTIFY_ACCOUNTS_URL: string;
  SPOTIFY_API_URL: string;
  MONGODB_URI: string;
}

interface Config extends ENV {}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    EXPRESS_URL_DEV: process.env.EXPRESS_URL_DEV,
    SPOTIFY_ACCOUNTS_URL: process.env.SPOTIFY_ACCOUNTS_URL,
    SPOTIFY_API_URL: process.env.SPOTIFY_API_URL,
    MONGODB_URI: process.env.MONGODB_URI,
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
