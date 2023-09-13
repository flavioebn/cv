import { Autocomplete, TextField } from "@mui/material";
import Modal from "../components/modal";
import * as monsterDetails from "./monsterDetails/index";
import { useState } from "react";

/* eslint-disable no-unused-vars */

const MonsterModal = ({ onAdd, onClose }) => {
  const [selected, setSelected] = useState();
  const [source, setSource] = useState();
  const [monstersList, setMonstersList] = useState([]);
  const [custom, setCustom] = useState({
    name: "",
    hp: 0,
    ac: 0,
    custom: true,
  });

  const getMonster = () => {
    const index = monstersList.findIndex((i) => i.name === selected);
    if (monstersList[index]._copy) {
      switch (monstersList[index]._copy.source) {
        case "MM":
          const idx = monsterDetails.mmMonsters.findIndex(
            (i) => i.name === monstersList[index]._copy.name
          );
          let copy = { ...monsterDetails.mmMonsters[idx] };
          copy.name = selected;
          onAdd(copy);
          break;

        default:
          break;
      }
    } else {
      onAdd(monstersList[index]);
    }
  };

  const addCustom = () => {
    onAdd(custom);
  };

  const sources = [
    "Call of the Netherdeep",
    "Candlekeep Mysteries",
    "Curse of Strahd",
    "Descent Into Avernus",
    "Dragon of Icespire Peak",
    "Fizban's Treasury of Dragons",
    "Ghosts of Saltmarsh",
    "Monsters Manual",
    "Rise of Tiamat",
  ];

  const handleChangeSource = (e) => {
    switch (e) {
      case "Monsters Manual":
        setMonstersList(monsterDetails.mmMonsters);
        break;
      case "Ghosts of Saltmarsh":
        setMonstersList(monsterDetails.gosMonsters);
        break;
      case "Descent Into Avernus":
        setMonstersList(monsterDetails.bgdiaMonsters);
        break;
      case "Candlekeep Mysteries":
        setMonstersList(monsterDetails.cmMonsters);
        break;
      case "Curse of Strahd":
        setMonstersList(monsterDetails.cosMonsters);
        break;
      case "Call of the Netherdeep":
        setMonstersList(monsterDetails.crcotnMonsters);
        break;
      case "Dragon of Icespire Peak":
        setMonstersList(monsterDetails.dipMonsters);
        break;
      case "Rise of Tiamat":
        setMonstersList(monsterDetails.rotMonsters);
        break;
      case "Fizban's Treasury of Dragons":
        setMonstersList(monsterDetails.ftdMonsters);
        break;

      default:
        break;
    }
  };

  return (
    <Modal close={onClose}>
      <h2>From template:</h2>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={sources}
        value={source}
        onChange={(event, newValue) => {
          handleChangeSource(newValue);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Select a source" />
        )}
      />
      <br />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={monstersList.map((i) => i.name)}
        value={selected}
        onChange={(event, newValue) => {
          setSelected(newValue);
        }}
        inputValue={selected}
        onInputChange={(event, newInputValue) => {
          setSelected(newInputValue);
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Select a monster" />
        )}
      />
      <button
        disabled={selected === undefined}
        className="save-monster"
        onClick={getMonster}
      >
        Add from template
      </button>
      <h2>From input:</h2>
      <div className="party-modal">
        <div>
          <h2>Name: </h2>
          <input
            value={custom.name}
            onChange={(e) => {
              setCustom({ ...custom, name: e.target.value });
            }}
            type="text"
          />
        </div>
        <div>
          <h2>Hp: </h2>
          <input
            value={custom.hp}
            onChange={(e) => {
              setCustom({ ...custom, hp: e.target.value });
            }}
            type="number"
          />
        </div>
        <div>
          <h2>AC: </h2>
          <input
            value={custom.ac}
            onChange={(e) => {
              setCustom({ ...custom, ac: e.target.value });
            }}
            type="number"
          />
        </div>
      </div>
      <button
        disabled={custom.name === "" || custom.hp === 0 || custom.ac === 0}
        className="save-monster"
        onClick={addCustom}
      >
        Add custom
      </button>
    </Modal>
  );
};

export default MonsterModal;
