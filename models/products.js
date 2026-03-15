import mongoose, { Schema } from "mongoose";
import { type } from "os";


const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        requied:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{ 
        type:String,
        
        
    },
    url:{
        type:Array,
        required: true
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