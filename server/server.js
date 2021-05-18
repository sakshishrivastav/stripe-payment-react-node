const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
const express = require('express');
const SERVER_PORT= 4000;
const app = express();
app.use(express.static('.'));

const YOUR_DOMAIN = 'http://localhost:3000';

// Enable CORS from client-side
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

app.get('/', (req, res) => {
  res.send({message: "Health Check OK"})
})

app.post('/create-checkout-session', async (req, res) => {
  //get some info from client
  //based on that fetch the product info - price, country, id, address

  const product_image = ['https://i.imgur.com/EHyR2nP.png'];
  const product_name = "My Product";
  const product_price = 2000;
  const qty = 1;
  const currency = 'USD';


  const orderInfo = {
    id: 'orderidfromdb',
    items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Stubborn Attachments',
            images: ['https://i.imgur.com/EHyR2nP.png'],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ]
  }


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: orderInfo.items,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/checkoutresult?success=true`,
    cancel_url: `${YOUR_DOMAIN}/checkoutresult?canceled=true`,
  });

  console.log(session);
  res.status(201).send({ id: session.id, intent: session.payment_intent });
  
});

app.get('/payment-status/:payment_intent_id', async (req, res) => {
  const id = req.params.payment_intent_id;
  
  // Get status from stripe
  const paymentInfo = await stripe.paymentIntents.retrieve(id);
  res.status(200).send({ paymentInfo });
  
});

app.listen(SERVER_PORT, () => console.log('Running on port '+SERVER_PORT));