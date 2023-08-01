import express from "express";
import passport from "passport";
const router = express.Router();

router.get("/login", (req, res) => {
  if (req.user) {
    res.json({ redirectUrl: "/profile" }); // Return JSON data with the redirect URL
  } else {
    res.json({ message: "Please log in" }); // Return JSON data indicating the user needs to log in
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logged out successfully" }); // Return JSON data indicating successful logout
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.json({ redirectUrl: "/profile" }); // Return JSON data with the redirect URL after successful authentication
});

export default router;
