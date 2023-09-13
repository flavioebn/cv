import { useState } from "react";
import Modal from "../components/modal";

const PartyModal = ({ pc, close, onSave, onDelete }) => {
  const [pcEdited, setPcEdited] = useState(pc);

  const convertImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e);
    reader.addEventListener("load", () => {
      setPcEdited({ ...pcEdited, image: reader.result });
    });
  };

  return (
    <Modal close={close}>
      <div className="party-modal">
        <div>
          <h2>Name: </h2>{" "}
          <input
            value={pcEdited.name}
            onChange={(e) => {
              setPcEdited({ ...pcEdited, name: e.target.value });
            }}
            type="text"
          />
        </div>
        <div>
          <h2>Image:</h2>
          <input
            // value={pcEdited.image}
            onChange={(e) => {
              convertImage(e.target.files[0]);
            }}
            type="file"
          />
        </div>
        <div>
          <h2>Max hp: </h2>{" "}
          <input
            value={pcEdited.maxHp}
            onChange={(e) => {
              setPcEdited({ ...pcEdited, maxHp: e.target.value });
            }}
            type="number"
          />
        </div>
        <div>
          <h2>AC: </h2>{" "}
          <input
            value={pcEdited.ac}
            onChange={(e) => {
              setPcEdited({ ...pcEdited, ac: e.target.value });
            }}
            type="number"
          />
        </div>
        <div>
          <h2>Passive perception: </h2>
          <input
            value={pcEdited.pPerception}
            onChange={(e) => {
              setPcEdited({ ...pcEdited, pPerception: e.target.value });
            }}
            type="number"
          />
        </div>
        <div>
          <h2>Darkvision:</h2>
          <input
            checked={pcEdited.darkvision}
            onChange={(e) => {
              setPcEdited({ ...pcEdited, darkvision: !pcEdited.darkvision });
            }}
            type="checkbox"
          />
        </div>
        <div className="two-columns">
          <div>
            <h2>Inventory: </h2>
            <textarea
              placeholder="ONE PER LINE"
              value={pcEdited.inventory.toString().split(",").join("\n")}
              onChange={(e) => {
                setPcEdited({
                  ...pcEdited,
                  inventory: e.target.value.split("\n"),
                });
              }}
            />
          </div>
          <div className="lang-container">
            <h2>Languages: </h2>
            <textarea
              placeholder="ONE PER LINE"
              value={pcEdited.languages.toString().split(",").join("\n")}
              onChange={(e) => {
                setPcEdited({
                  ...pcEdited,
                  languages: e.target.value.split("\n"),
                });
              }}
            />
          </div>
        </div>

        <div className="add-pc-container">
          <button className="delete" onClick={onDelete}>
            Delete
          </button>
          <button
            disabled={pcEdited.name === "" || pcEdited.maxHp === 0}
            className="save"
            onClick={() => onSave(pcEdited)}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PartyModal;
