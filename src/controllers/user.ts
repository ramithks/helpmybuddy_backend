// src/controllers/userController.ts
import { Request, Response } from "express";
import User, { UserDocument } from "../models/User";
import mongoose from "mongoose";

const createUser = async (req: Request, res: Response) => {
  try {
    const { full_name, email, profileImageUrl } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ messege: "User already exists.", data: existingUser });
    }

    const newUser: UserDocument = new User({
      full_name,
      email,
      profileImageUrl,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      messege: "New User created successfully ",
      data: savedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      messege: "An error occurred while creating the user.",
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
