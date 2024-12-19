// components/AddToCart.js

import React, { useEffect, useState } from "react";
import UserPage from "../UserPage/UserPage.js";
import { useAuth } from "../../../context/auth.js";
import { FaTrash } from "react-icons/fa";
import "./AddToCart.css";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const AddToCart = () => {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useAuth();
  const userEmail = auth?.user?.email;

  const handleRemoveFromCart = async (courseId) => {
    try {
      const response = await axios.delete(`/api/v1/carts/removercarts`, {
        data: {
          userEmail,
          courseId, // Pass the course ID that you want to remove
        },
      });

      if (response.status === 200) {
        // Refresh the cart data after item removal
        fetchUserCart();
      } else {
        console.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const calculateTotalPayment = () => {
    if (!cart) {
      return 0;
    }

    let total = 0;
    for (const item of cart.items) {
      total += item.course.courseprice * item.quantity;
    }

    return total;
  };

  const fetchUserCart = async () => {
    try {
      const response = await axios.get(`/api/v1/carts/${userEmail}/cart`);

      if (response.status === 200) {
        setCart(response.data);
        console.log(response.data);
      } else {
        console.error("Failed to fetch user cart");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user cart:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, [userEmail]);
  const makePayment = async () => {
    try {
      // const stripe = await loadStripe("pk_test_51O8pMSH2OsJcT6XnVDvSEk0DZtV1pJlsnRmD8ioBxs2e2e5vishmWyqdJ1QWORmKh2ocERSFDrNntuQUAU1wjaxq00awmKV9TM");
      const stripe = await loadStripe(
        "pk_test_51N5ODiJmX5zAkZ90Zu2KPerrFEoP7dBF0bCJQXuLqpXv2vsCu7ALW8SmVIkgkz6oflsIyRQciWgEhO5aJGN1pePc00awoXfulJ"
      );
      const response = await axios.get(`/api/v1/carts/${userEmail}/cart`);

      if (response.status === 200) {
        const cartData = response.data;

        // Prepare the cart data to send to the server for payment
        const cartItems = cartData.items.map((item) => ({
          coursename: item.course.coursename,
          courseprice: item.course.courseprice,
          quantity: item.quantity,
          courseId: item.course._id, // Include the course ID
        }));
        const totalAmount = calculateTotalPayment(); // Calculate the total payment
        const paymentRequest = {
          userEmail,
          cartItems,
          paymentDate: new Date(), // Get the current date
          amount: totalAmount,
        };
        const checkoutResponse = await axios.post(
          "/api/v1/payment/checkout",
          paymentRequest
        );
        if (checkoutResponse.status === 200) {
          const session = checkoutResponse.data;

          // Redirect the user to the Stripe checkout page
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });

          if (result.error) {
            console.error(
              "Error redirecting to Stripe checkout:",
              result.error
            );
          }
        } else {
          console.error("Failed to create a Stripe checkout session");
        }
      } else {
        console.error("Failed to fetch user cart");
      }
    } catch (error) {
      console.log("Error in MakePayment", error);
    }
  };

  return (
    <>
      <UserPage />
      <div className="cart-page">
        <div className="cart-content">
          <h1 className="cartmainheading">Your Cart</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : cart ? (
            <div className="cart-item-container">
              <ul className="cart-items">
                {cart.items.map((item) => (
                  <li key={item.course._id} className="cart-item">
                    {item.course.courseimg ? (
                      <img
                        src={`http://localhost:3000/media/uploads/${item.course.courseimg}`}
                        alt={item.course.title}
                        className="cart-item-image"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">
                        Coursename: {item.course.coursename}
                      </h3>
                      <p className="cart-item-price">
                        Price: RS {item.course.courseprice.toFixed(2)}
                      </p>
                      <p className="cart-item-quantity">
                        Quantity: {item.quantity}
                      </p>
                      <button
                        onClick={() => handleRemoveFromCart(item.course._id)}
                        className="remove-button"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="total-payment-container">
                <p className="total-payment">
                  Total Payment: RS { calculateTotalPayment().toFixed(2)}
                </p>
                <button
                  className="proceed-to-checkout-button"
                  onClick={makePayment}
                >
                  Checkout
                </button>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddToCart;
