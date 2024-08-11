import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  course: { // Use "course" instead of "courseId"
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses", // Reference to the Courses model
    required: true,
  },
  quantity: {
    type: Number,
    default: 1, // Default quantity is 1
  },
});


const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // Reference to the Users model
    required: true,
  },
  items: [cartItemSchema], // Array of cart items
});

export default mongoose.model("Cart", cartSchema);
