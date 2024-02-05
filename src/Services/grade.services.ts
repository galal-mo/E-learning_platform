import { NextFunction } from "express"
import { gradeType } from "../Types/grades.types"
import courseModel from "../models/course.model"
import gradeModel from "../models/grade.model"
import mongoose from "mongoose"






const assignGradeService = async (grade: gradeType) => {
    let course = await courseModel.findOne({ _id: grade.course, students: grade.student })
    console.log(course);

    if (!course) return null

    let addedGrade = new gradeModel(grade)
    await addedGrade.save()
    return addedGrade
}
const viewGradeService = async (student: string) => {
    return await gradeModel.find({ student })
}




export {
    assignGradeService,
    viewGradeService
}