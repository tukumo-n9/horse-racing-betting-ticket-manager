import { createSlice } from "@reduxjs/toolkit";

export type ticketState = {
  id: string;
  createDate: string;
  updateDate: string;
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
    updateDate: "",
    date: "2024-05-18",
    racetrack: "京都",
    raceNumber: "5",
    betAmount: 100,
    payout: 200,
  },
  {
    id: "2",
    createDate: "1716107513229",
    updateDate: "",
    date: "2024-05-18",
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
    ticketUpdated(state, action) {
      const { id, updateDate, date, racetrack, raceNumber, betAmount, payout } =
        action.payload;
      const existingTicket = state.find((ticket) => ticket.id === id);
      if (existingTicket) {
        existingTicket.updateDate = updateDate;
        existingTicket.date = date;
        existingTicket.racetrack = racetrack;
        existingTicket.raceNumber = raceNumber;
        existingTicket.betAmount = betAmount;
        existingTicket.payout = payout;
      }
    },
  },
});

export const { ticketAdded, ticketDeleted, ticketUpdated } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
