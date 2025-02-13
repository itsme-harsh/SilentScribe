import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./database/index.js";


const app = express();

app.use(cors({
    // origin: process.env.CORS_ORIGIN,
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())



//routes import
import userRouter from './routes/user.route.js';
import blogRouter from './routes/blog.route.js';

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/blogs", blogRouter)

const isProduction = process.env.NODE_ENV == "production";

app.use((err, req, res, next) => {

    if (isProduction) {
        console.error(err.stack);
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message
        });
    } else {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
            stack: err.stack,
            errors: err.errrors
        });
    }
});


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })