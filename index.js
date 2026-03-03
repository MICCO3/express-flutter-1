import express from "express";
import { env } from "process";
import productRouter from "./router/product_router.js";
import mongoose from "mongoose";
import cors from "cors"

const PORT = process.env.PORT || 8000

mongoose.connect("mongodb+srv://admin:xBFMFIRMUKnxa5Zs@cluster0.vgeygpg.mongodb.net/myshop?appName=Cluster0")
.then(()=>{console.log("db connected")})
.catch(()=>{console.log("connection error")});

const app = express();
app.use(cors());
app.use(express.json());
app.use(productRouter);


app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
});
