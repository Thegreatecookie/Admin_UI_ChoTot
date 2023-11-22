import logo from "./logo.svg";
import "./App.css";
import JoySignInSideTemplate from "./scenes/signin/signin";
import ButtonAppBar from "./scenes/signin/global/topbar";
import MiniDrawer from "./scenes/signin/global/sidebar";
function App() {
  return (
    <div className="App">
      {/* <ButtonAppBar /> */}
      <MiniDrawer />
    </div>
  );
}

export default App;
