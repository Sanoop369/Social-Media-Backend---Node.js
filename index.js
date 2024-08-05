import express from 'express';
import mongoose from './db.js';
import blogRouter from "./routes/blogRouter.js"
import userRouter from './routes/userRoutes.js';

const app=express();
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/blog",blogRouter)



app.listen(5000);
