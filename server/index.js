import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";

const app = express();
dotenv.config();
connectDb();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.get('/test',(req,res)=>{
    return res.send("test route");
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`);
})
