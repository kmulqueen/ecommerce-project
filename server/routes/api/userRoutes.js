const router = require("express").Router();
const userController = require("../../controllers/userController");
const protect = require("../../middleware/authMiddleware");

// Matches with "/api/users"
router.route("/").post(userController.registerUser);

// Matches with "/api/users/login"
router.route("/login").post(userController.authenticateUser);

// Matches with "/api/users/profile" - PROTECTED ROUTE
router.route("/profile").get(protect, userController.getUserProfile);
router.route("/profile").put(protect, userController.updateUserProfile);

module.exports = router;
