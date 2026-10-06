import { useState } from "react";
import PartyView from "./partyView";
import InitView from "./InitView";
import changeIcon from "../assets/icons/change.svg";
import notesIcon from "../assets/icons/notes.svg";
import diaryIcon from "../assets/icons/diary.svg";
import youtubeIcon from "../assets/icons/youtubeIcon.svg";
import NotesModal from "./notesModal";
import PastebinModal from "./pastebinModal";
import DiaryModal from "./diaryModal";
import YoutubeModal from "./youtubeModal";

const Party = () => {
  const [party, setParty] = useState(true);
  const [notesVisible, setNotesVisible] = useState(false);
  const [pastebinModal, setPastebinModal] = useState(false);
  const [diaryVisible, setDiaryVisible] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);

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

  const handleDiaryView = () => {
    setDiaryVisible(!diaryVisible);
  };

  const handlePlayerView = () => {
    setPlayerVisible(!playerVisible);
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
      <button className="dm-diary-container" onClick={handleDiaryView}>
        <img src={diaryIcon} alt="sort" />
      </button>
      <button className="youtube-container" onClick={handlePlayerView}>
        <img src={youtubeIcon} alt="sort" />
      </button>

      <p className="version">v1.4</p>

      {pastebinModal && <PastebinModal close={handlePastebinView} />}

      {notesVisible && <NotesModal close={handleNotesView} />}

      {diaryVisible && <DiaryModal close={handleDiaryView} />}

      <YoutubeModal visible={playerVisible} />

      {response}
    </>
  );
};

export default Party;
