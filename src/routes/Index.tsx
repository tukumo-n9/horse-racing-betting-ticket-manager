import { Link } from "react-router-dom";
import TicketsList from "../features/tickets/TicketsList";
import { useAppSelector } from "../hooks";

export default function Index() {
  const tickets = useAppSelector((state) => state.tickets);
  return (
    <>
      <Link
        to={`/add-ticket/`}
        className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        馬券を追加
      </Link>
      <div className="mt-4">
        {Array.isArray(tickets) && tickets.length ? (
          <TicketsList />
        ) : (
          <p>馬券が登録されていません。</p>
        )}
      </div>
    </>
  );
}
