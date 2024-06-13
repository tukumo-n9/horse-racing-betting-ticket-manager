import { Link } from "react-router-dom";
import TicketsList from "../features/tickets/TicketsList";
import { useAppSelector } from "../hooks";

export default function Index() {
  const tickets = useAppSelector((state) => state.tickets);
  return (
    <>
      <Link to={`/add-ticket/`}>馬券を追加</Link>
      {Array.isArray(tickets) && tickets.length ? (
        <TicketsList />
      ) : (
        <p>馬券が登録されていません。</p>
      )}
    </>
  );
}
