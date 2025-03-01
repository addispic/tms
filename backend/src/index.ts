import dotenv from "dotenv";
// dotenv config
dotenv.config();
import express, { Express } from "express";

// config
import db from "./config/db";

// routes
// users
import usersRoutes from "./routes/users.routes";
// app
const app: Express = express();
// port
const PORT = process.env.PORT || 5000;

// routes
// users
app.use("/api/users", usersRoutes);

// listening
app.listen(PORT, async () => {
  await db();
  console.log(`server running at http://localhost:${PORT}`);
});
