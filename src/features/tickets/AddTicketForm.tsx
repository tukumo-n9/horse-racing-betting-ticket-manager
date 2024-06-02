import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { ticketAdded } from "./ticketsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

function AddTicketForm() {
  const [date, setDate] = useState<string>("");
  const [racetrack, setRacetrack] = useState<string>("");
  const [raceNumber, setRaceNumber] = useState<string>("");
  const [typeName, setTypeName] = useState<string>("");
  const [typeNumbers, setTypeNumbers] = useState<string[]>([]);
  const [betAmount, setBetAmount] = useState<string>("");
  const [payout, setPayout] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSaveClicked = () => {
    if (
      date &&
      racetrack &&
      raceNumber &&
      typeName &&
      typeNumbers.length !== 0 &&
      betAmount &&
      payout
    ) {
      dispatch(
        ticketAdded({
          id: nanoid(),
          createDate: Date.now(),
          date,
          racetrack,
          raceNumber,
          typeName,
          typeNumbers,
          betAmount,
          payout,
        })
      );
      setDate("");
      setRacetrack("");
      setRaceNumber("");
      setTypeName("");
      setTypeNumbers([]);
      setBetAmount("");
      setPayout("");
      navigate("/");
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
      <select value={typeName} onChange={(e) => setTypeName(e.target.value)}>
        <option value="">券種</option>
        <option value="単勝">単勝</option>
        <option value="馬連">馬連</option>
        <option value="三連単">三連単</option>
      </select>
      <label>
        馬番
        <select
          value={typeNumbers}
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
      <button type="button" onClick={onSaveClicked}>
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
