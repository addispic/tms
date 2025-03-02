import { Router, Request, Response } from "express";

// controllers
// users
import {
  getAllUsers,
  login,
  signup,
  logout,
  isAuthenticated,
} from "../controllers/users.controllers";

// middlewares
import protectedRoutes from "../middlewares/users.middleware";

// router
const router = Router();

// get all users
router.get("/", protectedRoutes(), (req: Request, res: Response) => {
  getAllUsers(req, res);
});

// login
router.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

// signup
router.post("/signup", (req: Request, res: Response) => {
  signup(req, res);
});

// logout
router.get("/logout", (req: Request, res: Response) => {
  logout(req, res);
});

// is authenticated
router.get(
  "/is-authenticated",
  protectedRoutes(),
  (req: Request, res: Response) => {
    isAuthenticated(req, res);
  }
);

// exports
export default router;
