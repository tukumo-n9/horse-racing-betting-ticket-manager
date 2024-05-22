import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";

export default function SingleTicket() {
  const { ticketId } = useParams();

  const ticket = useAppSelector((state) =>
    state.tickets.find((ticket) => ticket.id === ticketId)
  );

  if (!ticket) {
    return <p>馬券が見つかりませんでした。</p>;
  }

  return (
    <>
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
    </>
  );
}
