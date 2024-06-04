import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { format, parse } from "date-fns";
import { ja } from "date-fns/locale";

function TicketsList() {
  const tickets = useAppSelector((state) => state.tickets);
  const copiedTickets = [...tickets];
  const sortedTickets = copiedTickets.sort((a, b) => {
    const dateA = parse(a.date, "yyyy-MM-dd", new Date()).getTime();
    const dateB = parse(b.date, "yyyy-MM-dd", new Date()).getTime();
    const raceNumberA = Number(a.raceNumber);
    const raceNumberB = Number(b.raceNumber);
    if (dateA === dateB) {
      if (raceNumberA === raceNumberB) {
        return b.createDate - a.createDate;
      }
      return raceNumberB - raceNumberA;
    }
    return dateB - dateA;
  });

  return (
    <ol>
      {sortedTickets.map((ticket) => (
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
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default TicketsList;
