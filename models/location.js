import mongoose from "mongoose";


const LocationSchema = new mongoose.Schema({
    region:{
        type:String,
        required:true,
        unique:true
    },
    districts:{
        type:Array,
        required:true
    }
})

export const LocationModel = mongoose.model("locations",LocationSchema);