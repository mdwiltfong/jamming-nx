import { Router, Request, Response, NextFunction } from 'express';
import { Model } from '../db/helpers/db.helper';
import { User } from '../db/helpers/models/User';
import { DocumentNotFoundError } from '../db/helpers/error_handlers/DocumentNotFoundError';
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
        throw new DocumentNotFoundError(`User not found with id ${id}`);
      }
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  }
);

userRouter.post(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deletedUser = await userModel.deleteDocument(
        { _id: id },
        { name: 'users' }
      );
      return deletedUser;
    } catch (error) {
      return next(error);
    }
  }
);
export default userRouter;
