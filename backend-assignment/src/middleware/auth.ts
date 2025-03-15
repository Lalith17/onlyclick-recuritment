import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { IAuthRequest } from '../interfaces';

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
  console.error('JWT_SECRET is missing in environment variables');
  process.exit(1);
}

interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate.' });
    }
};
