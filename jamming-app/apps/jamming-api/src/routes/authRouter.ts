import { Router, Request, Response, NextFunction } from 'express';
import OAuth, { Falsey, PasswordModel, Token, Client } from 'oauth2-server';
const authRouter = Router();
const model: PasswordModel = {
  getAccessToken: async (
    accessToken: string,
    callback?: OAuth.Callback<OAuth.Token>
  ): Promise<Token | Falsey> => {
    // logic to retrieve access token from database
  },
  getClient: async (
    clientId: string,
    clientSecret: string
  ): Promise<Client | Falsey> => {
    // logic to retrieve client from database
  },
  saveToken: async (
    token: OAuth.Token,
    client: OAuth.Client,
    user: OAuth.User,
    callback?: OAuth.Callback<OAuth.Token>
  ): Promise<Token | Falsey> => {
    // logic to save token to database
  },
  getUser: async (
    username: string,
    password: string,
    callback?: OAuth.Callback<OAuth.Token>
  ): Promise<OAuth.User | Falsey> => {
    // logic to retrieve user from database
  },
  verifyScope: async (token: OAuth.Token): Promise<boolean> => {
    // logic to verify scope
  },
};

const oauth = new OAuth({
  model: model,
});

authRouter.use();
authRouter.get('/login', (req: Request, res: Response) => {});

export default authRouter;
