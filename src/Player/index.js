import { spells } from "./spells";

const Player = () => {
  console.log(spells.filter((i) => i.level === 0));

  return <h1>Player</h1>;
};

export default Player;
