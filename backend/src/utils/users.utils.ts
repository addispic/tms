import { Error } from "mongoose";
import jwt from "jsonwebtoken";
// interface
interface Errors {
  username?: string;
  email?: string;
  password?: string;
}
// max age
export const MAX_AGE = 60 * 60 * 24;
// error handler
export const errorHandler = (err: any): Errors => {
  console.log(err);
  const errors: Errors = {};
  // field errors
  if (err?.message === "password required") {
    errors.password = "password required";
  }
  if (err?.message === "username required") {
    errors.username = "username required";
  }
  if (err?.message === "username not exist") {
    errors.username = "username not exist";
  }
  if (err?.message === "incorrect password") {
    errors.password = "incorrect password";
  }
  // validation error
  if (err instanceof Error.ValidationError) {
    for (const key in err.errors) {
      if (err.errors[key].message) {
        if (key === "username") {
          errors.username = err.errors[key].message;
        }
        if (key === "email") {
          errors.email = err.errors[key].message;
        }
        if (key === "password") {
          errors.password = err.errors[key].message;
        }
      }
    }
  }
  //   duplicate key
  if ((err as any).code === 11000) {
    const duplicateField = Object.keys((err as any).keyValue)[0];
    if (duplicateField === "username") {
      errors.username = "username already exist";
    }
    if (duplicateField === "email") {
      errors.email = "email address already exist";
    }
  }
  return errors;
};

// generate token
export const generateToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET as string, {
    expiresIn: MAX_AGE,
  });
};
