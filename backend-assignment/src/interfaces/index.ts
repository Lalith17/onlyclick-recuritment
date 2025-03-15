import { Request, Response, NextFunction } from 'express';
import { Document, Types } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface IUserDocument extends IUser, Document {
    _id: Types.ObjectId;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ITask {
    title: string;
    description: string;
    completed: boolean;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITaskDocument extends ITask, Document {
    _id: Types.ObjectId;
}

export interface IAuthRequest extends Request {
    user?: IUserDocument;
}

export type AuthRequestHandler = (
    req: IAuthRequest,
    res: Response,
    next: NextFunction
) => Promise<void> | void; 