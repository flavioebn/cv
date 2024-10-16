import React, { useState } from "react";
import Player from "./player";
import { songs } from "./songs/index";

const shuffle = songs
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

const Pablo = () => {
  const [current, setCurrent] = useState(shuffle[0].title);

  const handleSelect = (e) => {
    console.log(e);
    setCurrent(e.title);
  };

  return (
    <div style={{ paddingBottom: "35px" }}>
      {songs.length > 0 &&
        songs.map((i, idx) => {
          return (
            <Player
              song={i}
              index={idx}
              select={() => handleSelect(i)}
              current={current}
            />
          );
        })}
    </div>
  );
};

export default Pablo;
