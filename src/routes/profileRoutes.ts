import express from "express";
import { createUser, getUserByGoogleId } from "../controllers/user";
const router = express.Router();

router.post("/create", createUser); // Add the createUser function as a POST route to create a new user

router.get("/:googleId", getUserByGoogleId); // Add the getUserByGoogleId function as a GET route to fetch a user by their googleId

export default router;
