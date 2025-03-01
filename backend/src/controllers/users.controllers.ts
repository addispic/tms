import { Request, Response } from "express";

// get all users
export const getAllUsers = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Get All Users" });
};

// login
export const login = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Login" });
};

// signup
export const signup = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Signup" });
};

// logout
export const logout = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Logout" });
};

// is authenticated
export const isAuthenticated = (req: Request, res: Response) => {
  return res.status(200).json({ message: "Is Authenticated" });
};
