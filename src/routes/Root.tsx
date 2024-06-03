import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <h1>馬券収支管理アプリ</h1>
      <div>
        <Outlet />
      </div>
    </>
  );
}
