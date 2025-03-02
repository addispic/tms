import dotenv from "dotenv";
// dotenv config
dotenv.config();
import express, { Express } from "express";
import cookieParser from "cookie-parser";

// config
import db from "./config/db";

// routes
// users
import usersRoutes from "./routes/users.routes";
// app
const app: Express = express();
// port
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routes
// users
app.use("/api/users", usersRoutes);

// listening
app.listen(PORT, async () => {
  await db();
  console.log(`server running at http://localhost:${PORT}`);
});
