import { onAuthStateChanged, signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export default function Root() {
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        console.log("Sign-in successful.");
        setIsSignIn(true);
      } else {
        navigate("/login/");
        console.log("You should sign-in.");
        setIsSignIn(false);
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
