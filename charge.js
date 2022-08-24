const Stripe = require("stripe"
)
const request = require('request');

const { endpoint, masterKey, port } = require('./config');
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const stripe = new Stripe(masterKey)

require("dotenv").config();

const server = express();

server.use(helmet());

//server.use(morgan("combined"));
server.use(express.json());

server.use(cors());
// server.options("*", cors());


server.post('/api/charge',async (req,res)=>{ 
  
  const {id ,amount} = req.body;
console.log(amount,"amount")

try {
  const payment = await stripe.paymentIntents.create({
    amount,
    
    currency:"USD",
    description:"Forever Immortal",
    payment_method:id,confirm:true
  })
console.log(payment)
  return res.status(200).json({confirm:"done"})
} catch (error) {
  console.log(error)
  return res.status(400).json({message:error.message})
}

})




router.get('/', function(req, res, next) {
  request({
    uri: 'https://api.printful.com',

    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
        res.json(body);
      } else {
        res.json(error);
      }
    }
  });
});

router.get('/store', function(req, res, next) {
  request({
    uri: 'https://api.printful.com/store',
  
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log(body);
        res.json(body);
      } else {
        res.json(error);
      }
    }
  });
});
module.exports = server;
