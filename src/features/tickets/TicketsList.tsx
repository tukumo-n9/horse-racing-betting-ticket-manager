import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ticketDeleted } from "./ticketsSlice";
import { format, parse } from "date-fns";
import { ja } from "date-fns/locale";

function TicketsList() {
  const tickets = useAppSelector((state) => state.tickets);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(ticketDeleted(id));
  };

  return (
    <ol>
      {tickets.map((ticket) => (
        <li key={ticket.id}>
          <Link to={`tickets/${ticket.id}`}>
            <p>
              {format(
                parse(ticket.date, "yyyy-MM-dd", new Date()),
                "y年M月d日(eee)",
                { locale: ja }
              )}
            </p>
            <p>{`${ticket.racetrack}${ticket.raceNumber}R`}</p>
            <p>
              {ticket.typeName}：{ticket.typeNumbers.join(" - ")}
            </p>
            <p>購入金額：￥{ticket.betAmount}</p>
            <p>払い戻し金額：￥{ticket.payout}</p>
            <button>編集</button>
            <button onClick={() => handleDelete(ticket.id)}>削除</button>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default TicketsList;
