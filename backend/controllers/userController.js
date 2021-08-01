import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateJWT from "../utils/generateJWT.js";

/**
 * @desc Register a new user
 * @route POST /api/users
 * @access Public
 */
const registerNewUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email });

  // if username and/or email already taken, don't create new account
  if (usernameExists) {
    res.status(400);
    throw new Error("Username is already taken.");
  }

  if (emailExists) {
    res.status(400);
    throw new Error("Email is already taken.");
  }

  // if username and email is not taken, create new user
  const user = await User.create({
    username,
    email,
    password,
  });

  // if user was successfully created
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateJWT(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc Authentication of login user
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // check input email was valid
  if (!user) {
    res.status(401);
    throw new Error("Invalid email.");
  }

  const isPasswordValid = await user.matchPassword(password);
  // check input password was valid
  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid password");
  }

  // if user exists and input password match with database, send back respond with user info
  res.json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateJWT(user._id),
  });
});

export { registerNewUser, authUser };
