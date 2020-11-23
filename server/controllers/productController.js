const db = require("../models");

module.exports = {
  findAll: async function (req, res) {
    try {
      const products = await db.Product.find({});
      res.json(products);
    } catch (error) {
      res.status(422).json(error);
    }
  },
  findById: async function (req, res) {
    try {
      const product = await db.Product.findById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ message: "Product not found." });
    }
  },
  deleteById: async function (req, res) {
    try {
      const product = await db.Product.findById(req.params.id);
      await product.remove();
      res.json({ message: "Product removed" });
    } catch (error) {
      res.status(404).json({ message: "Product not found." });
    }
  },
  createProduct: async function (req, res) {
    try {
      const product = new db.Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "Sample brand",
        category: "Sample category",
        numInStock: 0,
        numReviews: 0,
        description: "Sample description",
      });

      const createdProduct = await product.save();
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(422).json(error);
    }
  },
  updateProduct: async function (req, res) {
    try {
      const {
        name,
        price,
        description,
        image,
        brand,
        category,
        numInStock,
      } = req.body;

      const product = await db.Product.findById(req.params.id);

      if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.numInStock = numInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
      } else {
        res.status(404).json({ message: "Product not found." });
      }
    } catch (error) {
      res.status(422).json(error);
    }
  },
};
