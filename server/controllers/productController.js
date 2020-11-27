const db = require("../models");

module.exports = {
  findAll: async function (req, res) {
    try {
      // Define # of products per page to be shown
      const pageSize = 10;
      // Get page # from query. Default to 1 if query doesn't exist
      const page = Number(req.query.pageNumber) || 1;

      // Check for keyword query
      const keyword = req.query.keyword
        ? {
            // Check for product names that match/contain the query. Case insensitive
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
            // If no query return empty object
          }
        : {};

      // Get total count of products
      const count = await db.Product.countDocuments({ ...keyword });
      // Find all products or find all products with query search
      const products = await db.Product.find({ ...keyword })
        // Limit number of products returned
        .limit(pageSize)
        // Display correct products on each page
        .skip(pageSize * (page - 1));
      res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
  createNewReview: async function (req, res) {
    const { rating, comment } = req.body;

    const product = await db.Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400).json({ message: "Product already reviewed" });
      } else {
        const review = {
          name: req.user.name,
          rating: Number(rating),
          comment,
          user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Review added." });
      }
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  },
};
