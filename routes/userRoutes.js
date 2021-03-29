import express from "express";
import { fetchAllUsers, authLogin } from "../controllers/userController.js"

const router = express.Router();

router.get('/', fetchAllUsers);
router.post('/login', authLogin);

export default router;