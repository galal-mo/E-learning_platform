import mongoose from "mongoose"
import { RequestCustom } from "./RequestCustom"

export type courseType = {
    title: string,
    description: string,
    image: string,
    professor: mongoose.Types.ObjectId,
    students: [mongoose.Types.ObjectId],
}