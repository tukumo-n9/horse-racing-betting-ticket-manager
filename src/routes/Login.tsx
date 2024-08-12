import { signInWithPopup } from "firebase/auth";
import { browserPopupRedirectResolver } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  const handleLogin = () => {
    signInWithPopup(auth, provider, browserPopupRedirectResolver);
  };
  return (
    <button type="button" onClick={handleLogin}>
      Googleでログインする
    </button>
  );
}
