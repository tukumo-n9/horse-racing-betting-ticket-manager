import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { format, parse } from "date-fns";
import { ja } from "date-fns/locale";

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
      <Link to={`/tickets/${ticket.id}/edit`}>編集</Link>
      <button>削除</button>
    </>
  );
}
