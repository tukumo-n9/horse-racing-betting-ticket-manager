import { createSlice } from "@reduxjs/toolkit";

export type ticketState = {
  id: string;
  createDate: number;
  updateDate: number;
  date: string;
  racetrack: string;
  raceNumber: string;
  betAmount: string;
  payout: string;
};

const initialState = [
  {
    id: "1",
    createDate: 1716107513229,
    updateDate: -1,
    date: "2024-05-18",
    racetrack: "京都",
    raceNumber: "5",
    typeName: "単勝",
    typeNumbers: ["1"],
    betAmount: "200",
    payout: "1000",
  },
  {
    id: "2",
    createDate: 1716107513225,
    updateDate: -1,
    date: "2024-05-18",
    racetrack: "京都",
    raceNumber: "5",
    typeName: "三連単",
    typeNumbers: ["1", "8", "15"],
    betAmount: "500",
    payout: "200000",
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
      const {
        id,
        updateDate,
        date,
        racetrack,
        raceNumber,
        typeName,
        typeNumbers,
        betAmount,
        payout,
      } = action.payload;
      const existingTicket = state.find((ticket) => ticket.id === id);
      if (existingTicket) {
        existingTicket.updateDate = updateDate;
        existingTicket.date = date;
        existingTicket.racetrack = racetrack;
        existingTicket.raceNumber = raceNumber;
        existingTicket.typeName = typeName;
        existingTicket.typeNumbers = typeNumbers;
        existingTicket.betAmount = betAmount;
        existingTicket.payout = payout;
      }
    },
  },
});

export const { ticketAdded, ticketDeleted, ticketUpdated } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
