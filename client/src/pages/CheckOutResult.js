import React, { useEffect, useState } from 'react'

function CheckOutResult() {

    const [message, setMessage] = useState(undefined)
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
          setMessage("Order placed! You will receive an email confirmation.");
        }
        if (query.get("canceled")) {
          setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }, []);



    return (
        <h2>{message}</h2>
    )
}

export default CheckOutResult
