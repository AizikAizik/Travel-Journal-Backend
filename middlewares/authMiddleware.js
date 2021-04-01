import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //check if token is in the header and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decodedToken.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }

  //throw exception if token is not found
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

export { protect };
