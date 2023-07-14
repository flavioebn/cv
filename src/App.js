import "./App.scss";
import Home from "./Home";
import Hub from "./Hub";
import Scrap from "./Scrap";
import Converter from "./Converter";
import ReflexCounter from "./Reflex";
import Expiry from "./Expiry";
import Party from "./Party";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" index exact element={<Home />} />
      <Route path="/hub" exact element={<Hub />} />
      <Route path="/scrap" exact element={<Scrap />} />
      <Route path="/reflex" exact element={<ReflexCounter />} />
      <Route path="/cardcaptorcami" exact element={<Converter />} />
      <Route path="/expiry" exact element={<Expiry />} />
      <Route path="/party" element={<Party />} />
    </Routes>
  );
}

export default App;
