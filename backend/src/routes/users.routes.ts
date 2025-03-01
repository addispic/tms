import { Router, Request, Response } from "express";

// router
const router = Router();

// get all users
router.get("/", (ree: Request, res: Response) => {
  res.status(200).send("all users");
});

// login
router.post("/login", (req: Request, res: Response) => {
  res.status(200).send("login");
});

// signup
router.post("/signup", (req: Request, res: Response) => {
  res.status(200).send("signup");
});

// logout
router.get("/logout", (req: Request, res: Response) => {
  res.status(200).send("logout");
});

// is authenticated
router.get("/is-authenticated", (req: Request, res: Response) => {
  res.status(200).send("is authenticated");
});

// exports
export default router;
