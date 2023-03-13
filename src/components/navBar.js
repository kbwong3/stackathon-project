import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Logout } from "./logout";
import { auth } from "../config/firebase";
import { Authenticate } from "./auth";
import { Signup } from "./signup";

export const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(!isLoggedIn);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <nav>
      {isLoggedIn ? (
        <Logout />
      ) : (
        <ul>
          <li>
            <Authenticate />
          </li>
          <li>
            <Signup />
          </li>
        </ul>
      )}
    </nav>
  );
};
