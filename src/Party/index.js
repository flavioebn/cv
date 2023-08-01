import { useState } from "react";
import PartyView from "./partyView";
import InitView from "./InitView";
import changeIcon from "../assets/icons/change.svg";
import notesIcon from "../assets/icons/notes.svg";
import NotesModal from "./notesModal";

const Party = () => {
  const [party, setParty] = useState(true);
  const [notesVisible, setNotesVisible] = useState(false);

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

  return (
    <>
      <button className="change-view-container" onClick={handleView}>
        <img src={changeIcon} alt="sort" />
      </button>
      <button className="dm-notes-container" onClick={handleNotesView}>
        <img src={notesIcon} alt="sort" />
      </button>
      {notesVisible && <NotesModal close={handleNotesView} />}
      {response}
    </>
  );
};

export default Party;
