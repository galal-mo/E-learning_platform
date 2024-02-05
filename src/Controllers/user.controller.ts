import { NextFunction, Request, Response } from "express"
import { userType } from "../Types/user.types";
import { addUserService, deleteUserService, signinService, updateUserService } from "../Services/user.services";
import { catchError } from "../middleware/catchError";
import bcrypt from 'bcrypt'
import AppError from "../utils/AppError";




///---------------common EndPoints-------------------///
const addUserController = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as userType;
    let addedUser = await addUserService(user)
    res.json({ message: "success", addedUser })
})

const updateUserController = catchError(async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 8)
    const user = req.body as userType;
    const { id } = req.params
    let updatedUser = await updateUserService(id, user)
    // console.log(updatedUser);
    if(!updatedUser) return next(new AppError('this user does not exist',404))

    res.json({ message: "success", updatedUser })
})

const deleteUserController = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    let deletedUser = await deleteUserService(id)
    if(!deletedUser) return next(new AppError('this user does not exist',404))

    res.json({ message: "success", deletedUser })
})


const signinController = catchError(async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;
    let token = await signinService(email, password)
    if (token)
        res.json({ message: "success", token })
    else
        next(new AppError("email or password is incorrect", 401))
})









export {
    addUserController,
    updateUserController,
    deleteUserController,
    signinController
}