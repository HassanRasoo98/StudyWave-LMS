import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({

    coursecode:{
        type:String,
        required:true
    },
    coursename:{
        type:String,
        required:true
    },
    coursecategory:{
        type:String,
        required:true
    },
    courselanguage:{
        type:String,
        required:true
    },
    // coursesubject:{
    //     type:String,
    //     required:true
    // },
    courselevel:{
        type:String,
        required:true
    },
    courseinstructor:{
        type:String,
        required:true
    },
    enrolledstudents:{
        type:Number,
        default:0
    },
    courseimg: {
        type: String,
    },
    
    courseprice:{
        type:Number,
        required:true
    },
    courseduration:{
        type:String,
        required:true
    },
    // coursetages:{
    //     type:String,
    //     required:true
    // },
    coursedescription:{
        type:String,
        required:true
    },
    coursevideos: [{
        title: String,
        url: String
      }],
    // courseshortdescription: {
    //     type: String,
    //     required:true
    //   },
    coursefeedback: [
        {
          rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
          },
          comment: {
            type: String,
          },
        },
      ],
},{timestamps:true})
export default mongoose.model('Courses',courseSchema)