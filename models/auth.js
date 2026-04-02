import mongoose from "mongoose";


const UserModel = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

});

export const AuthModel = mongoose.model("authentication",UserModel);