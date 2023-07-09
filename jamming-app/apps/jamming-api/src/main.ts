import app from './server';
import config from './libs/utils/config';

const PORT = config.PORT;

export const httpServer = app.listen(PORT, () => {
  console.log(`Server is running on ${config.EXPRESS_URL_DEV + config.PORT}/ `);
});

export default app;
