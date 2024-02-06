import { NextFunction, Response } from "express";
import { RequestCustom } from "../Types/RequestCustom";
import { catchError } from "../middleware/catchError";
import { gradeType } from "../Types/grades.types";
import { assignGradeService, viewAverageGradeService, viewGradeService, viewSingleGradeService } from "../Services/grade.services";
import AppError from "../utils/AppError";




const assignGradeConroller = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    req.body.professor = req.user._id
    const grade = req.body as gradeType;
    let addedgrade = await assignGradeService(grade)
    if (!addedgrade) return next(new AppError('this student not found in this course', 404))
    res.status(200).json({ message: "success", grade: addedgrade })
})

const viewGradeConroller = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {
    ///only the prof and grade owner who can view the grade
    // if (req.user.role != 'professor' && req.user._id != req.params.id) return next(new AppError('you are not authorized to view grades', 401))
    let grades;
    if (req.query.courseId) grades = await viewSingleGradeService(req.params.id, req.query.courseId)
    else grades = await viewGradeService(req.params.id)
    res.status(200).json({ message: "success", grades })
})
const viewAverageGradeConroller = catchError(async (req: RequestCustom, res: Response, next: NextFunction) => {

    let avarageGrades = await viewAverageGradeService(req.params.id)
    if (!avarageGrades) return next(new AppError('this course has no grades', 404))
    res.status(200).json({ message: "success", avarageGrades })
})




export {
    assignGradeConroller,
    viewGradeConroller,
    viewAverageGradeConroller
}