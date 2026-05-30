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

  const format = extraValues.map(i => {
    return {
      wbs_code_id: i.wbs_code_id,
      item_name: i.item_name,
      created_at: i.created_at,
      updated_at: i.updated_at,
      building_id: i.building_id,
      company_id: i.company_id,
      history: [{
        value: i.value,
        installments: i.installments || 1,
        installment_value: i.installment_value || i.value,
        description: i.description,
        updated_at: i.created_at,
        start_date: i.start_date || i.created_at,
        end_date: i.end_date || i.created_at,
        isValid: true
      }]
    }
  })

  console.log(format)

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
