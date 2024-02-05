import { NextFunction, Request, Response } from "express"
import  AppError  from "../utils/AppError"

export const globalErrorHandling=(err:AppError,req:Request,res:Response,next:NextFunction)=>{
    err.statusCode=err.statusCode||500
    res.status(err.statusCode).json({error:err.message,stack:err.stack})
}