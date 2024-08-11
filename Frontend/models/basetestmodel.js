import mongoose from "mongoose";
const testSchema = new mongoose.Schema({
  totalQuestions: {
    type: Number,
    required: true,
  },
  Subject: {
    type: String,
    required: true,
  },
  Level: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: String,
      options: [String], // Assuming options are strings
      answer: Number, // Index of the correct option
    }
  ],
}, { timestamps: true });
export default mongoose.model("BaseTest",testSchema )
