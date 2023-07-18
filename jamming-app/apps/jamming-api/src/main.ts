import app from './server';
import config from './libs/utils/config';
import db from '../src/db/helpers/db.helper';
import color from 'colors';
const PORT = config.PORT;

export const httpServer = app.listen(PORT, () => {
  console.log(
    color.green(
      `Server is running on ${config.EXPRESS_URL_DEV + config.PORT}/ `
    )
  );
});

db.connect();
export default app;
