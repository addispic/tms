import { Router, Request, Response } from "express";

// controllers
import {
  getTickets,
  addTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/tickets.controllers";

// router
const router = Router();

// get tickets
router.get("/", (req: Request, res: Response) => {
  getTickets(req, res);
});

// add ticket
router.post("/new", (req: Request, res: Response) => {
  addTicket(req, res);
});

// update ticket
router.put("/update/:_id", (req: Request, res: Response) => {
  updateTicket(req, res);
});

// delete ticket
router.delete("/delete/:_id", (req: Request, res: Response) => {
  deleteTicket(req, res);
});

// exports
export default router;
