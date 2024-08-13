import { signInWithPopup } from "firebase/auth";
import { browserPopupRedirectResolver } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Login() {
  const handleLogin = () => {
    signInWithPopup(auth, provider, browserPopupRedirectResolver);
  };
  return (
    <button type="button" onClick={handleLogin} className="block w-fit mx-auto">
      <img
        src="/web_light_sq_SI@2x.png"
        alt="Sign in with Google"
        className="block max-w-[175px]"
      />
    </button>
  );
}
