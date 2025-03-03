import { configureStore } from "@reduxjs/toolkit";

// reducers
import users from "./features/users/usersSlice";
import profiles from "./features/profiles/profilesSlice";
import tickets from "./features/tickets/ticketsSlice";

// store
export const store = configureStore({
  reducer: {
    users,
    profiles,
    tickets,
  },
});

// root state
export type RootState = ReturnType<typeof store.getState>;
// app dispatch
export type AppDispatch = typeof store.dispatch;
