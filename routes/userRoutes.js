import express from "express";
import { fetchAllUsers, authLogin } from "../controllers/userController.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', protect, fetchAllUsers);
router.post('/login', authLogin);

export default router;