const router = require("express").Router();
const userController = require("../../controllers/userController");
const protect = require("../../middleware/authMiddleware");

// Matches with "/api/users/login"
router.route("/login").post(userController.authenticateUser);

// Matches with "/api/users/profile" - PROTECTED ROUTE
router.route("/profile").get(protect, userController.getUserProfile);

module.exports = router;
