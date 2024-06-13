import { onAuthStateChanged, signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useAppDispatch } from "../hooks";
import { ticketInitialized } from "../features/tickets/ticketsSlice";

export default function Root() {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Sign-in successful.");
        setIsSignIn(true);
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
        setIsSignIn(false);
        navigate("/login/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
      setIsSignIn(false);
    });
  };

  const user = auth.currentUser;

  return (
    <>
      <h1>馬券収支管理アプリ</h1>
      {isSignIn && (
        <button type="button" onClick={handleSignOut}>
          ログアウト
        </button>
      )}
      {user !== null && <p>{user.displayName}</p>}
      <div>
        <Outlet />
      </div>
    </>
  );
}
