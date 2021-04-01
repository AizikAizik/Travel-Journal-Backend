import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/token.js";

// GET /api/user
// DESC controller for fetching all users in the database
// private route for admin
const fetchAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

// POST /api/user/login
// DESC controller for authenticating user login
// public route
const authLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// POST /api/user/register
// DESC controller for registering a user
// public route
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, fullName } = req.body;

  //first check if email exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    email,
    password,
    fullName,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export { fetchAllUsers, authLogin, registerUser };
