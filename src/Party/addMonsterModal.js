import { Autocomplete, TextField } from "@mui/material";
import Modal from "../components/modal";
import { allMonsters } from "./monsterNames";
import { monsterList } from "./monsters";
import { useState } from "react";

const MonsterModal = ({ onAdd, onClose }) => {
  const [selected, setSelected] = useState();

  const getMonster = () => {
    const index = monsterList.findIndex((i) => i.name === selected);
    console.log(monsterList[index]);
    onAdd(monsterList[index]);
  };

  return (
    <Modal close={onClose}>
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
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      <button onClick={getMonster}>add</button>
    </Modal>
  );
};

export default MonsterModal;
