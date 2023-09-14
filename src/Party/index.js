import { useState } from "react";
import PartyView from "./partyView";
import InitView from "./InitView";
import changeIcon from "../assets/icons/change.svg";
import notesIcon from "../assets/icons/notes.svg";
import NotesModal from "./notesModal";
import PastebinModal from "./pastebinModal";

const Party = () => {
  const [party, setParty] = useState(true);
  const [notesVisible, setNotesVisible] = useState(false);
  const [pastebinModal, setPastebinModal] = useState(false);

  let response;

  if (party) {
    response = <PartyView />;
  } else {
    response = <InitView />;
  }

  const handleView = () => {
    setParty(!party);
  };

  const handleNotesView = () => {
    setNotesVisible(!notesVisible);
  };

  const handlePastebinView = () => {
    setPastebinModal(!pastebinModal);
  };

  return (
    <>
      <button className="change-view-container" onClick={handleView}>
        <img src={changeIcon} alt="sort" />
      </button>
      <button className="pob-container" onClick={handlePastebinView}>
        <p>Pob</p>
      </button>
      <button className="dm-notes-container" onClick={handleNotesView}>
        <img src={notesIcon} alt="sort" />
      </button>
      <p className="version">v1.3</p>
      {pastebinModal && <PastebinModal close={handlePastebinView} />}

      {notesVisible && <NotesModal close={handleNotesView} />}
      {response}
    </>
  );
};

export default Party;
