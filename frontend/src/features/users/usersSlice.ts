import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// store
import { RootState } from "../../store";

// login
export const login = createAsyncThunk(
  "users/login",
  async (data: { username: string; password: string }) => {
    try {
      const response = await axios.post("/api/users/login", data);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "user login failed" };
      }
    }
  }
);

// signup
export const signup = createAsyncThunk(
  "users/signup",
  async (data: { username: string; email: string; password: string }) => {
    console.log(data);
  }
);

// user
export type IUser = {
  _id: string;
  username: string;
  email: string;
  role: "super" | "sub" | "normal";
  status: "active" | "blocked";
  createdAt: string;
  updatedAt: string;
};

// error
export type IError = {
  flag: string;
  message: string;
};

// interface
interface IInitialState {
  formId: "login" | "signup";
  isFormSubmitting: boolean;
  user: IUser | null;
  error: IError | null;
}

// initial state
const initialState: IInitialState = {
  formId: "login",
  isFormSubmitting: false,
  user: null,
  error: null,
};

// users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    formIdToggler: (state, action: PayloadAction<"login" | "signup">) => {
      state.formId = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // cases
      // login
      .addCase(login.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        if (action.payload.user) {
          state.error = null;
          state.user = action.payload.user;
        }
        if (action.payload.errors) {
          state.user = null;
          if (action.payload.errors.username) {
            state.error = {
              flag: "username",
              message: action.payload.errors.username,
            };
          } else if (action.payload.errors.password) {
            state.error = {
              flag: "password",
              message: action.payload.errors.password,
            };
          }
        }
      })
      .addCase(login.rejected, (state) => {
        state.isFormSubmitting = false;
      });
  },
});

// exports
// actions
export const { formIdToggler, resetError } = usersSlice.actions;
// selectors
export const formIdSelector = (state: RootState) => state.users.formId;
export const isFormSubmittingSelector = (state: RootState) =>
  state.users.isFormSubmitting;
export const errorSelector = (state: RootState) => state.users.error;
export const userSelector = (state: RootState) => state.users.user;
// reducer
export default usersSlice.reducer;
