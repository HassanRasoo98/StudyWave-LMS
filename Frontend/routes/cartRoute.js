import express from 'express'
import { addToCart, removeFromCart, getUserCart,countCartItems } from '../controllers/CartController.js'
const router = express.Router();

router.post("/add-to-cart",addToCart)
router.get("/count-cartitem/:userEmail",countCartItems)
router.delete('/removercarts', removeFromCart);
router.get("/:userEmail/cart",getUserCart)
export default router;
