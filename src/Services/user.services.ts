import mongoose from "mongoose";
import { userType } from "../Types/user.types";
import userModel from "../models/user.model";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const addUserService = async (user: userType) => {
    let addedUser = new userModel(user)
    await addedUser.save()
    return addedUser
}

const updateUserService = async (id: string, user: userType) => {
    return await userModel.findByIdAndUpdate(id, user, { new: true })
}

const deleteUserService = async (id: string) => {
    return await userModel.findByIdAndDelete(id)
}
const signinService = async (email: string, password: string) => {
    let secretKey = process.env.JWTKEY!
    let user = await userModel.findOne({ email: email })
    if (user && bcrypt.compareSync(password, user.password)) {
        let token = jwt.sign({ userId: user._id }, secretKey)
        return token;
    }
}

export {
    addUserService,
    updateUserService,
    deleteUserService,
    signinService
}