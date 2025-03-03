import { Router, Request, Response } from "express";
import multer from "multer";

// controllers
// profiles controllers
import {
  getProfiles,
  addNewProfile,
} from "../controllers/profiles.controllers";

// middlewares

// router
const router = Router();

// get all users profile
router.get("/", (req: Request, res: Response) => {
  getProfiles(req, res);
});

// uploads
const upload = multer({ dest: "uploads/" });

// new profile
router.post(
  "/new",
  upload.single("profile"),
  async (req: Request, res: Response) => {
    addNewProfile(req,res)
  }
);

// export
export default router;