import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6QNGzUDoY2PEXy9vh4O73VLIvNZlilRk",
  authDomain: "horse-racing-ticket-manager.firebaseapp.com",
  projectId: "horse-racing-ticket-manager",
  storageBucket: "horse-racing-ticket-manager.appspot.com",
  messagingSenderId: "375634573800",
  appId: "1:375634573800:web:cb2dea122d1b7c4f0d4c5d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
