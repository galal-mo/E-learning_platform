import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import AppError from "../utils/AppError"

export const validation = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        let filter = {}
        if (req.file) {
            filter = { image: req.file, ...req.body, ...req.params, ...req.query }, { abortEarly: false }
        }
        else {
            filter = { ...req.body, ...req.params, ...req.query }
        }

        const { error } = schema.validate(filter, { abortEarly: false })
        if (!error) {
            next()
        } else {
            next(new AppError(error.details[0].message, 401))
        }
    }
}