
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';

export function catchError(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next)?.catch((err: Error) => {
            console.log(err);
            next(new AppError(err.message, 500))
        })
    }
}