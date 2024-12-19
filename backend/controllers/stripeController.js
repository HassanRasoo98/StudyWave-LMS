import stripe from 'stripe';
import usermodel from '../models/usermodel.js';
const stripeClient = stripe("sk_test_51N5ODiJmX5zAkZ90k9k0hGxBKexPsh1Q9FtMEi150cnhKlDZeImv94Wvny6ltJIEAWa8vNiKsItlOJRNFpNY782d00khccein9");
// const stripeClient = stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export const CreateStripeCheckout = async (req, res) => {
  try {
    const { userEmail, cartItems, paymentDate, amount } = req.body;
    console.log("Details", req.body); // Log the request body

    if (!userEmail || !cartItems || !paymentDate || !amount) {
      return res.status(400).json({ error: 'Bad Request - Missing or invalid data' });
    }

    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ error: 'Courses should be an array' });
    }

    const user = await usermodel.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const lineItems = cartItems.map((course) => ({
      price_data: {
        currency: 'usd', // Use 'usd' for Stripe
        product_data: {
          name: course.coursename,
        },
        unit_amount: course.courseprice * 100, // Convert price to cents
      },
      quantity: course.quantity,
    }));

    user.paymenthistory.push({
      paymentDate,
      amount,
    });

    const enrolledCourseIds = cartItems.map((item) => item.courseId);
    user.enrolledCourses = [...user.enrolledCourses, ...enrolledCourseIds];

    await user.save();
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: "http://localhost:3000/user-dashboard/success",
      cancel_url: "http://localhost:3000/user-dashboard/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

