import { format, parse } from "date-fns";
import { ja } from "date-fns/locale";
import { Link } from "react-router-dom";
import { Ticket } from "./ticketsSlice";

interface SingleTicketProps {
  ticket: Ticket;
}

function SingleTicket({ ticket }: SingleTicketProps) {
  return (
    <li className="[&:not(:first-child)]:mt-4">
      <Link
        to={`tickets/${ticket.id}`}
        className="block border-b border-green-500 rounded-t bg-white/[0.5] hover:bg-white/[1] backdrop-blur-3xl p-4"
      >
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
        <p>収支：￥{Number(ticket.payout) - Number(ticket.betAmount)}</p>
      </Link>
    </li>
  );
}

export default SingleTicket;
