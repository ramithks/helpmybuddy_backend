import express from "express";
import { createUser, getUserById } from "../controllers/user";
const router = express.Router();

router.post("/create", createUser); // Add the createUser function as a POST route to create a new user

router.get("/:id", getUserById); // Add the getUserById function as a GET route to fetch a user by their UserById

export default router;
