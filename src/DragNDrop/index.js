import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import changeIcon from "../assets/icons/change.svg";
import uploadIcon from "../assets/icons/upload.svg";

/* eslint-disable react-hooks/exhaustive-deps */

const DragNDrop = () => {
  const [wordsMap, setWordsMap] = useState({
    a: [],
    b: [],
  });
  const [selectedPhrase, setSelectedPhrase] = useState("");
  const [count, setCount] = useState(0);
  const [phrases, setPhrases] = useState([]);
  const [allPhrases, setAllPhrases] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (localStorage.getItem("drag-phrases")) {
      const jsonData = JSON.parse(localStorage.getItem("drag-phrases"));
      setPhrases(jsonData.phrases);
      setAllPhrases(jsonData.phrases);
      setTitle(jsonData.name);
    }

    const fileInput = document.getElementById("fileInput");

    fileInput.addEventListener("change", function () {
      uploadFile(this, function (jsonData) {
        let indexes = [];
        jsonData.phrases.forEach((i, idx) => {
          if (i === "") indexes.push(idx);
        });
        if (indexes.length !== 0) {
          indexes.reverse().forEach((i) => {
            jsonData.phrases.splice(i, 1);
          });
        }
        console.log("Arquivo filtdrado com sucesso:", jsonData);
        // Faça o que quiser com o objeto jsonData aqui.
        localStorage.setItem("drag-phrases", JSON.stringify(jsonData));
        setPhrases(jsonData.phrases);
        setAllPhrases(jsonData.phrases);
        setTitle(jsonData.name);
        setCount(count + 1);
        document.getElementById("new-phrase").click();
      });
    });
  }, []);

  useEffect(() => {
    reset();
  }, [allPhrases]);

  const uploadFile = (inputElement, callback) => {
    if (!inputElement.files || inputElement.files.length === 0) {
      console.error("Nenhum arquivo selecionado.");
      return;
    }

    const file = inputElement.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        const jsonData = JSON.parse(event.target.result);
        callback(jsonData);
      } catch (error) {
        console.error("Erro ao analisar o arquivo JSON.");
      }
    };

    reader.readAsText(file);
  };

  const reset = () => {
    if (allPhrases.length === 0) {
      console.log(allPhrases);
      return;
    }
    const newPhrases = [...phrases];
    const randomNumber = Math.floor(Math.random() * newPhrases.length);
    const randomPhrase = newPhrases[randomNumber];
    console.log("removed: ", newPhrases[randomNumber]);
    newPhrases.splice(randomNumber, 1);
    if (newPhrases.length === 0) newPhrases.push(...allPhrases);
    const words = shuffle(randomPhrase.split(" "));
    setSelectedPhrase(randomPhrase);
    const wordsWithId = words.map((i) => {
      return { word: i, id: Math.floor(Date.now() * Math.random()).toString() };
    });
    setWordsMap({ a: [], b: wordsWithId });
    setPhrases(newPhrases);
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const reorderPhrase = (words, source, destination) => {
    const current = [...words[source.droppableId]];
    const next = [...words[destination.droppableId]];
    const target = current[source.index];

    if (source.droppableId === destination.droppableId) {
      const result = Array.from(current);
      const [removed] = result.splice(source.index, 1);
      result.splice(destination.index, 0, removed);
      const reordered = result;
      return {
        ...words,
        [source.droppableId]: reordered,
      };
    }

    current.splice(source.index, 1);
    next.splice(destination.index, 0, target);

    return {
      ...words,
      [source.droppableId]: current,
      [destination.droppableId]: next,
    };
  };

  const checkIfRight = () => {
    if (
      wordsMap.a.map((i) => i.word).length !== selectedPhrase.split(" ").length
    )
      return;

    if (
      wordsMap.a.map((i) => i.word).toString() ===
      selectedPhrase.split(" ").toString()
    ) {
      return "right";
    } else {
      return "wrong";
    }
  };

  return (
    <div className="dragNDrop">
      <div className="firstContainer">
        <h1>
          {title !== ""
            ? `${title} - ${
                allPhrases.length - phrases.length === 0
                  ? allPhrases.length
                  : allPhrases.length - phrases.length
              }/${allPhrases.length}`
            : "Je ne sais quoi"}
        </h1>
        <DragDropContext
          onDragEnd={({ destination, source }) => {
            if (!destination) {
              return;
            }

            setWordsMap(reorderPhrase(wordsMap, source, destination));
          }}
        >
          <div className="testOne">
            {Object.entries(wordsMap).map(([k, v]) => (
              <Droppable
                droppableId={k}
                direction="horizontal"
                isCombineEnabled={false}
              >
                {(dropProvided) => (
                  <div className="row" {...dropProvided.droppableProps}>
                    <div
                      className={`rowTest ${k === "a" && checkIfRight()}`}
                      ref={dropProvided.innerRef}
                    >
                      {v.map((i, index) => {
                        return (
                          <Draggable
                            key={i.id}
                            draggableId={i.id}
                            index={index}
                          >
                            {(dragProvided) => (
                              <div
                                {...dragProvided.dragHandleProps}
                                {...dragProvided.draggableProps}
                                ref={dragProvided.innerRef}
                                className="item"
                              >
                                {i.word}
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {/* {dropProvided.placeholder} */}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
      <button id="new-phrase" onClick={reset}>
        <img src={changeIcon} alt="newPhraseIcon" />
      </button>

      <label className="upload-container" for="fileInput">
        <img src={uploadIcon} alt="upload" />
      </label>
      <input
        type="file"
        id="fileInput"
        accept=".json"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default DragNDrop;
