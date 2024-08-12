import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "../features/tickets/ticketsSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    auth: authReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
