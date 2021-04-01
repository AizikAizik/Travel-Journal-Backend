import express from "express";
import {
  fetchAllUsers,
  authLogin,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, fetchAllUsers);
router.post("/login", authLogin);
router.post("/register", registerUser);

export default router;
