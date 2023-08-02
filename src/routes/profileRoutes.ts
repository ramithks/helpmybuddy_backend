import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

// middleware to check if the user is logged in
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" }); // Return JSON data indicating the user is not logged in
  } else {
    next();
  }
};

router.get("/", checkAuth, (req, res) => {
  res.json({ user: req.user }); // Return JSON data with the user details if the user is logged in
});

export default router;