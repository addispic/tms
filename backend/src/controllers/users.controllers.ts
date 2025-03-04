import { Request, Response } from "express";
import bcrypt from "bcryptjs";
// models
// users
import User from "../models/users.model";
// utils
import { MAX_AGE, errorHandler, generateToken } from "../utils/users.utils";

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
      .select({ __v: 0, password: 0 })
      .sort({ username: 1 });
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(404).json({ error: "get users failed" });
  }
};

// login
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      throw new Error("username required");
    }
    if (!password) {
      throw new Error("password required");
    }
    const isUserExist = await User.findOne({ username });
    if (!isUserExist) {
      throw new Error("username not exist");
    }
    if (!bcrypt.compareSync(password, isUserExist.password)) {
      throw new Error("incorrect password");
    }
    res.cookie("tms-auth-session", generateToken(isUserExist._id), {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: MAX_AGE * 1000,
    });
    return res.status(200).json({
      user: {
        _id: isUserExist._id,
        username: isUserExist.username,
        email: isUserExist.email,
        role: isUserExist.role,
        status: isUserExist.status,
        createdAt: isUserExist.createdAt,
        updatedAt: isUserExist.updatedAt,
      },
    });
  } catch (err) {
    const errors = errorHandler(err);
    return res.status(400).json({ errors });
  }
};

// signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!password) {
      throw new Error("password required");
    }
    const isSuperExist = await User.findOne({ role: "super" });
    let role = isSuperExist ? "normal" : "super";
    const newUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      role,
    });
    // cookies
    res.cookie("tms-auth-session", generateToken(newUser._id), {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: MAX_AGE * 1000,
    });
    return res.status(201).json({
      message: "successful signup",
      newUser: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (err) {
    const errors = errorHandler(err);
    return res.status(400).json({ errors });
  }
};

// logout
export const logout = (req: Request, res: Response) => {
  try {
    // Loop through all cookies and clear them
    Object.keys(req.cookies).forEach((cookie) => {
      res.clearCookie(cookie, { path: "/" });
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    return res.status(500).json({ errors: { flag: "logout error" } });
  }
};

// is authenticated
export const isAuthenticated = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req._id).select({
      _id: 1,
      username: 1,
      email: 1,
      role: 1,
      status: 1,
      createdAt: 1,
      updatedAt: 1,
    });
    return res.status(200).json({ user });
  } catch (err) {
    return res
      .status(400)
      .json({ errors: { flag: "authentication checker failed" } });
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = req._id;
    const { _id } = req.params;
    const { role, status } = req.body;
    const isUserCan = await User.findById(user);
    if (!isUserCan) {
      return res.status(400).json({ error: "you are not exist" });
    }
    if (isUserCan.role !== "super") {
      return res.status(400).json({ error: "unauthorized to update user" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { role, status },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ updatedUser });
  } catch (err) {
    return res.status(400).json({ error: "update user error" });
  }
};
