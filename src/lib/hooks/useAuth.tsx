import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";

import { firebaseAuth } from "../firebase";

export default function useAuth() {
  const [user] = useAuthState(firebaseAuth);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithPopup(provider);
  };

  const signOut = () => {
    return firebaseAuth.signOut();
  };
  return {
    user,
    signupMethods: [{ name: "Google", method: signInWithGoogle }],
    signOut,
  };
}
