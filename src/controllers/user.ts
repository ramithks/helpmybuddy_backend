// src/controllers/userController.ts
import { Request, Response } from "express";
import User, { UserDocument } from "../models/user";

const createUser = async (req: Request, res: Response) => {
  try {
    const { full_name, email, profileImageUrl } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "User already exists.", data: existingUser });
    }

    const newUser: UserDocument = new User({
      full_name,
      email,
      profileImageUrl,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      status: "New User created successfully ",
      data: savedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "An error occurred while creating the user.",
      data: {},
    });
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

export default createUser;
