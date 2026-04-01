import express from "express";
import productRouter from "./router/product_router.js";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

const PORT = process.env.PORT || 8000

mongoose.connect(process.env.DB_URI)
.then(()=>{console.log("db connected")})
.catch(()=>{console.log("connection error")});

const app = express();
app.use(cors());
app.use(express.json());
app.use(productRouter);


app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
});
