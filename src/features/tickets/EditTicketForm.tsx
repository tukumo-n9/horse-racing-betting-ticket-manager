import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ticketUpdated } from "./ticketsSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTicketForm() {
  const { ticketId } = useParams();

  const ticket = useAppSelector((state) =>
    state.tickets.find((ticket) => ticket.id === ticketId)
  );

  const [date, setDate] = useState<string>(ticket?.date);
  const [racetrack, setRacetrack] = useState<string>(ticket?.racetrack);
  const [raceNumber, setRaceNumber] = useState<string>(ticket?.raceNumber);
  const [betAmount, setBetAmount] = useState<string>(ticket?.betAmount);
  const [payout, setPayout] = useState<string>(ticket?.payout);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSaveTicketClicked = () => {
    if (date && racetrack && raceNumber && betAmount && payout) {
      dispatch(
        ticketUpdated({
          id: ticketId,
          updateDate: Date.now(),
          date,
          racetrack,
          raceNumber,
          betAmount,
          payout,
        })
      );
      setDate("");
      setRacetrack("");
      setRaceNumber("");
      setBetAmount("");
      setPayout("");
      navigate(`/tickets/${ticketId}`);
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
      <select
        name=""
        id=""
        value={racetrack}
        onChange={(e) => setRacetrack(e.target.value)}
      >
        <option value="">未選択</option>
        <option value="京都">京都</option>
        <option value="東京">東京</option>
        <option value="新潟">新潟</option>
      </select>
      <select
        name=""
        id=""
        value={raceNumber}
        onChange={(e) => setRaceNumber(e.target.value)}
      >
        <option value="">未選択</option>
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
      </select>
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
