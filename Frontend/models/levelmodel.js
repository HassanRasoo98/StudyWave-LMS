import mongoose from "mongoose";
const levelSchema = new mongoose.Schema({
    level_title:{
        type:String,
        required:true,
    }
},{timestamps:true})
export default mongoose.model("Level",levelSchema )