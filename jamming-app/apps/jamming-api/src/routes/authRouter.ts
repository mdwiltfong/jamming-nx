import { Router, Request, Response, NextFunction } from 'express';
import OAuth, {
  Falsey,
  Token,
  Client,
  ClientCredentialsModel,
} from 'oauth2-server';
import { MongoDBHelper } from '../db/helpers/db.helper';
const authRouter = Router();
const model: ClientCredentialsModel = {
  getAccessToken: async (
    accessToken: string,
    callback?: OAuth.Callback<OAuth.Token>
  ): Promise<Token | Falsey> => {
    // logic to retrieve access token from database
    try {
      const token = await MongoDBHelper.findToken(accessToken);
      return token;
    } catch (error) {
      console.log(error);
    }
  },
  getClient: async (
    clientId: string,
    clientSecret: string
  ): Promise<Client | Falsey> => {
    // logic to retrieve client from database
    try {
      console.log(clientId, clientSecret);
      const client = await MongoDBHelper.findClient(clientId, clientSecret);
      return client;
    } catch (error) {
      console.log(error);
    }
  },
  saveToken: async (
    token: OAuth.Token,
    client: OAuth.Client,
    user: OAuth.User,
    callback?: OAuth.Callback<OAuth.Token>
  ): Promise<Token | Falsey> => {
    // logic to save token to database
    try {
      token.clientId = client.clientId;
      token.user = {
        username: user.username,
      };
      return await MongoDBHelper.saveAccessToken(token);
    } catch (error) {
      console.log(error);
    }
  },
  async getUserFromClient(client: OAuth.Client): Promise<OAuth.User | Falsey> {
    try {
      return await MongoDBHelper.findUser(client.clientId);
    } catch (error) {
      console.log(error);
    }
  },

  verifyScope: async (token: OAuth.Token, scope: string): Promise<boolean> => {
    // logic to verify scope
    return true;
  },
};

const oauth = new OAuth({
  model: model,
  allowBearerTokensInQueryString: true,
});

export const authenticateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = new OAuth.Request(req);
    const response = new OAuth.Response(res);
    return oauth.authenticate(request, response).then(() => next());
  } catch (error) {
    console.log(error);
  }
};

const obtainToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    const request = new OAuth.Request(req);
    const response = new OAuth.Response(res);
    return oauth
      .token(request, response)
      .then((token) => {
        res.json(token);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (error) {
    next(error);
  }
};

authRouter.use(obtainToken);
authRouter.get('/login', (req: Request, res: Response) => {});

export default authRouter;
