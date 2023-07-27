import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import changeIcon from "../assets/icons/change.svg";

const App = () => {
  const [wordsMap, setWordsMap] = useState({
    a: [],
    b: [],
  });
  const [selectedPhrase, setSelectedPhrase] = useState("");

  const phrases = [
    "Lorem ipsum dolor sit amet.",
    "Consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt.",
    "Ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam.",
    "Quis nostrud exercitation ullamco laboris.",
    "Nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit.",
    "Excepteur sint occaecat cupidatat non proident.",
    "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
  ];

  const reset = () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const words = shuffle(randomPhrase.split(" "));
    setSelectedPhrase(randomPhrase);
    const wordsWithId = words.map((i) => {
      return { word: i, id: Math.floor(Date.now() * Math.random()).toString() };
    });
    setWordsMap({ a: [], b: wordsWithId });
  };

  useEffect(() => {
    reset();
  }, []);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
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
        <h1>Je ne sais quoi</h1>
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
      <button onClick={reset}>
        <img src={changeIcon} alt="newPhraseIcon" />
      </button>
    </div>
  );
};

export default App;
