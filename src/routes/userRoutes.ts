import express from "express";
import createUser, { getUserById } from "../controllers/user";
const router = express.Router();

//!GET
// Fetch a user by UserById
router.get("/:id", getUserById);

//!POST
// Create a new User
router.post("/create", createUser);

export default router;
