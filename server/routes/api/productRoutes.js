const router = require("express").Router();
const productController = require("../../controllers/productController");

// Matches with "/api/products/"
router.route("/").get(productController.findAll);

// Matches with "/api/products/:id"
router.route("/:id").get(productController.findById);

module.exports = router;
