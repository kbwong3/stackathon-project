import "./App.css";
import { ToastContainer } from "react-toastify";
import { AllPosts } from "./components/allPosts";
import { NavigationBar } from "./components/navBar";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Authenticate } from "./components/auth";
import { Signup } from "./components/signup";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<AllPosts />} />
        <Route exact path="/login" element={<Authenticate />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
