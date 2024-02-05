import type { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import AppError from './AppError'
export const fileUpload = () => {

    const fileStorage = multer.diskStorage({})///to upload only in the cloud///

    function fileFilter(req: Request, file: Express.Multer.File, cb: (any |FileFilterCallback)) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        }
        else {
            cb(new AppError('image Only', 401), false)
        }
    }

    const upload = multer({storage: fileStorage,  fileFilter})
    return upload

}


export const uploadSingleFile = (fieldName: any) => fileUpload().single(fieldName)