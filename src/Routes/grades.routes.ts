import { allowedTo, protectedRoutes } from '../middleware/auth';
import express from 'express'
import { validation } from '../middleware/validation';
import { assignGradeVal, studentGradeVal } from '../validations/grade.validation';
import { assignGradeConroller, viewAverageGradeConroller, viewGradeConroller } from '../Controllers/grades.controller';
import { paramsIdVal } from '../validations/sharedValidations';
const gradeRouter = express.Router()

// let common:string[]=

gradeRouter.post('/assign', protectedRoutes, allowedTo('professor'), validation(assignGradeVal), assignGradeConroller)

gradeRouter.route('/:id').get(protectedRoutes, validation(studentGradeVal), viewGradeConroller)

gradeRouter.route('/:id/average').get(protectedRoutes, allowedTo('professor'), validation(paramsIdVal), viewAverageGradeConroller)


export default gradeRouter