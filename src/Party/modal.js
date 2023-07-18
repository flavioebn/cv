import { useEffect, useState } from "react";
import Modal from "../components/modal";

const PartyModal = ({ pc, close, onSave, onDelete }) => {
  const [image, setImage] = useState("");
  const [pcEdited, setPcEdited] = useState(pc);
  const [imageToDisplay, setImageToDisplay] = useState();

  const convertImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e);
    reader.addEventListener("load", () => {
      setPcEdited({ ...pcEdited, image: reader.result });
    });
  };

  useEffect(() => {
    const newimg = localStorage.getItem("pc-image-test");
    setImageToDisplay(newimg);
  }, []);

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

        {/* <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <img src={imageToDisplay} /> */}
        <div className="add-pc-container">
          <button className="delete" onClick={onDelete}>
            Delete
          </button>
          <button className="save" onClick={() => onSave(pcEdited)}>
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PartyModal;
