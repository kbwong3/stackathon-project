import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { authErrors } from "./authErrors";
import { setDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        photoUrl: userCredential.user.photoURL,
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
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSignUp}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Link to="/">
                  <Button className="mt-4" type="submit">
                    Sign up
                  </Button>
                </Link>
              </Form.Group>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};
