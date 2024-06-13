import { Tuple, configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "../features/tickets/ticketsSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
  middleware: () => new Tuple(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
