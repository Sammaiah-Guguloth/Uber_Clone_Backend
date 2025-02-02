const userModel = require("../models/user.model");
const userService = require("../services/user.services");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.model");

// register user
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  try {
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ user, token });
  } catch (error) {
    console.log("Error while registering user : ", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// login user
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = user.generateAuthToken();
    res.cookie("token", token);

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log("Error while logging in user : ", error);
    res.status(500).json({
      error: error,
    });
  }
};

// get user profile
module.exports.getUserProfile = async (req, res, next) => {
  return res.status(200).json({ user: req.user });
};

// logout user
module.exports.logoutUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  res.clearCookie("token");

  try {
    await blackListTokenModel.create({ token });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("error while logging out user : ", error);
    res.status(500).json({ error: error.message });
  }
};
