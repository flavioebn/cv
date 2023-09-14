import { Link } from "react-router-dom";
import plusIcon from "../assets/icons/plus.svg";
import { useEffect, useState } from "react";
import Modal from "./modal";

const RenderItem = ({ i, idx, handleClick, done }) => {
  return (
    <>
      <div className={`expiry-item ${done && "done"}`} onClick={handleClick}>
        <p>{i.name}</p>
        <p>
          {i.date.slice(8, 10) +
            "/" +
            i.date.slice(5, 7) +
            "/" +
            i.date.slice(0, 4)}
        </p>
      </div>
    </>
  );
};

const Expiry = () => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(false);
  const [divided, setDivided] = useState({
    week: [],
    month: [],
    rest: [],
    done: [],
  });
  const [toAdd, setToAdd] = useState({
    name: "",
    date: "",
  });
  const [toEdit, setToEdit] = useState({
    name: "",
    date: "",
    type: "",
    idx: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleAdd = (e) => {
    const { value, type } = e.target;
    if (type === "text") {
      setToAdd({ ...toAdd, name: value });
    } else {
      setToAdd({ ...toAdd, date: value });
    }
  };

  const save = () => {
    localStorage.setItem("expiry-items", JSON.stringify(items));
  };

  const addItem = () => {
    items.push(toAdd);
    items.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    save();
    setToAdd({
      name: "",
      date: "",
    });
    sortDivided(items);
  };

  const sortDivided = (items) => {
    let tempWeek = [];
    let tempMonth = [];
    let tempRest = [];
    let tempDone = [];

    const today = new Date();

    items?.forEach((i) => {
      const timeDif = new Date(i.date).getTime() - today.getTime();
      const daysDif = Math.ceil(timeDif / (1000 * 3600 * 24));
      if (daysDif <= 0) {
        tempDone.push(i);
      } else if (daysDif < 7) {
        tempWeek.push(i);
      } else if (daysDif <= 30) {
        tempMonth.push(i);
      } else {
        tempRest.push(i);
      }
    });
    setDivided({
      week: tempWeek,
      month: tempMonth,
      rest: tempRest,
      done: tempDone,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("expiry-items")) {
      setItems(JSON.parse(localStorage.getItem("expiry-items")));
    }
    let tempItems = JSON.parse(localStorage.getItem("expiry-items"));
    sortDivided(tempItems);
  }, []);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleEdit = (e, idx, type) => {
    setToEdit({
      name: e.name,
      date: e.date,
      type: type,
      idx: idx,
    });
    setToAdd({
      name: e.name,
      date: e.date,
    });
    setEditing(true);
    handleModal();
  };

  const handleRemove = () => {
    const { name, date, type, idx } = toEdit;
    let tempArray = divided[type];
    let tempItems = items;
    tempArray.splice(idx, 1);
    setDivided({ ...divided, [type]: tempArray });
    const itemIndex = items.findIndex(
      (i) => i.name === name && i.date === date
    );
    items.splice(itemIndex, 1);
    setItems(tempItems);
    handleModal();
    setEditing(false);
    save();
  };

  const handleUpdate = () => {
    const { type } = toEdit;

    let tempArray = divided[type];
    let tempItems = items;

    const itemIndex = items.findIndex(
      (i) => i.name === toEdit.name && i.date === toEdit.date
    );

    tempItems[itemIndex].name = toAdd.name;
    tempItems[itemIndex].date = toAdd.date;

    tempArray[toEdit.idx].name = toAdd.name;
    tempArray[toEdit.idx].date = toAdd.date;

    tempItems.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    setDivided({ ...divided, [type]: tempArray });
    setItems(tempItems);
    sortDivided(items);
    setEditing(false);
    save();

    handleModal();
  };

  const handleNew = () => {
    handleModal();
    setEditing(false);

    setToAdd({
      name: "",
      date: "",
    });
  };

  return (
    <div className="expiry-container">
      <Link className="back-to-hub" to="/hub">
        Back to hub
      </Link>
      <p className="version">v1.3</p>
      {items.length === 0 && <h1>Add items will be shown here</h1>}
      {modalVisible && (
        <Modal
          onCancel={handleModal}
          onEdit={handleAdd}
          info={toAdd}
          onSave={addItem}
          editing={editing}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
        />
      )}
      {divided.week.length > 0 && (
        <>
          <h2>In a week:</h2>
          {divided.week.map((i, idx) => {
            return (
              <RenderItem
                key={Math.random()}
                i={i}
                idx={idx}
                handleClick={() => handleEdit(i, idx, "week")}
              />
            );
          })}
        </>
      )}
      {divided.month.length > 0 && (
        <>
          <h2>In a month:</h2>
          {divided.month.map((i, idx) => {
            return (
              <RenderItem
                key={Math.random()}
                i={i}
                idx={idx}
                handleClick={() => handleEdit(i, idx, "month")}
              />
            );
          })}
        </>
      )}
      {divided.rest.length > 0 && (
        <>
          <h2>Beyond a month:</h2>
          {divided.rest.map((i, idx) => {
            return (
              <RenderItem
                key={Math.random()}
                i={i}
                idx={idx}
                handleClick={() => handleEdit(i, idx, "rest")}
              />
            );
          })}
        </>
      )}
      {divided.done.length > 0 && (
        <>
          <h2>:(</h2>
          {divided.done.map((i, idx) => {
            return (
              <RenderItem
                done={true}
                key={Math.random()}
                i={i}
                idx={idx}
                handleClick={() => handleEdit(i, idx, "done")}
              />
            );
          })}
        </>
      )}
      {/* <input value={toAdd.name} type="text" onChange={handleAdd}></input>
      <input value={toAdd.date} type="date" onChange={handleAdd}></input> */}
      <button className="plus-container" onClick={handleNew}>
        <img src={plusIcon} alt="plus" />
      </button>
    </div>
  );
};

export default Expiry;
