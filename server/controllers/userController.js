const db = require("../models");
const generateToken = require("../utils/generateToken");

module.exports = {
  authenticateUser: async function (req, res) {
    const { email, password } = req.body;

    // Try to find user by email
    const user = await db.User.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid login credentials." });
    }
  },
  getUserProfile: async function (req, res) {
    // Try to find user by ID
    const user = await db.User.findById(req.user._id);

    // Check for user
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  },
};
