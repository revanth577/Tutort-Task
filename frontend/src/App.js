import logo from "./logo.svg";
import "./App.css";
import Routing from "./Routing";
import { CookiesProvider } from "react-cookie";
function App() {
  return (
    <div style={{ backgroundColor: "rgba(246, 239, 239, 0.503)" }}>
      <CookiesProvider>
        <Routing />
      </CookiesProvider>
    </div>
  );
}

export default App;
