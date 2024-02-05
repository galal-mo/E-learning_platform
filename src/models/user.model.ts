import mongoose from "mongoose";
import bcrypt from 'bcrypt'



const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
        maxlength: 50
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    role: {
        type: String,
        enum: ['student', 'professor'],
        default: 'student',
        lowercase: true
    },
}, { timestamps: true })


userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 8)
})





const userModel = mongoose.model("user", userSchema)
export default userModel