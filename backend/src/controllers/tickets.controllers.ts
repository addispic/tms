import { Request, Response } from "express";
import mongoose from "mongoose";

// models
import Ticket from "../models/tickets.model";
import User from "../models/users.model";

// get routes
export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find().select("-__v").sort({ createdAt: -1 });
    return res.status(200).json({ tickets });
  } catch (err) {
    return res.status(500).json({ error: "get tickets failed" });
  }
};

// add ticket
export const addTicket = async (req: Request, res: Response) => {
  try {
    const user = req._id;
    const { title, description, status, priority } = req.body;
    const ticket = await Ticket.create({
      user,
      title,
      description,
      status,
      priority,
    });
    return res.status(200).json({ ticket });
  } catch (err) {
    return res.status(500).json({ error: "add ticket failed" });
  }
};

// update ticket
export const updateTicket = async (req: Request, res: Response) => {
  try {
    const user = new mongoose.Types.ObjectId(`${req._id}`);
    const { _id } = req.params;
    const { title, description, status, priority } = req.body;
    const ticket = await Ticket.findById(_id);
    if (!ticket) return res.status(404).json({ error: "ticket not found" });
    const isUserCan = await User.findById(user);
    if (!isUserCan) return res.status(401).json({ error: "unauthorized" });
    if (
      isUserCan.role === "super" ||
      isUserCan.role === "sub" ||
      user.equals(new mongoose.Types.ObjectId(`${ticket.user}`))
    ) {
      const updatedTicket = await Ticket.findByIdAndUpdate(
        _id,
        {
          title,
          description,
          status,
          priority,
        },
        { new: true, runValidators: true }
      );
      return res.status(200).json({ updatedTicket });
    } else {
      return res.status(401).json({ error: "unauthorized" });
    }
  } catch (err) {
    return res.status(500).json({ error: "update ticket failed" });
  }
};

// delete ticket
export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const user = new mongoose.Types.ObjectId(`${req._id}`);
    const { _id } = req.params;
    const ticket = await Ticket.findById(_id);
    if (!ticket) return res.status(404).json({ error: "ticket not found" });
    const isUserCan = await User.findById(user);
    if (!isUserCan) return res.status(401).json({ error: "unauthorized" });

    if (
      isUserCan.role === "super" ||
      isUserCan.role === "sub" ||
      user.equals(new mongoose.Types.ObjectId(`${ticket.user}`))
    ) {
      await Ticket.findByIdAndDelete(_id);
      return res.status(200).json({ message: "ticket deleted", _id });
    } else {
      return res.status(401).json({ error: "unauthorized" });
    }
  } catch (err) {
    return res.status(500).json({ error: "delete ticket failed" });
  }
};
