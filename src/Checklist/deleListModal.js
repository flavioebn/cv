import React from "react";
import Modal from "../components/modal";

const DeleteListModal = ({ close, confirm }) => {
  const handleConfirm = () => {
    confirm();
    close();
  };
  return (
    <Modal close={close} classes="checklistModal">
      <h2>Delete list?</h2>
      <button className="confirmDeleteList" onClick={handleConfirm}>
        Delete
      </button>
    </Modal>
  );
};

export default DeleteListModal;
