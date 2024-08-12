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
        const ticketsRef = collection(db, "users", user.uid, "tickets"); // FIXME:tickets以下で取得するのがセキュリティルールと反している？セキュリティルールの方をlistかreadにする、tickets以下以下の読み取りを許可する
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
      <h1>馬券収支管理アプリ</h1>
      {authState && (
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
