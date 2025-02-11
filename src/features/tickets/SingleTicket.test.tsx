// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SingleTicket from "./SingleTicket";

import * as matchers from "@testing-library/jest-dom/matchers";
import { BrowserRouter } from "react-router-dom";

expect.extend(matchers);

const ticket = {
  id: "1",
  createDate: 1,
  updateDate: 1,
  date: "2022-01-01",
  racetrack: "中山",
  raceNumber: "1",
  typeName: "単勝",
  typeNumbers: ["1"],
  betAmount: "100",
  payout: "200",
};

describe("馬券詳細コンポーネント", () => {
  test("データを与えると与えると正しく表示される", () => {
    render(
      <BrowserRouter>
        <SingleTicket ticket={ticket} />
      </BrowserRouter>
    );
    expect(screen.getByText("2022年1月1日(土)")).toBeInTheDocument();
    expect(screen.getByText("中山1R")).toBeInTheDocument();
    expect(screen.getByText("単勝：1")).toBeInTheDocument();
    expect(screen.getByText("購入金額：￥100")).toBeInTheDocument();
    expect(screen.getByText("払い戻し金額：￥200")).toBeInTheDocument();
    expect(screen.getByText("収支：￥100")).toBeInTheDocument();
  });
});
