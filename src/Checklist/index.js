import React, { useState } from "react";
import plusIcon from "../assets/icons/plus.svg";
import changeIcon from "../assets/icons/change.svg";
import closeIcon from "../assets/icons/close.svg";

const Checklist = () => {
  const [selectedList, setSelectedList] = useState(0);
  const [data, setData] = useState([
    {
      name: "lista1",
      items: [
        { name: "carteira", got: true },
        { name: "carteira", got: false },
        { name: "carteira", got: false },
        { name: "carteira", got: true },
        { name: "carteira", got: false },
        { name: "carteira", got: false },
        { name: "celular", got: false },
        { name: "celular", got: false },
        { name: "celular", got: false },
        { name: "celular", got: false },
        { name: "celular", got: false },
        { name: "celular", got: false },
      ],
    },
    {
      name: "lista2",
      items: [
        { name: "celular", got: false },
        { name: "celular", got: false },
        { name: "celular", got: false },
      ],
    },
    {
      name: "lista3",
      items: [
        { name: "chave", got: false },
        { name: "chave", got: false },
        { name: "chave", got: false },
      ],
    },
  ]);
  const [count, setCount] = useState(0);

  const handleChangeList = (e) => {
    setSelectedList(e.target.value);
  };

  const handleGetItem = (e) => {
    let tempArray = data;
    tempArray[selectedList].items[e].got =
      !tempArray[selectedList].items[e].got;
    setData(tempArray);
    setCount(count + 1);
  };

  const newList = () => {
    const name = prompt("New list name:");
  };

  return (
    <div className="checklist-container">
      <div className="dropdown">
        <select onChange={handleChangeList}>
          {data.map((i, idx) => {
            return <option value={idx}>{i.name}</option>;
          })}
        </select>
      </div>
      <div className="items-container">
        {data[selectedList].items.map((i, idx) => {
          return (
            <div
              className={`item ${i.got ? "green" : ""}`}
              value={i}
              onClick={() => handleGetItem(idx)}
            >
              <p>• {i.name}</p>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button>
          <img src={changeIcon} alt="changeIcon" />
        </button>
        <button>
          <img src={plusIcon} alt="plusIcon" onClick={newList} />
        </button>
        <button>
          <img src={closeIcon} alt="closeIcon" />
        </button>
      </div>
    </div>
  );
};

export default Checklist;
