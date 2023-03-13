import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Logout } from "./logout";
import { auth } from "../config/firebase";
import { Authenticate } from "./auth";
import { Signup } from "./signup";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

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
    <Navbar sticky="top" id="navbar" className="shadow-sm mb-3">
      <Navbar.Brand>
        <h2 className="m-auto"> Not Meta </h2>
      </Navbar.Brand>
      {isLoggedIn ? (
        <Container>
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Item>
              <Logout />
            </Nav.Item>
          </Nav>
        </Container>
      ) : (
        <Container>
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to="/login" as={NavLink}>
              Log In
            </Nav.Link>
            <Nav.Link to="/signup" as={NavLink}>
              Sign Up
            </Nav.Link>
          </Nav>
        </Container>
      )}
    </Navbar>
  );
};
