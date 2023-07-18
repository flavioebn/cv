import { useState } from "react";
import PartyView from "./partyView";
import InitView from "./InitView";
import changeIcon from "../assets/icons/change.svg";

const Party = () => {
  const [party, setParty] = useState(true);

  let response;

  if (party) {
    response = <PartyView />;
  } else {
    response = <InitView />;
  }

  const handleView = () => {
    setParty(!party);
  };

  return (
    <>
      <button className="change-view-container" onClick={handleView}>
        <img src={changeIcon} alt="sort" />
      </button>
      {response}
    </>
  );
};

export default Party;
