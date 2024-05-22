import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { ticketAdded } from "./ticketsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

function AddTicketForm() {
  const [date, setDate] = useState<string>("");
  const [racetrack, setRacetrack] = useState<string>("");
  const [raceNumber, setRaceNumber] = useState<string>("");
  const [betAmount, setBetAmount] = useState<string>("");
  const [payout, setPayout] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSaveTicketClicked = () => {
    if (date && racetrack && raceNumber && betAmount && payout) {
      dispatch(
        ticketAdded({
          id: nanoid(),
          createDate: Date.now(),
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
        馬券を追加
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

export default AddTicketForm;
