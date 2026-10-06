const Modal = ({
  onSave,
  onCancel,
  onEdit,
  info,
  editing,
  onUpdate,
  onRemove,
}) => {
  return (
    <>
      <div className="modal">
        <h2>Item: </h2>
        <input type="text" value={info.name} onChange={onEdit} />
        <h2>Expiry date: </h2>
        <input type="date" value={info.date} onChange={onEdit} />
        <div className="buttons">
          <button onClick={editing ? onRemove : onCancel}>
            {editing ? "Remover" : "Cancelar"}
          </button>
          <button
            disabled={info.name === "" || info.date === ""}
            onClick={editing ? onUpdate : onSave}
          >
            {editing ? "Update" : "Save"}
          </button>
        </div>
      </div>
      <div className="modal-bg" onClick={onCancel} />
    </>
  );
};

export default Modal;
