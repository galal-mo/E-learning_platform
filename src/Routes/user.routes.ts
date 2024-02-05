
import express from 'express';
import { addUserController, deleteUserController, signinController, updateUserController } from '../Controllers/user.controller';
import { validation } from '../middleware/validation';
import { addUserVal, signinVal, updateUserVal } from '../validations/user.validations';
import { paramsIdVal } from '../validations/sharedValidations';
import { protectedRoutes } from '../middleware/auth';

const userRouter = express.Router()

// let common:string[]=

userRouter
    .post('/create',validation(addUserVal), addUserController)
    .post('/signin',validation(signinVal), signinController)

    userRouter.route('/:id')
    .put(protectedRoutes,validation(updateUserVal), updateUserController)
    .delete(protectedRoutes,validation(paramsIdVal), deleteUserController)


export default userRouter