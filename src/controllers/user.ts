// src/controllers/userController.ts
import { Request, Response } from "express";
import User, { UserDocument } from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    // Extract data from the request body
    const {
      googleId,
      full_name,
      email,
      profileImageUrl,
      gender,
      phoneNumber,
      geoLocation,
      address,
      aadharCardUrl,
      upiId,
      isEligible,
    } = req.body;

    // Create a new user instance using the User model
    const newUser: UserDocument = new User({
      googleId,
      full_name,
      email,
      profileImageUrl,
      gender,
      phoneNumber,
      geoLocation,
      address,
      aadharCardUrl,
      upiId,
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

export const getUserByGoogleId = async (req: Request, res: Response) => {
  try {
    // Extract the googleId from the request parameters
    const { googleId } = req.params;

    // Find the user with the given googleId in the database
    const user: UserDocument | null = await User.findOne({ googleId });

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
