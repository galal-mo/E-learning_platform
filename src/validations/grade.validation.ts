import Joi from "joi";



const assignGradeVal = Joi.object({
    course: Joi.string().min(2).max(50).required(),
    student: Joi.string().hex().length(24).required(),
    grade: Joi.number().min(0).max(100).required(),
    feedback: Joi.string().min(2).max(200).optional(),
})

const studentGradeVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    courseId: Joi.string().min(2).max(50).optional(),

})





export {
    assignGradeVal,
    studentGradeVal

}