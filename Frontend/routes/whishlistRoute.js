import express from 'express'
import {AddtoWhishlist,removeFromWishlist,getUserWishlist,countWishlistCourses,getWishlistCourses} from '../controllers/whishlistController.js'
const router = express.Router()
router.post("/wishlist/add",AddtoWhishlist);
// Change your route to accept query parameters
router.get("/getwhishlist/get", getUserWishlist);
router.get("/getcoursesfromwhishlist",getWishlistCourses)
router.get("/countwhishlist",countWishlistCourses)
router.delete("/remove/:userEmail/:courseId",removeFromWishlist)
export default router