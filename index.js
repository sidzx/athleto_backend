require('dotenv').config()
const express=require('express')
const cors=require('cors')
const server=express()
server.use(express.json())
server.use(cors())

const Stripe=require('stripe')

const route=require('./routes/routes')
server.use(route)


const PORT=process.env.PORT || 4000
require("./connection/connection")

server.use('/upload',express.static('./uploads'))

server.listen(PORT,()=>{
    console.log("server is successfully on port:",PORT)
})
server.get('/',(req,res)=>{
    res.send("server is running live")
})
const stripe = Stripe('sk_test_51Qh4HwP1dukbOLddux562g1SNmbLicAkZP4YsMMBHz9yHBg4e1VSNoDGCuWkDZT0mo3Di3MrVGC8pkHBwVlqgwLV00y6vXW7oU'); // Replace with your Stripe secret key



server.post('/create-payment-intent', async (req, res) => {
    console.log("inside payment")
    const { amount } = req.body;
    console.log(`${amount}`)
  
    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Invalid amount' });
    }
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });
  
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: error.message });
     
    }
  });