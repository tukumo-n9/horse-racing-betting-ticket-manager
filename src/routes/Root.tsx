import { onAuthStateChanged, signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ticketInitialized } from "../features/tickets/ticketsSlice";
import { authUpdate } from "../features/auth/authSlice";

export default function Root() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.auth);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Sign-in successful.");
        dispatch(authUpdate(true));
        const ticketsRef = collection(db, "users", user.uid, "tickets");
        const ticketsDocs = await getDocs(ticketsRef);
        if (ticketsDocs) {
          const ticketsData = ticketsDocs.docs.map((doc) => {
            return { ...doc.data() };
          });
          dispatch(ticketInitialized(ticketsData));
        }
        navigate("/");
      } else {
        console.log("You should sign-in.");
        navigate("/login/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
      dispatch(authUpdate(false));
    });
  };

  const user = auth.currentUser;

  return (
    <>
      <div className="min-h-screen p-8">
        <div className="max-w-screen-sm mx-auto">
          <header>
            <h1 className="text-2xl sm:text-3xl font-bold text-center">
              馬券収支管理アプリ
            </h1>
            <div className="text-right mt-8">
              {user !== null && <p>{user.displayName}</p>}
              {authState && (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="bg-transparent hover:bg-green-500 text-green-700 hover:text-white py-1 px-2 text-sm border border-green-500 hover:border-transparent rounded mt-2"
                >
                  ログアウト
                </button>
              )}
            </div>
          </header>
          <div className="mt-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
