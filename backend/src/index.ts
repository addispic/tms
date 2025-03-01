import dotenv from "dotenv";
// dotenv config
dotenv.config();
import express, { Express } from "express";

// config
import db from "./config/db";

// app
const app: Express = express();
// port
const PORT = process.env.PORT || 5000;

// listening
app.listen(PORT, async () => {
  await db();
  console.log(`server running at http://localhost:${PORT}`);
});
