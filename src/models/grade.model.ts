import mongoose from "mongoose";




const gradeSchema=new mongoose.Schema({
    student:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required: [true, "student is required"],
    },
    course:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required: [true, "course is required"],
    },
    professor:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required: [true, "professor is required"],
    },
    grade:{
        type:Number,
        min:0,
        max:100,
        required: [true, "grade is required"],
    },
    feedback:{
        type:String,
    },
},{ timestamps: true })


const gradeModel=mongoose.model("grade",gradeSchema)
export default gradeModel