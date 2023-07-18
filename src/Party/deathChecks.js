import deadIcon from "../assets/icons/dead.svg";
import aliveIcon from "../assets/icons/alive.svg";
import deathSavesIcon from "../assets/icons/death-saves.svg";

const DeathChecks = () => {
  return (
    <div className="death-container">
      <div className="checks">
        <img src={deadIcon} />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <img src={aliveIcon} />
      </div>
    </div>
  );
};

export default DeathChecks;
