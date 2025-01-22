import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma";

export const adminOrSelf = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;
    const id = req.params.id;

    if (!token) {
      res.status(401).json({ error: "Authentication token missing" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;

    const user = await prisma.user.findUnique({
      where: { id: (req as any).user.userId },
    });

    if (!user || user.id !== id) {
      res
        .status(403)
        .json({ error: "Access denied: Admins only or self-access only" });
      return;
    }

    next();
  } catch (error) {
    console.error("Middleware error:", error);
    next(error);
  }
};
