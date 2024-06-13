import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ticketUpdated } from "./ticketsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function EditTicketForm() {
  const { ticketId } = useParams();

  const ticket = useAppSelector((state) =>
    state.tickets.find((ticket) => ticket.id === ticketId)
  );

  const [date, setDate] = useState<string>(ticket?.date);
  const [racetrack, setRacetrack] = useState<string>(ticket?.racetrack);
  const [raceNumber, setRaceNumber] = useState<string>(ticket?.raceNumber);
  const [typeName, setTypeName] = useState<string>(ticket?.typeName);
  const [typeNumbers, setTypeNumbers] = useState<string[]>(ticket?.typeNumbers);
  const [betAmount, setBetAmount] = useState<string>(ticket?.betAmount);
  const [payout, setPayout] = useState<string>(ticket?.payout);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSaveTicketClicked = async () => {
    if (
      date &&
      racetrack &&
      raceNumber &&
      typeName &&
      typeNumbers.length !== 0 &&
      betAmount &&
      payout
    ) {
      const updateDate = Date.now();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          dispatch(
            ticketUpdated({
              id: ticketId,
              updateDate,
              date,
              racetrack,
              raceNumber,
              typeName,
              typeNumbers,
              betAmount,
              payout,
            })
          );
          await updateDoc(doc(db, "users", user.uid, "tickets", ticketId), {
            id: ticketId,
            updateDate,
            date,
            racetrack,
            raceNumber,
            typeName,
            typeNumbers,
            betAmount,
            payout,
          });
          setDate("");
          setRacetrack("");
          setRaceNumber("");
          setTypeName("");
          setTypeNumbers([]);
          setBetAmount("");
          setPayout("");
          navigate(`/tickets/${ticketId}`);
        }
      });
    }
  };

  return (
    <>
      <input
        type="date"
        value={date ?? ""}
        placeholder="日付"
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={racetrack} onChange={(e) => setRacetrack(e.target.value)}>
        <option value="">競馬場</option>
        <option value="京都">京都</option>
        <option value="東京">東京</option>
        <option value="新潟">新潟</option>
      </select>
      <select
        value={raceNumber}
        onChange={(e) => setRaceNumber(e.target.value)}
      >
        <option value="">レース</option>
        <option value="1">1R</option>
        <option value="2">2R</option>
        <option value="3">3R</option>
        <option value="4">4R</option>
        <option value="5">5R</option>
        <option value="6">6R</option>
        <option value="7">7R</option>
        <option value="8">8R</option>
        <option value="9">9R</option>
        <option value="10">10R</option>
        <option value="11">11R</option>
        <option value="12">12R</option>
      </select>
      <select
        value={typeName ?? ""}
        onChange={(e) => setTypeName(e.target.value)}
      >
        <option value="">券種</option>
        <option value="単勝">単勝</option>
        <option value="馬連">馬連</option>
        <option value="三連単">三連単</option>
      </select>
      <label>
        馬番
        <select
          value={typeNumbers.length === 0 ? [] : typeNumbers}
          multiple={true}
          onChange={(e) => {
            const options = [...e.target.selectedOptions];
            const values = options.map((option) => option.value);
            setTypeNumbers(values);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
        </select>
      </label>
      <input
        type="number"
        value={betAmount ?? ""}
        placeholder="購入金額"
        onChange={(e) => setBetAmount(e.target.value)}
      />
      <input
        type="number"
        value={payout ?? ""}
        placeholder="払い戻し金額"
        onChange={(e) => setPayout(e.target.value)}
      />
      <button type="button" onClick={onSaveTicketClicked}>
        完了
      </button>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        戻る
      </button>
    </>
  );
}
