import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root.tsx";
import ErrorPage from "./ErrorPage.tsx";
import AddTicket from "./routes/AddTicket.tsx";
import Index from "./routes/Index.tsx";
import SingleTicket from "./routes/SingleTicket.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "add-ticket/",
        element: <AddTicket />,
      },
      { path: "tickets/:ticketId", element: <SingleTicket /> },
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
