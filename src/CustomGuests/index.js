import { useState } from "react";

const rooms = [
  {
    id: "room1",
    name: "Study",
    connections: ["room2", "room3", "room4"],
  },
  {
    id: "room2",
    name: "Garage",
    connections: ["room5", "room4"],
  },
  {
    id: "room3",
    name: "Shed",
    connections: ["room6", "room7"],
  },
  {
    id: "room4",
    name: "Bedroom",
    connections: ["room6", "room2"],
  },
  {
    id: "room5",
    name: "Trophy Room",
    connections: ["room2", "room8", "room9"],
  },
  {
    id: "room6",
    name: "Kitchen",
    connections: ["room4", "room3", "room10"],
  },
  {
    id: "room7",
    name: "Library",
    connections: ["room3", "room10"],
  },
  {
    id: "room8",
    name: "Billiard Room",
    connections: ["room5", "room9"],
  },
  {
    id: "room9",
    name: "Vestibulo",
    connections: ["room5", "room8", "room10"],
  },
  {
    id: "room10",
    name: "Living Room",
    connections: ["room9", "room6", "room7"],
  },
];

const guests = [
  {
    name: "guest1",
    reasons: [
      { type: "reasonType1", name: "reason 01" },
      { type: "reasonType4", name: "reason 02" },
      { type: "reasonType5", name: "reason 03" },
    ],
  },
  {
    name: "guest1",
    reasons: [
      { type: "reasonType4", name: "reason 01" },
      { type: "reasonType5", name: "reason 02" },
      { type: "reasonType6", name: "reason 03" },
    ],
  },
  {
    name: "guest2",
    reasons: [
      { type: "reasonType3", name: "reason 01" },
      { type: "reasonType5", name: "reason 02" },
      { type: "reasonType4", name: "reason 03" },
    ],
  },
  {
    name: "guest3",
    reasons: [
      { type: "reasonType2", name: "reason 01" },
      { type: "reasonType6", name: "reason 02" },
      { type: "reasonType5", name: "reason 03" },
    ],
  },
  {
    name: "guest4",
    reasons: [
      { type: "reasonType3", name: "reason 01" },
      { type: "reasonType6", name: "reason 02" },
      { type: "reasonType4", name: "reason 03" },
    ],
  },
  {
    name: "guest5",
    reasons: [
      { type: "reasonType2", name: "reason 01" },
      { type: "reasonType5", name: "reason 02" },
      { type: "reasonType4", name: "reason 03" },
    ],
  },
  {
    name: "guest6",
    reasons: [
      { type: "reasonType6", name: "reason 01" },
      { type: "reasonType3", name: "reason 02" },
      { type: "reasonType2", name: "reason 03" },
    ],
  },
];

// const reasonTypes = [
//   "reasonType1",
//   "reasonType2",
//   "reasonType3",
//   "reasonType4",
//   "reasonType5",
//   "reasonType6",
// ];

const getRandomPath = () => {
  const getRandomRoom = (currentRoom, visitedRooms) => {
    const availableRooms = rooms.filter(
      (room) =>
        currentRoom.connections.includes(room.id) &&
        !visitedRooms.includes(room.id)
    );
    const randomRoom =
      availableRooms[Math.floor(Math.random() * availableRooms.length)];
    return randomRoom;
  };

  const firstRoom = rooms.find((room) => room.id === "room1");
  const secondRoom = getRandomRoom(firstRoom, [firstRoom.id]);
  const thirdRoom = getRandomRoom(secondRoom, [firstRoom.id, secondRoom.id]);
  const fourthRoom = getRandomRoom(thirdRoom, [
    firstRoom.id,
    secondRoom.id,
    thirdRoom.id,
  ]);

  return [firstRoom, secondRoom, thirdRoom, fourthRoom];
};

const getPathCards = (correctPath) => {
  const pathCards = [];
  const pathsToExclude = correctPath.map((i) => i.name);
  let allPaths = [];
  const possiblePaths = [];
  const excluded = [];
  rooms.forEach((i) => {
    i.connections.forEach((j) => {
      allPaths.push([i.name, rooms.find((k) => k.id === j).name]);
    });
  });
  const uniquePaths = new Set();
  allPaths.forEach((path) => {
    const sortedPath = path.slice().sort().join("-");
    uniquePaths.add(sortedPath);
  });
  const filteredPaths = Array.from(uniquePaths).map((path) => path.split("-"));
  allPaths = filteredPaths;
  allPaths.forEach((path) => {
    if (
      !pathsToExclude.includes(path[0]) ||
      !pathsToExclude.includes(path[1])
    ) {
      excluded.push(path);
    } else {
      possiblePaths.push(path);
    }
  });
  excluded.forEach((i) => {
    pathCards.push(`Ninguém transitou entre ${i[0]} e ${i[1]}`);
  });
  return pathCards;
};

// const getReasonsCards = (correctReason) => {
//   const { reasonType, reason } = correctReason;
//   const notPossibleTypes = reasonTypes.filter((i) => i !== reasonType);
//   // const policeReasons
// };

const generateCards = (correctPath, correctSolution) => {
  const cards = [];
  const pathCards = getPathCards(correctPath);
  pathCards.forEach((i) => {
    cards.push(i);
  });

  // const reasonsCards = getReasonsCards(correctSolution);

  return cards;
};

const CustomGuests = () => {
  const [path, setPath] = useState([]);
  const [solution, setSolution] = useState({
    name: "",
    reasonType: "",
    reason: "",
  });
  // const [cards, setCards] = useState([]);

  const generateSolution = () => {
    const newPath = getRandomPath();
    setPath(newPath);
    const randomGuest = guests[Math.floor(Math.random() * guests.length)];
    const randomReason =
      randomGuest.reasons[
        Math.floor(Math.random() * randomGuest.reasons.length)
      ];
    const newSolution = {
      name: randomGuest.name,
      reasonType: randomReason.type,
      reason: randomReason.name,
    };
    setSolution(newSolution);
    const newCards = generateCards(newPath, newSolution);
    // setCards(newCards);
    console.log(newCards);
  };

  return (
    <div>
      <h1>Guests</h1>
      <button onClick={generateSolution}>get solution</button>
      {path.length > 0 &&
        path.map((i) => {
          return <p key={i.id}>{i.name}</p>;
        })}
      <p>Culpado: {solution.name}</p>
      <p>Tipo do motivo: {solution.reasonType}</p>
      <p>Motivo: {solution.reason}</p>
    </div>
  );
};

export default CustomGuests;
