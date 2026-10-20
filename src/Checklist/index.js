import React, { useEffect, useState } from "react";
import plusIcon from "../assets/icons/plus.svg";
import changeIcon from "../assets/icons/change.svg";
import trashIcon from "../assets/icons/trash.svg";
import NewListModal from "./newListModal";
import DeleteListModal from "./deleListModal";

const Checklist = () => {
  const [selectedList, setSelectedList] = useState(0);
  const [newItem, setNewItem] = useState("");
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [newListModalVisible, setNewListModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleChangeList = (e) => {
    setSelectedList(e.target.value);
  };

  const save = () => {
    localStorage.setItem("checklists-data", JSON.stringify(data));
  };

  const finishEdit = (temp) => {
    setData(temp);
    setCount(count + 1);
    save();
  };

  useEffect(() => {
    const checklistData = localStorage.getItem("checklists-data");
    if (checklistData) {
      setData(JSON.parse(checklistData));
    }
  }, []);

  const handleGetItem = (e) => {
    let tempArray = data;
    tempArray[selectedList].items[e].got =
      !tempArray[selectedList].items[e].got;
    finishEdit(tempArray);
  };

  const newList = (newListName) => {
    let tempArray = data;
    tempArray.push({ name: newListName, items: [] });
    setSelectedList(tempArray.length - 1);
    finishEdit(tempArray);
  };

  const handleAddItem = () => {
    if (newItem === "") return;
    let tempArray = data;
    tempArray[selectedList].items.push({ name: newItem, got: false });
    setNewItem("");
    finishEdit(tempArray);
  };

  const handleDeleteList = () => {
    let tempArray = data;
    tempArray.splice(selectedList, 1);
    setSelectedList(0);
    finishEdit(tempArray);
  };

  const handleReset = () => {
    let tempArray = data;
    tempArray[selectedList].items.forEach((i) => {
      i.got = false;
    });
    finishEdit(tempArray);
  };

  const handleDeleteItem = (idx) => {
    let tempArray = data;
    tempArray[selectedList].items.splice(idx, 1);
    finishEdit(tempArray);
  };

  const handleNewListModalVisible = () => {
    setNewListModalVisible(!newListModalVisible);
  };

  const handleDeleteListModalVisible = () => {
    setDeleteModalVisible(!deleteModalVisible);
  };

  return (
    <div className="checklist-container">
      {newListModalVisible && (
        <NewListModal
          createList={(list) => newList(list)}
          close={handleNewListModalVisible}
        />
      )}
      {deleteModalVisible && (
        <DeleteListModal
          close={handleDeleteListModalVisible}
          confirm={handleDeleteList}
        />
      )}
      <div className="dropdown">
        <select value={selectedList} onChange={handleChangeList}>
          {data.map((i, idx) => {
            return (
              <option value={idx} key={i + idx}>
                {i.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="items-container">
        {data.length > 0 ? (
          <>
            {data[selectedList].items.map((i, idx) => {
              return (
                <div
                  key={i + idx}
                  className={`item ${i?.got ? "green" : ""}`}
                  value={i.name + idx}
                >
                  <div className="item-name" onClick={() => handleGetItem(idx)}>
                    <p>• {i.name}</p>
                  </div>

                  <button
                    className="small"
                    onClick={() => handleDeleteItem(idx)}
                  >
                    <img src={trashIcon} alt="trashIcon" />
                  </button>
                </div>
              );
            })}
            <div className="item">
              <input
                type="text"
                placeholder="Add new item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddItem();
                  }
                }}
              />
              <button onClick={handleAddItem}>
                <img src={plusIcon} alt="plusIcon" />
              </button>
            </div>
          </>
        ) : (
          <h1 className="reminder">Add a list to start</h1>
        )}
      </div>
      <div className="buttons">
        <button onClick={handleReset}>
          <img src={changeIcon} alt="changeIcon" />
        </button>
        <button onClick={handleNewListModalVisible}>
          <img src={plusIcon} alt="plusIcon" />
        </button>
        <button onClick={handleDeleteListModalVisible}>
          <img src={trashIcon} alt="trashIcon" />
        </button>
      </div>
    </div>
  );
};

export default Checklist;
