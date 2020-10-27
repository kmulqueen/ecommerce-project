import express from "express";
import dotenv from "dotenv";

// Products will ultimately come from MongoDB. This is just a placeholder with dummy data for now.
import products from "./data/products.js";

dotenv.config();
const app = express();

// Basic Routes
app.get("/", (req, res) => {
  res.send("api is running");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  res.json(product);
});

// Run Server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);
