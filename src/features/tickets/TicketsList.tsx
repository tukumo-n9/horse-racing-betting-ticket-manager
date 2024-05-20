import { useAppDispatch, useAppSelector } from "../../hooks";
import { ticketDeleted } from "./ticketsSlice";

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
          <p>{ticket.date}</p>
          <p>{`${ticket.racetrack}${ticket.raceNumber}R`}</p>
          <dl>
            <div>
              <dt>購入金額</dt>
              <dd>￥{ticket.betAmount}</dd>
            </div>
            <div>
              <dt>払い戻し金額</dt>
              <dd>￥{ticket.payout}</dd>
            </div>
          </dl>
          <button>編集</button>
          <button onClick={() => handleDelete(ticket.id)}>削除</button>
        </li>
      ))}
    </ol>
  );
}

export default TicketsList;
