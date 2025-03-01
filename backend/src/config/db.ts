import { connections, connect } from "mongoose";

// mongo uri
const MONGODB_URI = process.env.MONGODB_URI as string;

const db = async () => {
  if (connections[0].readyState) return;
  try {
    await connect(MONGODB_URI);
    console.log("db connected successfully");
  } catch (err) {
    console.log("db connection failed");
    process.exit(1);
  }
};

// exports
export default db;
