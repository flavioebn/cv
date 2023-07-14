import { useState } from "react";
import PartyView from "./partyView";
import InitView from "./InitView";

const Party = () => {
  const [party, setParty] = useState(false);

  if (party) {
    return <PartyView />;
  } else {
    return <InitView />;
  }
};

export default Party;
