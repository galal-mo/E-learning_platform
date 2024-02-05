import mongoose from "mongoose"

export type courseType = {
    title: string,
    description: string,
    image: string,
    professor: mongoose.Types.ObjectId,
    students: [mongoose.Types.ObjectId],
}