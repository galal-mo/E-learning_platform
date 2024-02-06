
import express from 'express';
import *as userController from '../Controllers/user.controller';
import { validation } from '../middleware/validation';
import { addUserVal, signinVal, updateUserVal } from '../validations/user.validations';
import { paramsIdVal } from '../validations/sharedValidations';
import { protectedRoutes } from '../middleware/auth';

const userRouter = express.Router()

// let common:string[]=

userRouter
    .post('/create',validation(addUserVal), userController.addUserController)
    .post('/signin',validation(signinVal), userController.signinController)

    userRouter.route('/:id')
    .put(protectedRoutes,validation(updateUserVal), userController.updateUserController)
    .delete(protectedRoutes,validation(paramsIdVal), userController.deleteUserController)


export default userRouter