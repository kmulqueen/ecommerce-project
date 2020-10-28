const bcrypt = require("bcryptjs");

// This is dummy placeholder data. Will be removed after testing.
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("testing", 10),
    isAdmin: true,
  },
  {
    name: "Test User 1",
    email: "test1@example.com",
    password: bcrypt.hashSync("testing", 10),
  },
  {
    name: "Test User 2",
    email: "test2@example.com",
    password: bcrypt.hashSync("testing", 10),
  },
];

module.exports = users;
