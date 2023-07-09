import app from './server';
import config from './libs/utils/config';
import db from '../src/db/helpers/db.helper';
const PORT = config.PORT;

export const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on ${config.EXPRESS_URL_DEV + config.PORT}/ `);
});

db.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('====Error connecting to MongoDB====');
    console.error(err);
  });

export default app;
