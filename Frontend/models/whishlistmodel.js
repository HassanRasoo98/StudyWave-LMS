import mongoose from "mongoose";
const whishlistSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
        unique: true,
      },
      courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Courses",
        },
      ],
},{timestamps:true})
export default mongoose.model("whishlist",whishlistSchema)