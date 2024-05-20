import { useAppSelector } from "../../hooks";

function TicketsList() {
  const tickets = useAppSelector((state) => state.tickets);

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
          <button>削除</button>
        </li>
      ))}
    </ol>
  );
}

export default TicketsList;
