import "./App.css";
import Header from "./components/Header/Header";
import Minepad from "./components/Minepad/Minepad";
import Investments, {
  Investment,
  ReferralMenu,
  Statistics,
  TokenVesting,
} from "./components/Investments/Investments";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChainAnex from "./components/Minepad/ChainAnex";
function App() {
  return (
    <div className="App">
      <Header />
      <ChainAnex />
      <Minepad />
      <Router>
        <Investments />
        <Routes>
          {/* <Route path="invest" element={<ChainAnex />} /> */}
          <Route path="invest" element={<Investment />} />
          <Route path="static" element={<Statistics />} />
          <Route path="TokenVesting" element={<TokenVesting />} />
          <Route path="ReferralMenu" element={<ReferralMenu />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
