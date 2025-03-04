import dotenv from "dotenv";
// dotenv config
dotenv.config();
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// config
import db from "./config/db";

// middlewares
import protectedRoutes from "./middlewares/users.middleware";

// routes
// users
import usersRoutes from "./routes/users.routes";
// profiles
import profilesRoute from "./routes/profiles.routes";
// tickets
import ticketsRoutes from "./routes/tickets.routes";
// app
const app: Express = express();
// port
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://ticketmanagement-xi.vercel.app"],
    credentials: true,
  })
);
// routes
app.use("/", (req, res) => {
  res.status(200).json({ message: "server running" });
});
// users
app.use("/api/users", usersRoutes);
// profiles
app.use("/api/profiles", protectedRoutes(), profilesRoute);
// tickets
app.use("/api/tickets", protectedRoutes(), ticketsRoutes);

// listening
app.listen(PORT, async () => {
  await db();
  console.log(`server running at http://localhost:${PORT}`);
});
