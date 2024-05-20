import { createSlice } from "@reduxjs/toolkit";

export type ticketState = {
  id: string;
  createDate: string;
  date: string;
  racetrack: string;
  raceNumber: number;
  betAmount: number;
  payout: number;
};

const initialState = [
  {
    id: "1",
    createDate: "1716107513229",
    date: "2024年5月18日",
    racetrack: "京都",
    raceNumber: "5",
    betAmount: 100,
    payout: 200,
  },
  {
    id: "2",
    createDate: "1716107513229",
    date: "2024年5月18日",
    racetrack: "京都",
    raceNumber: "5",
    betAmount: 100,
    payout: 200,
  },
];

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    ticketAdded(state, action) {
      state.push(action.payload);
    },
    ticketDeleted(state, action) {
      const filteredTicketsList = state.filter(
        (ticket) => ticket.id !== action.payload
      );
      return filteredTicketsList;
    },
  },
});

export const { ticketAdded, ticketDeleted } = ticketsSlice.actions;

export default ticketsSlice.reducer;
