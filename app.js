import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"; // Used for sever deployment

export const app = express(); 

config({
    path:"./data/config.env"
});
//Middleware 
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // the cookie would be created while we make the frontend
    })
);

// Using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);
 
app.get("/", (req, res)=>{
    res.send("<h1>Noiceee</h1>")
})
// Middleware for error handling, So we can directly call this anywhere we want to show error
// Using error middleware
app.use(errorMiddleware)