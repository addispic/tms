import express, { Express } from "express";

// app
const app: Express = express();

// listening
app.listen(5000, () => {
  console.log("server running...");
});
