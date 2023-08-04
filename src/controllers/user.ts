// src/controllers/userController.ts
import { Request, Response } from "express";
import User, { UserDocument } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    // Extract data from the request body
    const { full_name, email, profileImageUrl, isEligible = false } = req.body;

    // Create a new user instance using the User model
    const newUser: UserDocument = new User({
      full_name,
      email,
      profileImageUrl,
      isEligible,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Return the created user as a response
    res.status(201).json(savedUser);
  } catch (error) {
    // If there's an error, return an error response
    res.status(500).json({ error: "Error creating user" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    // Extract the object Id from the request parameters
    const { _id } = req.params;

    // Find the user with the given object Id in the database
    const user: UserDocument | null = await User.findOne({ _id });

    if (!user) {
      // If the user is not found, return a 404 status with a message
      return res.status(404).json({ status: "User not found", data: {} });
    }

    // If the user is found, return it as a response
    res.json({ status: "User Found", data: user });
  } catch (error) {
    // If there's an error, return an error response
    res.status(500).json({ status: "Error fetching user", data: {} });
  }
};
