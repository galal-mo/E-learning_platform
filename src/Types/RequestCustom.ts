import { Request } from "express";
import { userType } from "./user.types";
import userModel from './../models/user.model';

export interface RequestCustom extends Request
{
    user: any;
}