import { Router, Request, Response, NextFunction } from 'express';
import { Model } from '../db/helpers/db.helper';
import { User } from '../db/helpers/models/User';
import ServerErrorHandler, {
  ErrorCodes,
} from '../db/helpers/error_handlers/ServerErrorHandler';
const userModel = new Model<User>('users');
const userRouter = Router();

userRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await userModel.findDocument(
        {
          _id: id,
        },
        { name: 'users' }
      );
      if (user == null) {
        throw new ServerErrorHandler(
          ErrorCodes.APINotFoundError,
          404,
          'User not found',
          'link',
          '1234'
        );
      }
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
);
export default userRouter;
