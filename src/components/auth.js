import { auth, googleProvider, db } from "../config/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { authErrors } from "./authErrors";
import { getDoc, doc, setDoc } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

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
          photoUrl: userCredentials.user.photoURL,
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
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label> Email</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />

              <Form.Label> Password</Form.Label>
              <Form.Control
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          <Link to="/">
            <Button className="mt-4" onClick={signIn}>
              Sign In
            </Button>
          </Link>
        </Col>
        <Col>
          <Link to="/">
            <Button
              variant="outline-dark"
              className="mt-4 pr-3"
              onClick={signInWithGoogle}
            >
              <img
                className="google"
                alt=""
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg "
              />{" "}
              Sign in with Google{" "}
            </Button>
          </Link>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
