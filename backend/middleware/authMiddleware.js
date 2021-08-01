import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protectRoute = asyncHandler(async (req, res, next) => {
  let token;
  let authorizationHeader = req.headers.authorization;

  // check that token is a bearer token
  if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
    try {
      token = authorizationHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
});
