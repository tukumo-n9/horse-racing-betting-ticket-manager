import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ticketAdded } from "./ticketsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

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

  const authState = useAppSelector((state) => state.auth);

  const onSaveClicked = async () => {
    if (
      date &&
      racetrack &&
      raceNumber &&
      typeName &&
      typeNumbers.length !== 0 &&
      betAmount &&
      payout
    ) {
      const id = nanoid();
      const createDate = Date.now();
      const updateDate = -1;

      if (authState) {
        dispatch(
          ticketAdded({
            id,
            createDate,
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

        await setDoc(doc(db, "users", auth.currentUser!.uid, "tickets", id), {
          id: id,
          createDate: createDate,
          updateDate,
          date,
          racetrack,
          raceNumber,
          typeName,
          typeNumbers,
          betAmount,
          payout,
        });
      }

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
      <div className="bg-white p-4">
        <div className="pb-4 border-b flex items-center">
          <label htmlFor="date" className="w-1/3">
            日付
          </label>
          <input
            id="date"
            type="date"
            value={date ?? ""}
            placeholder="日付"
            className="p-1 border rounded grow"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="pb-4 border-b mt-4 flex items-center">
          <label htmlFor="racetrack" className="w-1/3">
            競馬場
          </label>
          <select
            id="racetrack"
            value={racetrack}
            className="p-1 border rounded grow"
            onChange={(e) => setRacetrack(e.target.value)}
          >
            <option value="">---</option>
            <option value="京都">京都</option>
            <option value="東京">東京</option>
            <option value="新潟">新潟</option>
          </select>
        </div>
        <div className="pb-4 border-b mt-4 flex items-center">
          <label htmlFor="raceNumber" className="w-1/3">
            レース番号
          </label>
          <select
            id="raceNumber"
            value={raceNumber}
            className="p-1 border rounded grow"
            onChange={(e) => setRaceNumber(e.target.value)}
          >
            <option value="">---</option>
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
        </div>
        <div className="pb-4 border-b mt-4 flex items-center">
          <label htmlFor="type" className="w-1/3">
            券種
          </label>
          <select
            id="type"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            className="p-1 border rounded grow"
          >
            <option value="">---</option>
            <option value="単勝">単勝</option>
            <option value="複勝">複勝</option>
            <option value="応援馬券">応援馬券</option>
            <option value="枠連">枠連</option>
            <option value="馬連">馬連</option>
            <option value="馬単">馬単</option>
            <option value="ワイド">ワイド</option>
            <option value="三連複">三連複</option>
            <option value="三連単">三連単</option>
          </select>
        </div>
        <div className="pb-4 border-b mt-4 flex items-center">
          <label htmlFor="number" className="w-1/3">
            馬番
          </label>
          <select
            id="number"
            value={typeNumbers}
            multiple={true}
            className="p-1 border rounded grow"
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
        </div>
        <div className="pb-4 border-b mt-4 flex items-center">
          <label htmlFor="betAmount" className="w-1/3">
            購入金額
          </label>
          <input
            id="betAmount"
            type="number"
            value={betAmount ?? ""}
            placeholder="購入金額"
            className="p-1 border rounded grow"
            onChange={(e) => setBetAmount(e.target.value)}
          />
        </div>
        <div className="mt-4 flex items-center">
          <label htmlFor="payout" className="w-1/3">
            払い戻し金額
          </label>
          <input
            id="payout"
            type="number"
            value={payout ?? ""}
            placeholder="払い戻し金額"
            className="p-1 border rounded grow"
            onChange={(e) => setPayout(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="bg-transparent hover:bg-green-500 text-green-700 hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          >
            戻る
          </button>
          <button
            type="button"
            onClick={onSaveClicked}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            馬券を追加
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTicketForm;
