import mongoose from "mongoose";
import { Schema } from "mongoose";
const imageSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Image = mongoose.model("Image",imageSchema)