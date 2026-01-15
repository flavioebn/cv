import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreatePhrases = () => {
  const [selected, setSelected] = useState({ name: "", phrases: [] });
  const [lists, setLists] = useState([]);
  const [count, setCount] = useState(0);

  const handleChangeList = (e) => {
    const idx = lists.findIndex((i) => i.name === e);
    setSelected(lists[idx]);
  };

  useEffect(() => {
    if (localStorage.getItem("drag-lists")) {
      setLists(JSON.parse(localStorage.getItem("drag-lists")));
    }
  }, []);

  const handleUpdate = (e) => {
    setSelected({
      ...selected,
      phrases: e.target.value.split("\n"),
    });
    const idx = lists.findIndex((i) => i.name === selected.name);
    let tempArray = lists;
    lists[idx].phrases = e.target.value.split("\n");
    setLists(tempArray);
    save();
  };

  const handleNewList = () => {
    const newName = prompt("New list name");
    if (newName === null || newName === "") return;
    let tempArray = lists;
    tempArray.push({ name: newName, phrases: [] });
    setLists(tempArray);
    setSelected(lists[lists.length - 1]);
    save();
    setCount(count + 1);
  };

  const save = () => {
    localStorage.setItem("drag-lists", JSON.stringify(lists));
  };

  const handleDelete = () => {
    if (window.confirm(`Deletar ${selected.name}?`)) {
      const idx = lists.findIndex((i) => i.name === selected.name);
      let tempArray = lists;
      tempArray.splice(idx, 1);
      setLists(tempArray);
      setSelected(lists[0]);
      save();
    }
  };

  const downloadJSON = (obj, fileName) => {
    const jsonString = JSON.stringify(selected);
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

  return (
    <div className="create-phrases">
      <h1>Create</h1>
      <div className="lists-input">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={lists.map((i) => i.name)}
          value={selected?.name}
          onChange={(event, newValue) => {
            handleChangeList(newValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select a list" />
          )}
        />
      </div>
      <div className="phrases-container">
        <textarea
          value={selected?.phrases.join("\n")}
          onChange={(e) => {
            handleUpdate(e);
          }}
        />
      </div>
      <div className="buttons">
        <button onClick={handleNewList}>Nova lista</button>
        <button disabled={selected?.name === ""} onClick={handleDelete}>
          Deletar lista atual
        </button>
        <button onClick={downloadJSON}>Baixar lista atual</button>
      </div>
      <br />
      <br />
      <br />
      <Link to="/drag ">Go back</Link>
    </div>
  );
};

export default CreatePhrases;
