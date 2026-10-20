import React, { useState } from "react";
import Modal from "../components/modal";

const NewListModal = ({ close, createList }) => {
  const [newList, setNewList] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(newList);
    close();
  };

  return (
    <Modal close={close} classes="checklistModal">
      <h2>Add list</h2>
      <form className="newCheckListForm" onSubmit={handleSubmit}>
        <input
          className="newChecklistInput"
          value={newList}
          onChange={(e) => setNewList(e.target.value)}
        />
        <button
          disabled={newList.trim() === ""}
          className="submitNewChecklist"
          type="submit"
        >
          Add
        </button>
      </form>
    </Modal>
  );
};

export default NewListModal;
