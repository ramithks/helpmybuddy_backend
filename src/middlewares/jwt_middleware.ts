import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import { SECRET_KEY } from "../utils/secrets";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader: string | undefined = req.header("Authorization");

  if (!authHeader) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  // Extract the token from the Authorization header
  const token = authHeader.replace("Bearer ", "");

  try {
    const verified: string | object = jsonwebtoken.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
