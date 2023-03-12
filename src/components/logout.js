import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export const Logout = () => {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={logout}>Logout</button>;
};
