import mongoose from "mongoose";
i

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