import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Signin from "./scenes/signin/signin";
import Post from "./scenes/posts/index";
import PrivateRoutes from "./scenes/utils/PrivateRoutes";
import Profile from "./scenes/profile/index";
function App() {
  return (
    <div className="App">
      <Profile />
    </div>
  );
}

export default App;
