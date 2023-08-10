import express from "express";
import createUser, { getUserById } from "../controllers/user";
import { verifyToken } from "../middlewares/jwt_middleware";
const router = express.Router();

//!GET
// Fetch a user by UserById
router.get("/:id", verifyToken, getUserById);

//!POST
// Create a new User
router.post("/create", createUser);

export default router;
