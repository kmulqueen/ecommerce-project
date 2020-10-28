const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear collections of any pre-existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Populate DB with test users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // Populate DB with test products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log("Seed data imported.");
    process.exit();
  } catch (error) {
    console.error(`Seed data import error: ${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    // Clear collections of any pre-existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Seed data deleted.");
    process.exit();
  } catch (error) {
    console.error(`Seed data delete error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
