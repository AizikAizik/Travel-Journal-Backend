import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "14d" });
}

export { generateToken };
