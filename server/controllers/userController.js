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
  updateUserProfile: async function (req, res) {
    // Try to find user by ID
    const user = await db.User.findById(req.user._id);

    // Check for user
    if (user) {
      // Update fields if they were updated
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  },
  registerUser: async function (req, res) {
    const { name, email, password } = req.body;

    // Check that name, email, and password are not empty
    if (
      name === "" ||
      name === null ||
      email === "" ||
      email === null ||
      password === "" ||
      password === null
    ) {
      res
        .status(400)
        .json({ message: "Please ensure all fields are filled out." });
    } else {
      // Check if email is already registered
      const userExists = await db.User.findOne({ email });

      if (userExists) {
        res.status(400).json({ message: "Email already registered." });
      } else {
        // Create new user if email isn't already registered
        const user = await db.User.create({
          name,
          email,
          password,
        });

        if (user) {
          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          });
        } else {
          res.status(400).json({ message: "Invalid user data." });
        }
      }
    }
  },
  getAllUsers: async function (req, res) {
    const users = await db.User.find({});
    res.json(users);
  },
};
