const captainModel = require("../models/captain.model");

// create catain
module.exports.createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  type,
}) => {
  if (
    !firstName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !type
  ) {
    throw new Error("All fields are required");
  }

  try {
    const captain = captainModel.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        type,
      },
    });

    return captain;
  } catch (error) {
    console.log("Error while creating captain : ", error);
    res.status(500).json({
      error: error.message,
    });
  }
};
