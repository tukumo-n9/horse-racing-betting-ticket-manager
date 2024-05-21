import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <h1>馬券収支管理アプリ</h1>
      <Link to={`/add-ticket/`}>馬券を追加</Link>
      <div>
        <Outlet />
      </div>
    </>
  );
}
