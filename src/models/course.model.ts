import mongoose from "mongoose";




const courseSchema=new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"],
        maxlength:50
    },
    description:{
        type: String,
        maxlength:200,
    },
    image:{
        type: String,
    },
    professor:{
        type:mongoose.Types.ObjectId,
        required: [true, "professor is required"],
        ref:'user',
    }, 
    students:[{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }]
},{ timestamps: true })


const courseModel=mongoose.model("course",courseSchema)
export default courseModel
