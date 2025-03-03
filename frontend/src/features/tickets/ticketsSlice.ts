import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";

// store
import { RootState } from "../../store";

// ticket interface
export type ITicket = {
  _id: string;
  user: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Closed";
  createdAt: string;
  description: string;
  updatedAt: string;
};

// initial state interface
interface IInitialState {
  isTicketsFetching: boolean;
  tickets: ITicket[];
  isNewTicketAdding: boolean;
  isNewTicketAddingDone: boolean;
  isTicketEditingOn: ITicket | null;
}

// initial state
const initialState: IInitialState = {
  isTicketsFetching: false,
  tickets: [],
  isNewTicketAdding: false,
  isNewTicketAddingDone: false,
  isTicketEditingOn: null,
};

// get tickets
export const getTickets = createAsyncThunk("tickets/getTickets", async () => {
  try {
    const response = await axios.get("/api/tickets");
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      return err.response?.data;
    } else {
      return { errors: { flag: "unexpected error has occurred get tickets" } };
    }
  }
});

// add new ticket
export const addNewTicket = createAsyncThunk(
  "tickets/addNewTicket",
  async (data: {
    title: string;
    status: string;
    priority: string;
    description: string;
  }) => {
    try {
      const response = await axios.post("/api/tickets/new", data);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return {
          errors: { flag: "unexpected error has occurred add tickets" },
        };
      }
    }
  }
);

// edit ticket
export const editTicket = createAsyncThunk(
  "tickets/editTicket",
  async (data: {
    _id: string;
    title: string;
    status: string;
    priority: string;
    description: string;
  }) => {
    try {
      const response = await axios.put(`/api/tickets/update/${data._id}`, data);
      return response.data;
    } catch (err) {
      if (isAxiosError(err)) {
        return err.response?.data;
      } else {
        return {
          errors: { flag: "unexpected error has occurred edit tickets" },
        };
      }
    }
  }
);

// slice
const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    resetIsNewTicketAddingDone: (state) => {
      state.isNewTicketAddingDone = false;
    },
    setIsTicketEditingOn: (state, action: PayloadAction<ITicket | null>) => {
      state.isTicketEditingOn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // cases
      // get tickets
      .addCase(getTickets.pending, (state) => {
        state.isTicketsFetching = true;
      })
      // fulfilled
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isTicketsFetching = false;
        if (action.payload.tickets) {
          state.tickets = action.payload.tickets;
        }
      })
      // rejected
      .addCase(getTickets.rejected, (state) => {
        state.isTicketsFetching = false;
      })
      // add new ticket
      .addCase(addNewTicket.pending, (state) => {
        state.isNewTicketAdding = true;
      })
      // fulfilled
      .addCase(addNewTicket.fulfilled, (state, action) => {
        state.isNewTicketAdding = false;
        if (action.payload.ticket) {
          state.tickets.unshift(action.payload.ticket);
          state.isNewTicketAddingDone = true;
        }
      })
      // rejected
      .addCase(addNewTicket.rejected, (state) => {
        state.isNewTicketAdding = false;
      })
      // edit ticket
      .addCase(editTicket.pending, (state) => {
        state.isNewTicketAdding = true;
      })
      .addCase(editTicket.fulfilled, (state, action) => {
        state.isNewTicketAdding = false;
        if (action.payload.updatedTicket) {
          state.isNewTicketAddingDone = true;
          state.tickets[
            state.tickets.findIndex(
              (ticket) => ticket._id === action.payload.updatedTicket._id
            )
          ] = action.payload.updatedTicket;
        }
      })
      .addCase(editTicket.rejected, (state) => {
        state.isNewTicketAdding = false;
      });
  },
});
// exports
export const { resetIsNewTicketAddingDone, setIsTicketEditingOn } =
  ticketsSlice.actions;
export const isTicketsFetchingSelector = (state: RootState) =>
  state.tickets.isTicketsFetching;
export const ticketsSelector = (state: RootState) => state.tickets.tickets;
export const isTicketEditingOnSelector = (state: RootState) =>
  state.tickets.isTicketEditingOn;
export const isNewTicketAddingSelector = (state: RootState) =>
  state.tickets.isNewTicketAdding;
export const isNewTicketAddingDoneSelector = (state: RootState) =>
  state.tickets.isNewTicketAddingDone;
export default ticketsSlice.reducer;
