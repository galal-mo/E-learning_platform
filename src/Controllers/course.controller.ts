import { NextFunction, Response } from "express";
import { courseType } from "../Types/course.types";
import { catchError } from "../middleware/catchError";
import { v2 as cloudinary } from 'cloudinary';
import { addCourseService, courseDropServices, courseEnrollmentServices, deleteCourseService, getAllCoursesServices, getCourseServices, updateCourseService } from "../Services/course.services";
import { RequestCustom } from "../Types/RequestCustom";
import AppError from "../utils/AppError";
cloudinary.config({
    cloud_name: 'dtfppt55q',
    api_key: '845452991541615',
    api_secret: 'I6c1bB9y5EYco-V3OiWG3actDZE'
});
////////////!------------------professor Features---------------------//////////////////////
const addCourseController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    if (req.file) await cloudinary.uploader.upload(req.file.path,
        (error, result) => {
            console.log("ss");
            req.body.image = result?.secure_url
        });
    req.body.professor = req.user._id
    const course = req.body as courseType;
    let addedCourse = await addCourseService(course)
    res.status(200).json({ message: "success", course: addedCourse })
})

const updateCourseController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    if (req.file) await cloudinary.uploader.upload(req.file.path,
        (error, result) => {
            req.body.image = result?.secure_url
        });
    req.body.professor = req.user._id
    const course = req.body as courseType;
    let updatedCourse = await updateCourseService(req.params.id, course)
    if(!updatedCourse) return next(new AppError('this course does not exist',404))
    res.status(200).json({ message: "success", course: updatedCourse })
})

const deleteCourseController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { id } = req.params
    let deletedCourse = await deleteCourseService(id)
    if(!deletedCourse) return next(new AppError('this course does not exist',404))
    res.json({ message: "success", deletedCourse })
})

const viewEnrolledStudentsController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { id } = req.params
    let course = await getCourseServices(id)
    if(!course) return next(new AppError('this course does not exist',404))
    res.json({ message: "success", students:course.students })
})
////////////!------------------student Features---------------------//////////////////////

const courseEnrollmentController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { id } = req.params
    const userId=req.user._id
    console.log(userId);
    
    let course = await courseEnrollmentServices(id,userId)
    if(!course) return next(new AppError('this course does not exist',404))
    res.json({ message: "success", course:course })
})

const courseDropController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { id } = req.params
    const userId=req.user._id
    console.log(userId);
    
    let course = await courseDropServices(id,userId)
    if(!course) return next(new AppError('this course does not exist',404))
    res.json({ message: "success", course:course })
})

////////////!------------------course Mangement---------------------//////////////////////
const getAllCoursesController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    let courses = await getAllCoursesServices()
    if(!courses) return next(new AppError('no courses yet',404))
    res.json({ message: "success", courses })
})

const getCourseController = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { id } = req.params

    let course = await getCourseServices(id)
    if(!course) return next(new AppError('this course dose not exist',404))
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