import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { generateToken } from "../utils/token.js";

// GET /api/user
// DESC controller for fetching all users in the database
// private route for admin
const fetchAllUsers = asyncHandler(
    async (req, res) =>{
        const users = await User.find({});
        res.send(users);
    }
)

// POST /api/user/login
// DESC controller for authenticating user login
// public route
const authLogin = asyncHandler(
    async (req, res) =>{
        const {
            email,
            password
        } = req.body;

        const user = await User.findOne({ email});

        if(user && (await user.matchPassword(password))){
            res.json({
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user.id)
            })
        }else{
            res.status(401);
            throw new Error("Invalid email or password");
        }
    }
)

export {
    fetchAllUsers,
    authLogin,
}