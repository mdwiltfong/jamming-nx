import config from '../../../libs/utils/config';
import db from '../db.helper';
describe('MongoDB Atlas', () => {
  it('should connect to the database', async () => {
    try {
      await db.connect();
    } catch (error) {
      expect(error).toBeNull();
    }
  });
});
