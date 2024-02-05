import { NextFunction, Response } from "express"
import { catchError } from "./catchError"
import AppError from "../utils/AppError"
import userModel from "../models/user.model"
import jwt, { JwtPayload } from 'jsonwebtoken';
import mongoose from "mongoose";
import { RequestCustom } from "../Types/RequestCustom";


//should sign in first
const protectedRoutes = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    let secretKey = process.env.JWTKEY!
    let token = req.header('token');

    if (!token) return next(new AppError('token not provided', 401))

    let decoded = jwt.verify(token, secretKey) as JwtPayload
    // console.log(decoded?.userId);
    // console.log(typeof (decoded));

    let id: mongoose.Types.ObjectId = decoded?.userId

    let user = await userModel.findById(id)
    if (!user) return next(new AppError('user not found', 401))
    // console.log(user);
    
    req.user = user
    // console.log(req.user);

    next()
})

///for prof and student features
const allowedTo = (...roles: string[]) => {
    return catchError((req: RequestCustom, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) return next(new AppError('you are not authorized', 401))
        next()
    })
}

export {
    allowedTo,
    protectedRoutes
}