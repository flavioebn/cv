import React, { useEffect, useState } from "react";
import Modal from "../components/modal";
import { getFromStorage, setStorage } from "../utils/utils";

const EditableList = ({ close }) => {
  const [items, setItems] = useState([]);

  const handleTitleClick = (index) => {
    const updatedItems = items.map((item, idx) =>
      idx === index ? { ...item, editing: true } : { ...item, editing: false }
    );
    setItems(updatedItems);
  };

  useEffect(() => {
    const getItems = getFromStorage("dm-diary");
    if (getItems) {
      setItems(getItems);
    }
  }, []);

  useEffect(() => {
    setStorage("dm-diary", items);
  }, [items]);

  const handleTitleChange = (e, index) => {
    const updatedItems = items.map((item, idx) =>
      idx === index ? { ...item, title: e.target.value } : item
    );
    setItems(updatedItems);
  };

  const handleContentChange = (e, index) => {
    const updatedItems = items.map((item, idx) =>
      idx === index ? { ...item, content: e.target.value } : item
    );
    setItems(updatedItems);
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems);
  };

  const handleSave = (index) => {
    const updatedItems = items.map((item, idx) =>
      idx === index ? { ...item, editing: false } : item
    );
    setItems(updatedItems);
    setStorage("dm-diary", updatedItems);
  };

  const handleAddItem = () => {
    const newItem = {
      title: "New Item",
      content: "New Content",
      editing: false,
    };
    setItems([...items, newItem]);
  };

  return (
    <Modal diary={true} close={close}>
      <div>
        <h1>Diário</h1>
        <button onClick={handleAddItem}>Add Item</button>
        {items.map((item, index) => (
          <div key={index}>
            {item.editing ? (
              <div>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleTitleChange(e, index)}
                />
                <textarea
                  value={item.content}
                  onChange={(e) => handleContentChange(e, index)}
                />
                <button onClick={() => handleSave(index)}>Save</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ) : (
              <div>
                <h2 onClick={() => handleTitleClick(index)}>{item.title}</h2>
                <ul>
                  {item.content.split("\n").map((line, lineIdx) => (
                    <li key={lineIdx}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default EditableList;
