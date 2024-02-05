import mongoose from "mongoose"
import { courseType } from "../Types/course.types"
import courseModel from "../models/course.model"

////////////!------------------professor Features---------------------//////////////////////
const addCourseService = async (course: courseType) => {
    let addedCourse = new courseModel(course)
    await addedCourse.save()
    return addedCourse
}

const updateCourseService = async (id: string, course: courseType) => {
    return await courseModel.findByIdAndUpdate(id, course, { new: true })
}

const deleteCourseService = async (id: string) => {
    return await courseModel.findByIdAndDelete(id)
}

const getCourseServices= async (id: string) => {
    return await courseModel.findById(id)
}
////////////!------------------student Features---------------------//////////////////////

const courseEnrollmentServices= async (id: string,user:mongoose.Types.ObjectId) => {
    return await courseModel.findByIdAndUpdate(id, { $addToSet: { students: user} }, { new: true })
}

const courseDropServices= async (id: string,user:mongoose.Types.ObjectId) => {
    return await courseModel.findByIdAndUpdate(id, { $pull: { students: user} }, { new: true })
}
////////////!------------------course mangment---------------------//////////////////////
const getAllCoursesServices= async () => {
    return await courseModel.find({})
}
export{
    addCourseService,
    updateCourseService,
    deleteCourseService,
    getCourseServices,
    courseEnrollmentServices,
    courseDropServices,
    getAllCoursesServices
}