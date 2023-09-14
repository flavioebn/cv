import React, { useState } from "react";
import Modal from "../components/modal";
import { getPastebin, postPastebin } from "./pastebinRequest";

const PastebinModal = ({ close }) => {
  const [imports, setImports] = useState({
    party: "",
    notes: "",
    monsters: "",
  });
  const [pastebins, setPastebins] = useState({
    party: "",
    notes: "",
    monsters: "",
  });

  const handleImport = async (url, type) => {
    const res = await getPastebin(url);
    switch (type) {
      case "party":
        localStorage.setItem("tracker-party", JSON.stringify(res));
        break;
      case "notes":
        localStorage.setItem("dm-notes", JSON.stringify(res));
        break;
      case "monsters":
        localStorage.setItem("tracker-monsters", JSON.stringify(res));
        break;
      default:
        break;
    }
    window.location.reload();
  };

  const handleExport = async (type) => {
    let body;
    switch (type) {
      case "party":
        const party = JSON.parse(localStorage.getItem("tracker-party"));
        if (party) {
          body = party.map((i) => {
            return { ...i, image: "" };
          });
        }
        break;
      case "monsters":
        body = JSON.parse(localStorage.getItem("tracker-monsters"));
        break;
      case "notes":
        body = JSON.parse(localStorage.getItem("dm-notes"));
        break;
      default:
        break;
    }
    if (body.length > 0) {
      console.log("body: ", body);
      const response = await postPastebin(body);
      console.log(response);
      setPastebins({
        ...pastebins,
        [type]: response.slice(21, response.length),
      });
    } else {
      alert("Nothing to export");
    }
  };

  return (
    <Modal close={() => close()}>
      <h1>Pastebin</h1>
      {/* XziwKnVb */}
      {/* sb4Npve7 */}
      <div className="party-modal">
        {/* <>
          <div>
            <h2>Party export: </h2>
            <button onClick={() => handleExport("party")}>Generate</button>
          </div>
          <div>
            <h2>Import pastebin: </h2>
          </div>
          <div>
            <input
              type="text"
              value={imports.party}
              onChange={(e) =>
                setImports({ ...imports, party: e.target.value })
              }
            />
            <button onClick={() => handleImport(imports.party, "party")}>
              Import
            </button>
          </div>
        </> */}
        {["party", "notes", "monsters"].map((i) => {
          return (
            <>
              <div>
                <h2>{i.charAt(0).toUpperCase() + i.slice(1)} export: </h2>
                <button onClick={() => handleExport(i)}>Generate</button>
              </div>
              {pastebins[i] && <span>Your code: {pastebins[i]}</span>}
              <div>
                <h2>Import {i} code: </h2>
              </div>
              <div>
                <input
                  type="text"
                  value={imports[i]}
                  onChange={(e) =>
                    setImports({ ...imports, [i]: e.target.value })
                  }
                />
                <button onClick={() => handleImport(imports[i], i)}>
                  Import
                </button>
              </div>
              <br />
              <br />
            </>
          );
        })}
        {/* <br />
        <div>
          <h2>Notes export: </h2>
          <button onClick={() => handlePartyExport("notes")}>Generate</button>
        </div>
        <div>
          <h2>Import pastebin: </h2>
        </div>
        <div>
          <input
            type="text"
            value={notesToImport}
            onChange={(e) => setNotesToImport(e.target.value)}
          />{" "}
          <button onClick={() => handleImport(notesToImport, "notes")}>
            Import
          </button>
        </div>
        <br />
        <div>
          <h2>Monsters export: </h2>
          <button onClick={() => handlePartyExport("monsters")}>
            Generate
          </button>
        </div>
        <div>
          <h2>Import pastebin: </h2>
        </div>
        <div>
          <input
            type="text"
            value={monstersToImport}
            onChange={(e) => setMonstersToImport(e.target.value)}
          />{" "}
          <button onClick={() => handleImport(monstersToImport, "monsters")}>
            Import
          </button> 
        </div>*/}
      </div>
    </Modal>
  );
};

export default PastebinModal;
