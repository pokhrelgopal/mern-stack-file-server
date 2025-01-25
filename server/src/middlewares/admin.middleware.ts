import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ error: "Authentication token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    next(error);
  }
};
