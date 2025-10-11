import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
//import userRouter from "./routes/user.routes.js"
dotenv.config()
const app=express()
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials: true
    }
))
//app.use(express.json({limit:"16kb"}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())
//debug ke liye use kiya -app.get("/ping", (req, res) => res.json({ message: "pong" }));
//routes import
import userRouter from './routes/user.routes.js'
//random name tbhi de skte when export default horha ho


//routes declaration
//app.use(and not app.get) because router to lane ke liye we have to use middleware
console.log("✅ userRouter loaded");

app.use("/api/v1/users",userRouter)//control passes to user.routes.js

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//http://localhost:8000/api/v1/users/register

export {app}