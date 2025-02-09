import { useAppSelector } from "../../hooks";
import { parse } from "date-fns";
import SingleTicket from "./SingleTicket";

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
        <SingleTicket key={ticket.id} ticket={ticket} />
      ))}
    </ol>
  );
}

export default TicketsList;
