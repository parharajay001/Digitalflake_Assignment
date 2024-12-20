import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User.model';

export const profile = async (req: Request | any, res: Response): Promise<Response | any> => {
  try {
    const user = await User.find({ email: req?.user?.email }, { password: 0 });
    if (user.length > 0) return res.send(user[0]);
    else return res.send({ message: 'User not found !' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch the Profile !', error });
  }
};
