import caIcon from "../assets/icons/ca.svg";
import hpIcon from "../assets/icons/hp.svg";
import plusIcon from "../assets/icons/plus.svg";
import perceptionIcon from "../assets/icons/perception.svg";
import pPerceptionIcon from "../assets/icons/passive-perception.svg";
import stealthIcon from "../assets/icons/stealth.svg";
import survivalIcon from "../assets/icons/survival.svg";
import languageIcon from "../assets/icons/language.svg";
import darkvisionIcon from "../assets/icons/darkvision.svg";
import { useEffect, useState } from "react";
import PartyModal from "./modal";

const RenderParty = ({ pc, openModal, idx, updateTemp }) => {
  return (
    <div className="pc-item">
      <img
        src={pc.image}
        alt={`${pc.name}_icon`}
        onClick={() => openModal(idx)}
      />
      <div className="scrollable">
        <h2>{pc.name}</h2>
        {pc.darkvision && (
          <img
            className="darkvision"
            src={darkvisionIcon}
            alt="darkvisionIcon"
          />
        )}
        <div>
          <div>
            <img src={hpIcon} alt="hp" />
            <input
              value={pc.damage}
              onChange={(e) =>
                updateTemp(parseInt(e.target.value), "damage", idx)
              }
              className="fillable"
              type="number"
            />
            <p>/ {pc.maxHp}</p>
          </div>
          <div>
            <img src={caIcon} alt="ac" />
            <p>{pc.ac}</p>
          </div>
          <div>
            <img src={pPerceptionIcon} alt="pperception" />
            <p>{pc.pPerception}</p>
          </div>
        </div>
        <div>
          <div>
            <img src={stealthIcon} alt="stealth" />
            <input
              value={pc.stealth}
              onChange={(e) =>
                updateTemp(parseInt(e.target.value), "stealth", idx)
              }
              className="fillable"
              type="number"
            />
          </div>
          <div>
            <img src={perceptionIcon} alt="perception" />
            <input
              value={pc.perception}
              onChange={(e) =>
                updateTemp(parseInt(e.target.value), "perception", idx)
              }
              className="fillable"
              type="number"
            />
          </div>
          <div>
            <img src={survivalIcon} alt="survival" />
            <input
              value={pc.survival}
              onChange={(e) =>
                updateTemp(parseInt(e.target.value), "survival", idx)
              }
              className="fillable"
              type="number"
            />
          </div>
        </div>
        <div className="lang-container">
          <img className="langIcon" src={languageIcon} alt="language" />
          <div className="languages">
            {pc.languages.map((i) => {
              return <p>{i}</p>;
            })}
          </div>
        </div>
        <h3>Inventory</h3>
        <div className="inventory">
          <ul>
            {pc.inventory.map((i) => {
              return <li>{i}</li>;
            })}
          </ul>
        </div>
        <h3>Notes</h3>
        <div>
          <textarea
            value={pc.notes}
            onChange={(e) => updateTemp(e.target.value, "notes", idx)}
          />
        </div>
      </div>
    </div>
  );
};

const Party = () => {
  const [idxEditing, setIdxEditing] = useState(0);
  const [party, setParty] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(0);

  const save = () => {
    localStorage.setItem("tracker-party", JSON.stringify(party));
  };

  const updatePc = (e) => {
    const tempArray = party;
    tempArray[idxEditing] = e;
    setParty(tempArray);
    save();
    handleModal();
  };

  const updateTemp = (e, field, idx) => {
    const tempArray = party;
    tempArray[idx] = { ...tempArray[idx], [field]: e };
    setParty(tempArray);
    setCount(count + 1);
    save();
  };

  useEffect(() => {
    const newpt = JSON.parse(localStorage.getItem("tracker-party"));
    setParty(newpt);
  }, []);

  const openToEdit = (idx) => {
    setIdxEditing(idx);
    handleModal();
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleNew = () => {
    party.push({
      name: "",
      image: "",
      darkvision: false,
      maxHp: 0,
      damage: 0,
      ac: 0,
      pPerception: 0,
      stealth: 0,
      perception: 0,
      survival: 0,
      conditions: [],
      languages: ["Comum"],
      inventory: [],
      notes: "",
    });
    setIdxEditing(party.length - 1);
    handleModal();
  };

  const handleDelete = () => {
    let tempArray = party;
    tempArray.splice(idxEditing, 1);
    setParty(tempArray);
    save();
    handleModal();
  };

  return (
    <div className="party-container">
      {modalVisible && (
        <PartyModal
          close={handleModal}
          onSave={updatePc}
          onDelete={handleDelete}
          pc={party[idxEditing]}
        />
      )}
      {party.map((i, idx) => {
        return (
          <RenderParty
            pc={i}
            idx={idx}
            updateTemp={updateTemp}
            openModal={openToEdit}
          />
        );
      })}
      <button className="plus-container" onClick={handleNew}>
        <img src={plusIcon} alt="plus" />
      </button>
    </div>
  );
};

export default Party;
