import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { registerNewUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerNewUser);

export default router;
