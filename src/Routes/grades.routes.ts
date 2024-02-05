import { allowedTo, protectedRoutes } from '../middleware/auth';
import express from 'express'
import { validation } from '../middleware/validation';
import { assignGradeVal } from '../validations/grade.validation';
import { assignGradeConroller, viewGradeConroller } from '../Controllers/grades.controller';
import { paramsIdVal } from '../validations/sharedValidations';
const gradeRouter = express.Router()

// let common:string[]=

gradeRouter.post('/assign', protectedRoutes, allowedTo('professor'), validation(assignGradeVal), assignGradeConroller)

gradeRouter.route('/:id').get( protectedRoutes, validation(paramsIdVal), viewGradeConroller)


export default gradeRouter