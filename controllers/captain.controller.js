const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blackListToken.model");

// register captain
module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      return res.status(400).json({ message: "captain already exist" });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      type: vehicle.type,
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ message: "captain created", captain, token });
  } catch (error) {
    console.log("Error while registering captain : ", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// login captain
module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  try {
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatched = await captain.comparePassword(password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);

    res.status(201).json({
      message: "captain logged in",
      captain,
      token,
    });
  } catch (error) {
    console.log("error while logging in captain : ", error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// get captain profile
module.exports.getCaptainProfile = async (req, res, next) => {
  return res.status(200).json({ captain: req.captain });
};

// logout captain
module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.clearCookie("token");
  try {
    await blackListTokenModel.create({ token: token });

    res.status(200).json({ message: "Captain logged out successfully" });
  } catch (error) {
    console.log("Error while logging out captain : ", error);
    res.status(500).json({ error: error });
  }
};
