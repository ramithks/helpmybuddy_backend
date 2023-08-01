import express from "express";
import mongoose from "mongoose";
import { COOKIE_KEY, MONGO_URI, PORT } from "./utils/secrets";
import authRoutes from "./routes/authRoutes";
import profileRoutes from "./routes/profileRoutes";
import "./config/passport";
import cookieSession from "cookie-session";
import passport from "passport";

const app = express();

app.use(express.json()); // Parse incoming JSON data

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(MONGO_URI, () => {
  console.log("connected to mongodb");
});

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

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
