import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId:{
        type:String,
        unique:true,
        required:true
    },
    items:[
        {
            itemId:{
                type:String,
                required:true,
            },
            itemName:{
                type:String,
                required:true
            },
            itemUrl:{
                type:String,
                required:true,
            },
            itemPrice:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }

        }
    ]
})

export const  CartModel = mongoose.model("carts",CartSchema)