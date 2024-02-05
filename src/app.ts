import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import AppError from "./utils/AppError"
import { globalErrorHandling } from "./middleware/globalErrorHandling"
import userRouter from "./Routes/user.routes"
import courseRouter from "./Routes/course.routes"
import gradeRouter from "./Routes/grades.routes"
dotenv.config()
const app = express()
app.use(express.json())

const port = process.env.PORT
const url = process.env.Mongo_URL!

mongoose.connect(url).then((value) => {
    console.log("mongoDb server started")
}).catch((err) => {
    console.log(err);
})


app.use('/users', userRouter)
app.use('/courses', courseRouter)
app.use('/grades', gradeRouter)

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`not found endpoint:${req.originalUrl}`, 404))
})

process.on('unhandledRejection', (err) => {
    console.log("error", err);
})
app.use(globalErrorHandling)

app.listen(port, function () {
    console.log(`listening on ${port}`);
})