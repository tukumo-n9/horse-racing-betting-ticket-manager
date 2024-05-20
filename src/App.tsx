import TicketsList from "./features/tickets/TicketsList";
import AddTicketForm from "./features/tickets/AddTicketForm";

function App() {
  return (
    <>
      <h1>馬券収支管理アプリ</h1>
      {/* <p>
        <button>馬券を登録</button>
      </p> */}
      <TicketsList />
      <AddTicketForm />
    </>
  );
}

export default App;
