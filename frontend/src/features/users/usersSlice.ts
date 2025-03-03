import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// store
import { RootState } from "../../store";

// get users
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data;
    } else {
      return { error: "get users failed" };
    }
  }
});

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
    try {
      const response = await axios.post("/api/users/signup", data);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "user signup failed" };
      }
    }
  }
);

// is authenticated
export const isAuthenticated = createAsyncThunk(
  "users/isAuthenticated",
  async () => {
    try {
      const response = await axios.get("/api/users/is-authenticated");
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return { error: "is authentication failed" };
      }
    }
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
  isAuthenticating: boolean;
  isGetUsersFetching: boolean;
  user: IUser | null;
  users: IUser[];
  error: IError | null;
}

const localUser = localStorage.getItem("user");

// initial state
const initialState: IInitialState = {
  formId: "login",
  isFormSubmitting: false,
  isAuthenticating: false,
  user: localUser ? JSON.parse(localUser) : null,
  error: null,
  isGetUsersFetching: false,
  users: []
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
          localStorage.setItem("user", JSON.stringify(action.payload.user));
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
      })
      // signup
      .addCase(signup.pending, (state) => {
        state.isFormSubmitting = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isFormSubmitting = false;
        if (action.payload.newUser) {
          state.user = action.payload.newUser;
          localStorage.setItem("user", JSON.stringify(action.payload.newUser));
          state.error = null;
        }
        if (action.payload.errors?.username) {
          state.error = {
            flag: "username",
            message: action.payload.errors.username,
          };
        } else if (action.payload.errors?.email) {
          state.error = {
            flag: "email",
            message: action.payload.errors.email,
          };
        } else if (action.payload.errors?.password) {
          state.error = {
            flag: "password",
            message: action.payload.errors.password,
          };
        }
      })
      .addCase(signup.rejected, (state) => {
        state.isFormSubmitting = false;
      })
      // is authenticating
      .addCase(isAuthenticated.pending, (state) => {
        state.isAuthenticating = true;
      })
      .addCase(isAuthenticated.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        if (action.payload.user) {
          state.user = action.payload.user;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(isAuthenticated.rejected, (state) => {
        state.isAuthenticating = false;
      })
      // get users
      .addCase(getUsers.pending, (state) => {
        state.isGetUsersFetching = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isGetUsersFetching = false;
        if(action.payload.users){
          state.users = action.payload.users;
        }
      })
      .addCase(getUsers.rejected, (state) => {
        state.isGetUsersFetching = false;
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
export const isAuthenticatingSelector = (state: RootState) =>
  state.users.isAuthenticating;
export const errorSelector = (state: RootState) => state.users.error;
export const userSelector = (state: RootState) => state.users.user;
export const usersSelector = (state: RootState) => state.users.users;
export const isGetUsersFetchingSelector = (state: RootState) => state.users.isGetUsersFetching;
// reducer
export default usersSlice.reducer;
