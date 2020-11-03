const jwt = require("jsonwebtoken");
const User = require("../models").User;

const protect = async (req, res, next) => {
  let token;

  // If Bearer token found
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from the authorization header
      token = req.headers.authorization.split(" ")[1];
      // Decode token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      // Set req.user to the authorized user
      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized request. Please login." });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Unauthorized request. Please login." });
  }
};

module.exports = protect;
