import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { authErrors } from "./authErrors";
import { setDoc, doc } from "firebase/firestore";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (auth.currentUser.displayName) {
        setUser(auth.currentUser.displayName);
      } else {
        setUser("Anonymous");
      }

      const userRef = doc(db, "users", userCredential.user.uid);

      await setDoc(userRef, {
        name: user,
        email: email,
        likedPosts: [],
        userId: auth.currentUser.uid,
      });

      toast.success(
        auth.currentUser.displayName
          ? `Welcome ${auth.currentUser.displayName}!`
          : "Thank You for Signing up!",
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
      setEmail("");
      setPassword("");
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
      <form onSubmit={handleSignUp}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};
