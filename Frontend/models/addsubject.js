import mongoose from "mongoose";
const subjectSchema = new mongoose.Schema({
     subject_title:{
         type:String,
         required:true,
         trim:true
     },
     subject_order:{
         type:Number,
         required:true,
     },
     subject_language:{
         type:String,
         required:true,
         trim:true
     },
    //  subject_slug:{
    //      type:String,
    //      required:true,
    //      trim:true
    //  }
},{timestamps:true})
export default mongoose.model("Subject",subjectSchema )