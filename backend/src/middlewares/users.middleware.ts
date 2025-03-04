import { Request, Response, NextFunction } from "express";
import { Schema } from "mongoose";
import { verify, JwtPayload } from "jsonwebtoken";

// utils
// users
import { MAX_AGE, generateToken } from "../utils/users.utils";

declare module "express-serve-static-core" {
  interface Request {
    _id: Schema.Types.ObjectId;
  }
}

// protected routes
const protectedRoutes =
  () => (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["tms-auth-session"];
    if (!token) {
      res.status(200).json({ errors: { flag: "unauthorized" } });
      return;
    }
    const decodedToken = verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    if (!decodedToken || !decodedToken._id) {
      res.status(401).json({ errors: { flag: "unauthorized" } });
      return;
    }
    // update token
    res.cookie("tms-auth-session", generateToken(decodedToken._id), {
      maxAge: MAX_AGE * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    req._id = decodedToken._id;
    next();
  };

// exports
export default protectedRoutes;
