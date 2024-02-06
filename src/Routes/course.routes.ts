
import express from 'express';
import { validation } from '../middleware/validation';
import { paramsIdVal } from '../validations/sharedValidations';
import { allowedTo, protectedRoutes } from '../middleware/auth';
import * as courseController from '../Controllers/course.controller';
import { uploadSingleFile } from '../utils/imageUploads';
import { addCourseVal, updateCourseVal } from '../validations/course.validation';
import { getAllCoursesServices } from '../Services/course.services';

const courseRouter = express.Router()

////////////!------------------professor Features---------------------//////////////////////
courseRouter
    .post('/create', protectedRoutes, allowedTo('professor'), uploadSingleFile('image'), validation(addCourseVal), courseController.addCourseController)

courseRouter.route('/:id')
    .put(protectedRoutes, allowedTo('professor'), uploadSingleFile('image'), validation(updateCourseVal), courseController.updateCourseController)
    .delete(protectedRoutes, allowedTo('professor'), validation(paramsIdVal), courseController.deleteCourseController)

courseRouter.get('/:id/students', protectedRoutes, allowedTo('professor'), validation(paramsIdVal), courseController.viewEnrolledStudentsController)

////////////!------------------student Features---------------------//////////////////////
courseRouter.post('/:id/enroll', protectedRoutes, allowedTo('student'), validation(paramsIdVal), courseController.courseEnrollmentController)
courseRouter.post('/:id/drop', protectedRoutes, allowedTo('student'), validation(paramsIdVal), courseController.courseDropController)
////////////!------------------course mangment---------------------//////////////////////
courseRouter.get('/', courseController.getAllCoursesController)
courseRouter.get('/:id', courseController.getCourseController)
export default courseRouter