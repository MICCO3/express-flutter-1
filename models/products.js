import mongoose, { Schema } from "mongoose";


const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        requied:true
    },
    price:{
        type:Number,
        required:true
    },
    instock:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Product = mongoose.model("products",ProductSchema);