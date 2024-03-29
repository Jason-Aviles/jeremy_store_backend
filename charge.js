const Stripe = require("stripe");
const request = require("request");

const { endpoint, masterKey, port } = require("./config");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const stripe = new Stripe(masterKey);
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
require("dotenv").config();

const server = express();

server.use(helmet());

//server.use(morgan("combined"));
server.use(express.json());

server.use(cors());
// server.options("*", cors());

server.post("/api/charge", async (req, res) => {
  const { id, amount } = req.body;
  console.log(amount, "amount");

  try {
    const payment = await stripe.paymentIntents.create({
      amount,

      currency: "USD",
      description: "Forever Immortal",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    return res.status(200).json({ confirm: "done" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
});

server.get("/", async (request, response) => {
  const headers = {
    Authorization: "Basic MzQyOXlzZ2QtMGVmMC1wMndxOmk3ODcteDBsY2xoZG1udnpp",
  }


  const url = `https://api.printful.com/`;
  const res = await fetch(url,{headers});
  const data = await res.json();

  response.json(data);
});

server.get("/store", async (request, response) => {
  const headers = {
    Authorization: "Basic MzQyOXlzZ2QtMGVmMC1wMndxOmk3ODcteDBsY2xoZG1udnpp",
  }
 

 try {
    const url = `https://api.printful.com/store`;
  const res = await fetch(url,{headers});
  const data = await res.json();

 return response.json(data);
 } catch (error) {
   console.log(error)
 }
});

server.get("/api/store/products", async (request, response) => {
  
  const headers = {
    Authorization: "Basic MzQyOXlzZ2QtMGVmMC1wMndxOmk3ODcteDBsY2xoZG1udnpp",
  }

  
  try {
    const url = `https://api.printful.com/store/products`;
  const res = await fetch(url,{headers});
  const data = await res.json();

  return response.json(data);
  } catch (error) {
    console.log(error)
  }
});
server.get("/api/store/products/:id", async (request, response) => {
  const {id} = request.params
    const headers = {
      Authorization: "Basic MzQyOXlzZ2QtMGVmMC1wMndxOmk3ODcteDBsY2xoZG1udnpp",
    }
  
  

   try {
       const url = `https://api.printful.com/store/products/${id}`;
    const res = await fetch(url,{headers});
    const data = await res.json();
  
   return response.json(data);
   } catch (error) {
     console.log(error)
     
   }
  });
module.exports = server;
