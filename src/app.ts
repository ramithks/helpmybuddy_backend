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
  res.json({ message: "Welcome to HelpMyBuddy" });
});

app.listen(PORT, () => {
  console.log("App listening on port: " + PORT);
});
