import express from "express";
import mongoose from "mongoose";
import { MONGO_URI, PORT } from "./utils/secrets";
import authRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json()); // Parse incoming JSON data

mongoose.connect(MONGO_URI, () => {
  console.log("connected to mongodb");
});

app.use("/user", authRoutes);
//app.use("/user", userRoutes);

// Instead of rendering a template, we will send JSON data for the home route
app.get("/", (req, res) => {
  if (req.user) {
    // If the user is authenticated, return user data in JSON format
    res.json({ user: req.user });
  } else {
    // If the user is not authenticated, return a message indicating the user is not logged in
    res.json({ message: "Not logged in" });
  }
});

app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
