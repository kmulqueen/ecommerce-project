const router = require("express").Router();
const productController = require("../../controllers/productController");
const { admin, protect } = require("../../middleware/authMiddleware");

// Matches with "/api/products/"
router.route("/").get(productController.findAll);
router.route("/").post(protect, admin, productController.createProduct);

// Matches with "/api/products/:id"
router.route("/:id").get(productController.findById);
router.route("/:id").put(protect, admin, productController.updateProduct);
router.route("/:id").delete(protect, admin, productController.deleteById);

module.exports = router;
