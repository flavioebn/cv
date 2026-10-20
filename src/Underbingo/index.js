import { useState } from "react";

const data = [
  "card01",
  "card02",
  "card03",
  "card04",
  "card05",
  "card06",
  "card07",
  "card08",
  "card09",
  "card10",
  "card11",
  "card12",
  "card13",
  "card14",
  "card15",
  "card16",
  "card17",
  "card18",
  "card19",
  "card20",
  "card21",
  "card22",
  "card23",
  "card24",
  "card25",
  "card26",
  "card27",
  "card28",
  "card29",
  "card30",
  "card31",
  "card32",
  "card33",
  "card34",
  "card35",
  "card36",
  "card37",
  "card38",
  "card39",
  "card40",
];
const shuffled = [...data].sort(() => Math.random() - 0.5);
const random25 = shuffled.slice(0, 25);

const Underbingo = () => {
  // Shuffle the data array and take the first 25 items
  const [selected, setSelected] = useState([]);

  const handleSelect = (i) => {
    if (selected.includes(i)) {
      setSelected(selected.filter((s) => s !== i));
    } else {
      setSelected([...selected, i]);
    }
  };

  return (
    <div className="underbingo">
      <h2>Underbingo</h2>
      <div className="bingo-container">
        {random25.map((i) => {
          return (
            <div
              className={`bingo-card ${i} ${
                selected.includes(i) ? "selected" : ""
              }`}
              key={i}
              onClick={() => handleSelect(i)}
            >
              <p>{i}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Underbingo;
