import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { registerNewUser, authUser } from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(registerNewUser);
router.post("/login", authUser);

export default router;
