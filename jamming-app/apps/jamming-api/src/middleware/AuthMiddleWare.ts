import { Request, Response, NextFunction } from 'express';

export default function AuthMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ msg: 'Unauthorized' });
  }
}
