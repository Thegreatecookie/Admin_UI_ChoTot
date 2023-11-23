import logo from "./logo.svg";
import "./App.css";
import JoySignInSideTemplate from "./scenes/signin/signin";
import JoyOrderDashboardTemplate from "./scenes/dashboard/components/Sidebar-exe";
function App() {
  return (
    <div className="App">
      {/* <ButtonAppBar /> */}
      <JoyOrderDashboardTemplate />
    </div>
  );
}

export default App;
