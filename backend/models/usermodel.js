import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    userimg:{
        type:String,
    },
    phone:{
        type:String,
    },
    location:{
        type:String
    },
    bio:{
        type:String
    },
    label:{
        type:String
    },
    score:{
        type:String
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Courses", // Reference to the Courses model
        }
    ],
    paymenthistory: [
        {
          paymentDate: {
            type: Date,
          },
          amount: {
            type: Number,
          },
        },
      ],
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})
export default mongoose.model("Users",userSchema)