import Joi from "joi";


const addCourseVal = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(200).required(),

    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
    }).optional(),

    student: Joi.array().items(Joi.string().hex().length(24)).optional(),
})
const updateCourseVal = Joi.object({
    id:Joi.string().hex().length(24).required(),

    title: Joi.string().min(2).max(50),
    description: Joi.string().min(2).max(200),

    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
    }),

    student: Joi.array().items(Joi.string().hex().length(24)).optional(),
})

export {
    addCourseVal,
    updateCourseVal
}