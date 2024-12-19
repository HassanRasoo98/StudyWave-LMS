import whishlistmodel from "../models/whishlistmodel.js";
export const AddtoWhishlist = async (req, res) => {
  try {
    const { userEmail, courseId } = req.body;
    let wishlist = await whishlistmodel.findOne({ userEmail });
    if (!wishlist) {
      wishlist = new whishlistmodel({ userEmail, courses: [courseId] });
    } else if (!wishlist.courses.includes(courseId)) {
      wishlist.courses.push(courseId);
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Unable to add course to the wishlist" });
  }
};
export const getUserWishlist = async (req, res) => {
  const userEmail = req.query.userEmail;
  try {
    // Find the user's wishlist based on their email
    const wishlist = await whishlistmodel.findOne({ userEmail });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Return the wishlist data
    res.json({ wishlist });
  } catch (error) {
    console.error("Error fetching user wishlist:", error);
    res.status(500).json({ error: "Unable to fetch user wishlist" });
  }
};
export const getWishlistCourses = async (req, res) => {
  try {
    // Extract the user's email from the request
    const userEmail = req.query.userEmail;

    // Find the wishlist document for the user and populate the 'courses' field
    const wishlist = await whishlistmodel
      .findOne({ userEmail })
      .populate("courses");

    if (!wishlist) {
      return res
        .status(404)
        .json({ message: "Wishlist not found for the user" });
    }

    // Extract the courses from the populated wishlist
    const wishlistCourses = wishlist.courses;

    res.json({ wishlistCourses });
  } catch (error) {
    res.status(500).json({ error: "Unable to get wishlist courses" });
  }
};
export const removeFromWishlist = async (req, res) => {
  try {
    const { userEmail, courseId } = req.params;
    let wishlist = await whishlistmodel.findOne({ userEmail });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    const index = wishlist.courses.indexOf(courseId);
    if (index !== -1) {
      wishlist.courses.splice(index, 1);
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to remove course from the wishlist" });
  }
};

export const countWishlistCourses = async (req, res) => {
  try {
    // Extract the user's email from the request
    const { userEmail } = req.query;

    // Find the wishlist document for the user
    const wishlist = await whishlistmodel.findOne({ userEmail });

    if (!wishlist) {
      return res
        .status(404)
        .json({ message: "Wishlist not found for the user" });
    }

    // Count the number of courses in the wishlist
    const numberOfCoursesInWishlist = wishlist.courses.length;

    res.json({ count: numberOfCoursesInWishlist });
  } catch (error) {
    res.status(500).json({ error: "Unable to count wishlist courses" });
  }
};
