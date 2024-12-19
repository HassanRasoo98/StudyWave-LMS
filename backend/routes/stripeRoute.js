import express from 'express'
import{CreateStripeCheckout} from '../controllers/stripeController.js'
const router = express.Router();

router.post('/checkout',CreateStripeCheckout)
export default router;