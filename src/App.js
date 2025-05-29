import "./App.scss";
import Home from "./Home";
import Hub from "./Hub";
import Scrap from "./Scrap";
import Converter from "./Converter";
import ReflexCounter from "./Reflex";
import Expiry from "./Expiry";
import Party from "./Party";
import { Route, Routes } from "react-router-dom";
import DragNDrop from "./DragNDrop";
import CreatePhrases from "./DragNDrop/create";
import Checklist from "./Checklist";
import MtgGrid from "./MtgGrid";
import Lyrics from "./Lyrics";
import MTGdle from "./MTGdle";
import PokeLogin from "./PokeGo/login";
import PokeDash from "./PokeGo/dash";
import PokeAdmin from "./PokeGo/admin";
import PokeInfos from "./PokeGo/info";
// import Player from "./Player";
// import CreatePlayer from "./Player/create";
import Pablo from "./Pablo";
import ClickWhen from "./ClickWhen";
import YearList from "./YearList";
import CustomGuests from "./CustomGuests";

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
      <Route path="/drag" element={<DragNDrop />} />
      <Route path="/drag/create" element={<CreatePhrases />} />
      <Route path="/checklist" element={<Checklist />} />
      <Route path="/mtggrid" element={<MtgGrid />} />
      <Route path="/lyrics" element={<Lyrics />} />
      <Route path="/mtgdle" element={<MTGdle />} />
      <Route path="/pokelogin" element={<PokeLogin />} />
      <Route path="/pokedash" element={<PokeDash />} />
      <Route path="/pokeadmin" element={<PokeAdmin />} />
      <Route path="/pokeinfos" element={<PokeInfos />} />
      {/* <Route path="/player" element={<Player />} />
      <Route path="/player/create" element={<CreatePlayer />} /> */}
      <Route path="/pablo" element={<Pablo />} />
      <Route path="/yearlist" element={<YearList />} />
      <Route path="/clickwhen" element={<ClickWhen />} />
      <Route path="/customguests" element={<CustomGuests />} />
    </Routes>
  );
}

export default App;
