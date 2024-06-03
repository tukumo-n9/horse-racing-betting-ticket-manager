import { Link } from "react-router-dom";
import TicketsList from "../features/tickets/TicketsList";

export default function Index() {
  return (
    <>
      <Link to={`/add-ticket/`}>馬券を追加</Link>
      <TicketsList />;
    </>
  );
}
