
import express from 'express';
import { validation } from '../middleware/validation';
import { paramsIdVal } from '../validations/sharedValidations';
import { allowedTo, protectedRoutes } from '../middleware/auth';
import { addCourseController, courseDropController, courseEnrollmentController, deleteCourseController, getAllCoursesController, getCourseController, updateCourseController, viewEnrolledStudentsController } from '../Controllers/course.controller';
import { uploadSingleFile } from '../utils/imageUploads';
import { addCourseVal, updateCourseVal } from '../validations/course.validation';
import { getAllCoursesServices } from '../Services/course.services';

const courseRouter = express.Router()

////////////!------------------professor Features---------------------//////////////////////
courseRouter
.post('/create', protectedRoutes, allowedTo('professor'), uploadSingleFile('image'), validation(addCourseVal), addCourseController)

courseRouter.route('/:id')
.put(protectedRoutes, allowedTo('professor'), uploadSingleFile('image'),validation(updateCourseVal), updateCourseController)
.delete(protectedRoutes,allowedTo('professor'),validation(paramsIdVal), deleteCourseController)

courseRouter.get('/:id/students',protectedRoutes, allowedTo('professor'),validation(paramsIdVal),viewEnrolledStudentsController)

////////////!------------------student Features---------------------//////////////////////
courseRouter.post('/:id/enroll',protectedRoutes, allowedTo('student'),validation(paramsIdVal),courseEnrollmentController)
courseRouter.post('/:id/drop',protectedRoutes, allowedTo('student'),validation(paramsIdVal),courseDropController)
////////////!------------------course mangment---------------------//////////////////////
courseRouter.get('/',getAllCoursesController)
courseRouter.get('/:id',getCourseController)
export default courseRouter