import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root.tsx";
import ErrorPage from "./ErrorPage.tsx";
import Index from "./routes/Index.tsx";
import SingleTicket from "./routes/SingleTicket.tsx";
import AddTicketForm from "./features/tickets/AddTicketForm.tsx";
import EditTicketForm from "./features/tickets/EditTicketForm.tsx";
import Login from "./routes/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "*", element: <ErrorPage /> },
      {
        path: "add-ticket/",
        element: <AddTicketForm />,
      },
      { path: "tickets/:ticketId", element: <SingleTicket /> },
      { path: "tickets/:ticketId/edit", element: <EditTicketForm /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
