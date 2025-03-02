import { Schema, Model, model } from "mongoose";
import { isEmail } from "validator";
// role
export enum Role {
  SUPER = "super",
  SUB = "sub",
  NORMAL = "normal",
}

// status
export enum Status {
  ACTIVE = "active",
  BLOCKED = "blocked",
}

// user interface
export interface IUser extends Document {
  username: string;
  email: string;
  role: Role;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  password: string;
}

// user schema
const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, "username required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email address is required"],
      unique: true,
      validate: {
        validator: (value: string) => isEmail(value),
        message: "invalid email address",
      },
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.NORMAL,
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.ACTIVE,
    },
    password: {
      type: String,
      required: [true, "password required"],
      minlength: [3, "too short password"],
    },
  },
  { timestamps: true }
);

// user
const User: Model<IUser> = model<IUser>("User", userSchema);

// exports
export default User;
