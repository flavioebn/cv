import React, { useState } from "react";
import Player from "./player";
import { songs } from "./songs/index";

const shuffle = songs;
// .map((value) => ({ value, sort: Math.random() }))
// .sort((a, b) => a.sort - b.sort)
// .map(({ value }) => value);

const Pablo = () => {
  const [current, setCurrent] = useState(0);

  const handleSelect = (e) => {
    console.log(e);
    // setCurrent(e.title);
  };

  const handleNext = () => {
    if (current === shuffle.length - 1) return;
    setCurrent((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (current === 0) return;
    setCurrent((prev) => prev - 1);
  };

  return (
    <div style={{ paddingBottom: "35px" }}>
      <Player
        song={shuffle[current]}
        index={current}
        select={() => handleSelect(current)}
        next={handleNext}
        prev={handlePrev}
      />
      <div className="song-list">
        {shuffle.map((i, idx) => {
          return (
            <p
              className={`${current === idx && "active"}`}
              onClick={() => setCurrent(idx)}
            >
              {i.title}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Pablo;
