import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ticketDeleted } from "../features/tickets/ticketsSlice";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { formatDate } from "../utils/formatDate";

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
      <div className="bg-white p-4 rounded">
        <p>{formatDate(ticket.date)}</p>
        <p>{`${ticket.racetrack}${ticket.raceNumber}R`}</p>
        <p>
          {ticket.typeName}：{ticket.typeNumbers.join(" - ")}
        </p>
        <p>購入金額：￥{ticket.betAmount}</p>
        <p>払い戻し金額：￥{ticket.payout}</p>
        <p>収支：￥{Number(ticket.payout) - Number(ticket.betAmount)}</p>
        <div className="flex justify-end gap-2 mt-4">
          <Link
            to={`/tickets/${ticket.id}/edit`}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            編集
          </Link>
          <button
            onClick={() => handleDelete(ticket.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            削除
          </button>
        </div>
      </div>
      <div className="mt-8">
        <Link
          to={"/"}
          className="block w-fit mx-auto bg-transparent hover:bg-green-500 text-green-700 hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        >
          一覧に戻る
        </Link>
      </div>
    </>
  );
}
