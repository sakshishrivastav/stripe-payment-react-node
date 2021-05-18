import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const API = "http://localhost:4000"

// example card 4242424242424242 anynumber any future date
// needs auth card 4000 0025 0000 3155

const handleBuyClick = async () => {
  try {
    const stripe = await stripePromise;
    const session = await fetch(API+"/create-checkout-session", {
      method: "POST",
    }).then(res=>res.json())
    // When the customer clicks on the button, redirect them to Checkout.
      console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  } catch (error) {
      console.log(error);
  }
};

function ProductPage() {
  return (
    <section>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <button
        type="button"
        id="checkout-button"
        role="link"
        onClick={handleBuyClick}
      >
        Buy Now
      </button>
    </section>
  );
}

export default ProductPage;
