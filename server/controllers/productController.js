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
};
