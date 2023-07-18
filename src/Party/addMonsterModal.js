import { Autocomplete, TextField } from "@mui/material";
import Modal from "../components/modal";
import { allMonsters } from "./monsterNames";
import { monsterList } from "./monsters";
import { useState } from "react";

const MonsterModal = ({ onAdd, onClose }) => {
  const [selected, setSelected] = useState();
  const [custom, setCustom] = useState({
    name: "",
    hp: 0,
    ac: 0,
    custom: true,
  });

  const getMonster = () => {
    const index = monsterList.findIndex((i) => i.name === selected);
    onAdd(monsterList[index]);
  };

  const addCustom = () => {
    onAdd(custom);
  };

  return (
    <Modal close={onClose}>
      <h2>From template:</h2>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={allMonsters}
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
