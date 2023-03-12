import "./App.css";
import { ToastContainer } from "react-toastify";
import { AllPosts } from "./components/allPosts";
import { NavigationBar } from "./components/navBar";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <ToastContainer />
      <AllPosts />
    </div>
  );
}

export default App;
