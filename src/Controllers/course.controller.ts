import { NextFunction, Response } from "express";
import { courseType } from "../Types/course.types";
import { catchError } from "../middleware/catchError";
import { v2 as cloudinary } from 'cloudinary';
import * as courseServices from "../Services/course.services";
import { RequestCustom } from "../Types/RequestCustom";
import AppError from "../utils/AppError";
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});
////////////!------------------professor Features---------------------//////////////////////
const addCourseController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    if (req.file) await cloudinary.uploader.upload(req.file.path,
        (error, result) => {
            req.body.image = result?.secure_url
        });
    req.body.professor = req.user._id
    const course = req.body as courseType;
    let addedCourse = await courseServices.addCourseService(course)
    res.status(200).json({ message: "success", course: addedCourse })
})

const updateCourseController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    if (req.file) await cloudinary.uploader.upload(req.file.path,
        (error, result) => {
            req.body.image = result?.secure_url
        });
    req.body.professor = req.user._id
    const course = req.body as courseType;
    let updatedCourse = await courseServices.updateCourseService(req.params.id, course)
    if (!updatedCourse) return next(new AppError('this course does not exist', 404))
    res.status(200).json({ message: "success", course: updatedCourse })
})

const deleteCourseController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { id } = req.params
    let deletedCourse = await courseServices.deleteCourseService(id)
    if (!deletedCourse) return next(new AppError('this course does not exist', 404))
    res.json({ message: "success", deletedCourse })
})

const viewEnrolledStudentsController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { id } = req.params
    let course = await courseServices.getCourseServices(id)
    if (!course) return next(new AppError('this course does not exist', 404))
    res.json({ message: "success", students: course.students })
})
////////////!------------------student Features---------------------//////////////////////

const courseEnrollmentController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { id } = req.params
    const userId = req.user._id

    let course = await courseServices.courseEnrollmentServices(id, userId)
    if (!course) return next(new AppError('this course does not exist', 404))
    res.json({ message: "success", course: course })
})

const courseDropController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { id } = req.params
    const userId = req.user._id

    let course = await courseServices.courseDropServices(id, userId)
    if (!course) return next(new AppError('this course does not exist', 404))
    res.json({ message: "success", course: course })
})

////////////!------------------course Mangement---------------------//////////////////////
const getAllCoursesController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    let courses = await courseServices.getAllCoursesServices()
    if (!courses) return next(new AppError('no courses yet', 404))
    res.json({ message: "success", courses })
})

const getCourseController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { id } = req.params

    let course = await courseServices.getCourseServices(id)
    if (!course) return next(new AppError('this course dose not exist', 404))
    res.json({ message: "success", course })
})


export {
    addCourseController,
    updateCourseController,
    deleteCourseController,
    viewEnrolledStudentsController,
    courseEnrollmentController,
    courseDropController,
    getAllCoursesController,
    getCourseController
}