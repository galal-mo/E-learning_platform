import { NextFunction } from "express"
import { gradeType } from "../Types/grades.types"
import courseModel from "../models/course.model"
import gradeModel from "../models/grade.model"
import mongoose from "mongoose"






const assignGradeService = async (grade: gradeType) => {
    let course = await courseModel.findOne({ _id: grade.course, students: grade.student })

    if (!course) return null

    let addedGrade = new gradeModel(grade)
    await addedGrade.save()
    return addedGrade
}
const viewGradeService = async (student: string) => {
    return await gradeModel.find({ student })
}

const viewSingleGradeService = async (student: string, course: any) => {
    return await gradeModel.find({ student, course })
}

const viewAverageGradeService = async (course: string) => {
    return (await gradeModel.aggregate([{ $group: { "_id": "$course", AvarageGrade: { $avg: "$grade" } } }])).find((doc) => doc._id == course)
}




export {
    assignGradeService,
    viewGradeService,
    viewAverageGradeService, 
    viewSingleGradeService
}