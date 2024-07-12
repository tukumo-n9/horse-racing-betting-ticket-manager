import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Ticket = {
  id: string;
  createDate: number;
  updateDate: number;
  date: string;
  racetrack: string;
  raceNumber: string;
  typeName: string;
  typeNumbers: string[];
  betAmount: string;
  payout: string;
};

type TicketsState = Ticket[];
const initialState: TicketsState = [];

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    ticketInitialized(state, action) {
      let copiedState = [...state];
      copiedState = action.payload;
      return copiedState;
    },
    ticketAdded(state, action: PayloadAction<Ticket>) {
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
      const existingTicket: Ticket = state.find((ticket) => ticket.id === id)!;
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

export const { ticketInitialized, ticketAdded, ticketDeleted, ticketUpdated } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
