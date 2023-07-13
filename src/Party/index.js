import caIcon from "../assets/icons/ca.svg";
import hpIcon from "../assets/icons/hp.svg";
import plusIcon from "../assets/icons/plus.svg";
import perceptionIcon from "../assets/icons/perception.svg";
import pPerceptionIcon from "../assets/icons/passive-perception.svg";
import stealthIcon from "../assets/icons/stealth.svg";
import survivalIcon from "../assets/icons/survival.svg";
import languageIcon from "../assets/icons/language.svg";
import darkvisionIcon from "../assets/icons/darkvision.svg";
import deathSavesIcon from "../assets/icons/death-saves.svg";
import thumbsUpIcon from "../assets/icons/thumbs-up.svg";
import thumbsDownIcon from "../assets/icons/thumbs-down.svg";
import { Fragment, useEffect, useState } from "react";
import PartyModal from "./modal";
import { conditions } from "./data";
import ConditionsModal from "./conditionsModal";
import { Tooltip } from "@mui/material";
import CustomTooltip from "./tooltip";

const RenderParty = ({
  pc,
  openModal,
  idx,
  updateTemp,
  handleCondition,
  removeCondition,
}) => {
  return (
    <div
      className={`pc-item ${pc.concentrate && "contrating"} ${
        pc.damage >= pc.maxHp && "dying"
      }`}
    >
      <img
        src={pc.image}
        alt={`${pc.name}_icon`}
        onClick={() => openModal(idx)}
      />
      <div className="scrollable">
        <h2 onClick={() => handleCondition(idx)}>{pc.name}</h2>
        {pc.darkvision && (
          <img
            className="darkvision"
            src={darkvisionIcon}
            alt="darkvisionIcon"
          />
        )}
        <div
          onClick={(e) => updateTemp(!pc.concentrate, "concentrate", idx)}
          className={`concentrate ${pc.concentrate && "active"}`}
        >
          <p>C</p>
        </div>
        {pc.conditions?.length > 0 && (
          <div className="pc-conditions">
            {pc.conditions.map((i) => {
              return (
                <CustomTooltip
                  value={i.details.map((item, index) => (
                    <Fragment key={index}>
                      {index === 0 && (
                        <h3 className="condition-tooltip-name">{i.name}</h3>
                      )}
                      {item}
                      <br />
                    </Fragment>
                  ))}
                >
                  <img
                    src={i.icon}
                    alt={i.name}
                    onClick={() => removeCondition(i, idx)}
                  />
                </CustomTooltip>
              );
            })}
          </div>
        )}
        <div>
          <div>
            <img src={hpIcon} alt="hp" />
            <input
              value={pc.damage}
              min={0}
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
        {pc.damage >= pc.maxHp && (
          <div className="death-container">
            <img className="bedIcon" src={deathSavesIcon} />
            <div className="checks">
              <img src={thumbsDownIcon} />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <img src={thumbsUpIcon} />
            </div>
          </div>
        )}
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
  const [conditionModal, setConditionModal] = useState(false);
  const [youtubeId, setYoutubeId] = useState("");

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
    const newPt = JSON.parse(localStorage.getItem("tracker-party"));
    newPt && setParty(newPt);
  }, []);

  const openToEdit = (idx) => {
    setIdxEditing(idx);
    handleModal();
  };

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleNew = () => {
    party?.push({
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
    setIdxEditing(party?.length - 1);
    handleModal();
  };

  const handleDelete = () => {
    let tempArray = party;
    tempArray.splice(idxEditing, 1);
    setParty(tempArray);
    save();
    handleModal();
  };

  const handleCondition = (e) => {
    setIdxEditing(e);
    handleConditionModal();
  };

  const addCondition = (e) => {
    console.log(e);
    const tempArray = party;
    tempArray[idxEditing].conditions.push(e);
    setParty(tempArray);
    save();
    handleConditionModal();
  };

  const handleConditionModal = () => {
    setConditionModal(!conditionModal);
  };

  const removeCondition = (e, idx) => {
    console.log(e, idx);
    const tempParty = party;
    const indexToRemove = tempParty[idx].conditions.findIndex(
      (i) => i.name === e.name
    );
    tempParty[idx].conditions.splice(indexToRemove, 1);
    setParty(party);
    setCount(count + 1);
    save();
  };

  return (
    <div className="party-container">
      {/* <embed
        src={`https://youtube.com/embed/${youtubeId}?autoplay=1`}
        allowscriptaccess="always"
        allowfullscreen="false"
        width="480"
        height="385"
      ></embed>
      <buton onClick={() => setYoutubeId("wCyY8OXOHm0")}>teste 1</buton>
      <buton onClick={() => setYoutubeId("TqKKJH6RIVU")}>teste 2</buton>
      <buton onClick={() => setYoutubeId("BO9TAXATAqk")}>teste 1</buton> */}
      {modalVisible && (
        <PartyModal
          close={handleModal}
          onSave={updatePc}
          onDelete={handleDelete}
          pc={party[idxEditing]}
        />
      )}
      {conditionModal && (
        <ConditionsModal onAdd={addCondition} close={handleConditionModal} />
      )}
      {party.map((i, idx) => {
        return (
          <RenderParty
            pc={i}
            idx={idx}
            updateTemp={updateTemp}
            openModal={openToEdit}
            handleCondition={handleCondition}
            removeCondition={removeCondition}
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
