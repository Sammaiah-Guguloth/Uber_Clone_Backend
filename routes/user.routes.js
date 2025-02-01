const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser } = require("../controllers/user.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name should be min 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be of min 6 characters"),
  ],
  registerUser
);

module.exports = router;
