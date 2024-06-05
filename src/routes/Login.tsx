import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  const handleLogin = () => {
    signInWithRedirect(auth, provider);
  };
  return (
    <button type="button" onClick={handleLogin}>
      Googleでログインする
    </button>
  );
}
