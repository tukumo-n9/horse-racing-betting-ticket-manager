import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { format, parse } from "date-fns";
import { ja } from "date-fns/locale";
import { ticketDeleted } from "../features/tickets/ticketsSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function SingleTicket() {
  const { ticketId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);

  const ticket = useAppSelector((state) =>
    state.tickets.find((ticket) => ticket.id === ticketId)
  );

  const handleDelete = async (id: string) => {
    if (authState) {
      dispatch(ticketDeleted(id));
      await deleteDoc(doc(db, "users", auth.currentUser!.uid, "tickets", id));
      navigate("/");
    }
  };

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
      <p>収支：￥{Number(ticket.payout) - Number(ticket.betAmount)}</p>
      <Link to={`/tickets/${ticket.id}/edit`}>編集</Link>
      <button onClick={() => handleDelete(ticket.id)}>削除</button>
      <Link to={"/"}>一覧に戻る</Link>
    </>
  );
}
