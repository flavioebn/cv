import caIcon from "../assets/icons/ca.svg";
import hpIcon from "../assets/icons/hp.svg";
import plusIcon from "../assets/icons/plus.svg";
import perceptionIcon from "../assets/icons/perception.svg";
import pPerceptionIcon from "../assets/icons/passive-perception.svg";
import stealthIcon from "../assets/icons/stealth.svg";
import survivalIcon from "../assets/icons/survival.svg";
import languageIcon from "../assets/icons/language.svg";
import darkvisionIcon from "../assets/icons/darkvision.svg";
import uploadIcon from "../assets/icons/upload.svg";
import downloadIcon from "../assets/icons/download.svg";
import { Fragment, useEffect, useState } from "react";
import PartyModal from "./modal";
import ConditionsModal from "./conditionsModal";
import CustomTooltip from "./tooltip";
import DeathChecks from "./deathChecks";

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
        pc.curHp === 0 && "dying"
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
            {pc.conditions?.map((i) => {
              return (
                <CustomTooltip
                  small
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
              value={pc.curHp}
              onChange={(e) =>
                updateTemp(parseInt(e.target.value), "curHp", idx)
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
        {pc.curHp === 0 && <DeathChecks />}
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
            {pc.inventory?.map((i) => {
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

const PartyView = () => {
  const [idxEditing, setIdxEditing] = useState(0);
  const [party, setParty] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [conditionModal, setConditionModal] = useState(false);

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
    if (newPt) {
      setParty(newPt);
    } else {
      localStorage.setItem("tracker-party", JSON.stringify([]));
    }

    const fileInput = document.getElementById("fileInput");

    fileInput.addEventListener("change", function () {
      uploadFile(this, function (jsonData) {
        console.log("Arquivo carregado com sucesso:", jsonData);
        // Faça o que quiser com o objeto jsonData aqui.
        setParty(jsonData);
      });
    });
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
      _id: Date.now(),
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
    const tempParty = party;
    const indexToRemove = tempParty[idx].conditions.findIndex(
      (i) => i.name === e.name
    );
    tempParty[idx].conditions.splice(indexToRemove, 1);
    setParty(party);
    setCount(count + 1);
    save();
  };

  const downloadJSON = (obj, fileName) => {
    const jsonString = JSON.stringify(party);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = fileName;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Limpa a URL temporária
    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  };

  const uploadFile = (inputElement, callback) => {
    if (!inputElement.files || inputElement.files.length === 0) {
      console.error("Nenhum arquivo selecionado.");
      return;
    }

    const file = inputElement.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        const jsonData = JSON.parse(event.target.result);
        callback(jsonData);
      } catch (error) {
        console.error("Erro ao analisar o arquivo JSON.");
      }
    };

    reader.readAsText(file);
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
      <label className="upload-container" for="fileInput">
        <img src={uploadIcon} alt="upload" />
      </label>
      <input
        type="file"
        id="fileInput"
        accept=".json"
        style={{ display: "none" }}
      />
      <button className="download-container" onClick={downloadJSON}>
        <img src={downloadIcon} alt="download" />
      </button>
      <button className="plus-container" onClick={handleNew}>
        <img src={plusIcon} alt="plus" />
      </button>
    </div>
  );
};

export default PartyView;
