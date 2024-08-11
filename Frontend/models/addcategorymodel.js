import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    category_title:{
        type:String,
        required:true,
        trim:true
    },
    category_order:{
        type:Number,
        required:true,
    },
    category_language:{
        type:String,
        required:true,
        trim:true
    },
    category_slug:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})
export default mongoose.model("Category",categorySchema )