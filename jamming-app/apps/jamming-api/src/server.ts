import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/status', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.json({ message: err.message });
    console.error(err);
  }
);

export default app;
