import React, { useEffect, useState } from "react";
import Modal from "../components/modal";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { getFromStorage, getRandomId, setStorage } from "../utils/utils";

const NotesModal = ({ close }) => {
  const [notes, setNotes] = useState([]);
  const [expandedAccordionIds, setExpandedAccordionIds] = useState([]);
  const [count, setCount] = useState(0);
  const [newNote, setNewNote] = useState("");

  const handleEdit = (e, idx) => {
    let temp = [...notes];
    temp[idx].note = e.target.value;
    setNotes(temp);
  };

  const handleClose = () => {
    setStorage("dm-notes", notes);
    close();
  };

  useEffect(() => {
    const loadedNotes = getFromStorage("dm-notes");
    if (loadedNotes) {
      setNotes(loadedNotes);
    }
  }, []);

  const handleDelete = (idx) => {
    if (window.confirm("Delete list?")) {
      let temp = [...notes];
      const deletedNoteId = temp[idx].id;

      temp.splice(idx, 1);
      setNotes(temp);

      // Remove o ID da nota deletada do estado de notas expandidas
      setExpandedAccordionIds((prevIds) =>
        prevIds.filter((id) => id !== deletedNoteId)
      );

      setStorage("dm-notes", temp);
      setCount(count + 1);
    }
  };

  const handleAddNote = () => {
    let temp = [...notes];
    const newNoteId = getRandomId();
    temp.push({
      id: newNoteId,
      title: newNote,
      note: "",
    });
    setNotes(temp);
    setStorage("dm-notes", temp);
    setNewNote("");
    setCount(count + 1);
  };

  const handleAccordionChange = (noteId) => {
    setExpandedAccordionIds((prevIds) =>
      prevIds.includes(noteId)
        ? prevIds.filter((id) => id !== noteId)
        : [...prevIds, noteId]
    );
  };

  return (
    <Modal close={handleClose}>
      <div className="notes-modal">
        <h1>Notes</h1>
        <div className="notes">
          {notes.map((note, idx) => {
            const isExpanded = expandedAccordionIds.includes(note.id);

            return (
              <Accordion
                key={note.id}
                expanded={isExpanded}
                onChange={() => handleAccordionChange(note.id)}
              >
                <AccordionSummary>
                  <h2>{note.title}</h2>
                </AccordionSummary>
                <AccordionActions>
                  <p onClick={() => handleDelete(idx)} className="delete">
                    Delete note
                  </p>
                </AccordionActions>
                <AccordionDetails>
                  <textarea
                    onChange={(e) => handleEdit(e, idx)}
                    value={note.note}
                  />
                </AccordionDetails>
              </Accordion>
            );
          })}
          <div className="new-note-container">
            <input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="New note title"
            />
            <button onClick={handleAddNote}>Add</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotesModal;
