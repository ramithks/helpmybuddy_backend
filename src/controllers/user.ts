// src/controllers/userController.ts
import { Request, Response } from "express";
import User, { UserDocument } from "../models/User";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/secrets";

const createUser = async (req: Request, res: Response) => {
  try {
    const { full_name, email, profileImageUrl } = req.body;

    // Check if the user already exists
    let existingUser = await User.findOne({ email });
    let isNewUser = false;

    if (!existingUser) {
      // If user doesn't exist, create a new one
      const newUser = new User({
        full_name,
        email,
        profileImageUrl,
      });

      existingUser = await newUser.save();
      isNewUser = true;
    }

    // Generate jwt for the user
    const token = jwt.sign({ _id: existingUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    // replace 'SECRET_KEY' with your secret key,

    return res.status(201).json({
      message: isNewUser
        ? "New User created successfully"
        : "User logged in successfully",
      data: existingUser.toObject(), // Convert to plain JavaScript object
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while creating the user.",
      data: {},
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    // Extract the object Id from the request parameters
    const { id } = req.params;

    // If no id is provided, return with a 400 error
    if (!id) {
      return res.status(400).json({ messege: "No Id provided", data: {} });
    }

    // Validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ messege: "Invalid User Id provided", data: {} });
    }

    // Find the user with the given object Id in the database
    const user: UserDocument | null = await User.findById(id);

    if (!user) {
      // If the user is not found, return a 404 status with a message
      return res.status(404).json({ messege: "User not found", data: {} });
    }

    // If the user is found, return it as a response
    res.json({ messege: "User Found", data: user });
  } catch (error) {
    // Log technical error for the system admin, do not expose this to the user
    console.error(error);

    // Send a non-technical error message to the client
    res
      .status(500)
      .json({ messege: "An internal server error occurred", data: {} });
  }
};

export default createUser;
