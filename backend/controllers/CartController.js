import Cart from '../models/CartSchema.js'
import User from '../models/usermodel.js'
  // cartController.js
  export const addToCart = async (req, res) => {
    const { userEmail, courseId } = req.body;
  
    try {
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let cart = await Cart.findOne({ user: user._id });
  
      if (!cart) {
        // If the user doesn't have a cart, create one
        cart = new Cart({ user: user._id, items: [] });
      }
  
      // Find the index of the existing cart item (if it exists)
      const cartItemIndex = cart.items.findIndex(
        (item) => item.course.toString() === courseId
      );
  
      if (cartItemIndex !== -1) {
        // If the course is already in the cart, increase the quantity
        cart.items[cartItemIndex].quantity += 1;
      } else {
        // If the course is not in the cart, add a new item
        cart.items.push({ course: courseId, quantity: 1 }); // Use "course" instead of "courseId"

      }
  
      await cart.save();
  
      res.status(200).json({ message: "Course added to the cart" });
    } catch (error) {
      console.error("Error adding course to the cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const removeFromCart = async (req, res) => {
    const { userEmail, courseId } = req.body;
  
    try {
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      let cart = await Cart.findOne({ user: user._id });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const cartItemIndex = cart.items.findIndex(
        (item) => item.course.toString() === courseId
      );
  
      if (cartItemIndex === -1) {
        return res.status(404).json({ message: "Course not found in the cart" });
      }
  
      cart.items.splice(cartItemIndex, 1);
      await cart.save();
  
      res.status(200).json({ message: "Course removed from the cart" });
    } catch (error) {
      console.error("Error removing course from the cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };// cartController.js

// Get the user's cart
export const getUserCart = async (req, res) => {
    const { userEmail } = req.params;
  
    try {
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const cart = await Cart.findOne({ user: user._id }).populate("items.course");
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      console.error("Error fetching user's cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
// controllers/CartController.js

export const countCartItems = async (req, res) => {
  const { userEmail } = req.params;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      return res.status(200).json({ itemCount: 0 });
    }

    const itemCount = cart.items.length;

    res.status(200).json({ itemCount });
  } catch (error) {
    console.error("Error counting cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
