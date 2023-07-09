import app from './server';
import dotenv from 'dotenv';

const dotenvConfig = dotenv.config({
  path: __dirname + '/.env',
});

console.log(dotenvConfig);

const PORT = process.env.PORT || 3000;

export const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/ `);
});

export default app;
