import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"enter name"]
    },
    _id:{
        type:String,
        required:[true,"enter ID"]
    },
    photo:{
        type:String,
        required:[true,"add photo"]
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    email:{
        type:String,
        unique:[true,"email already exist"],
        required:[true,"enter email"]
    },
},{timestamps:true})


export const User = mongoose.model("User",Schema);
