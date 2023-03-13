import { auth, googleProvider, db } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { authErrors } from "./authErrors";
import { getDoc, doc, setDoc } from "firebase/firestore";

export const Authenticate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(
        auth.currentUser.displayName
          ? `Welcome ${auth.currentUser.displayName}!`
          : "Logged in sucessfully!",
        {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (error) {
      const errorKey = error.code.slice(5);
      let errorMessage = authErrors[errorKey];
      console.error(error);
      toast.error(`${errorMessage}`, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, "users", userCredentials.user.uid);
      const docSnapshot = await getDoc(userRef);

      if (!docSnapshot.exists()) {
        await setDoc(userRef, {
          name: userCredentials.user.displayName,
          email: userCredentials.user.email,
          likedPosts: [],
          userId: userCredentials.user.uid,
        });
      }

      toast.success(
        auth.currentUser.displayName
          ? `Welcome ${auth.currentUser.displayName}!`
          : "Logged in sucessfully!",
        {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (error) {
      const errorKey = error.code.slice(5);
      let errorMessage = authErrors[errorKey];
      console.error(error);
      toast.error(`${errorMessage}`, {
        position: "bottom-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <div>
        <button onClick={signInWithGoogle}>Sign in with Google </button>
      </div>
    </div>
  );
};
