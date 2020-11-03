const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/users/login"
router.route("/login").post(userController.authenticateUser);

// Matches with "/api/users/:id"
// router.route("/:id").get(userController.findById);

module.exports = router;
