import mongoose from "mongoose"

export type gradeType = {
    student: mongoose.Types.ObjectId,
    professor: mongoose.Types.ObjectId,
    course: mongoose.Types.ObjectId,
    grade: number,
    feedback: string,
}


