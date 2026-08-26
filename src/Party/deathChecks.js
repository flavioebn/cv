import deadIcon from "../assets/icons/dead.svg";
import aliveIcon from "../assets/icons/alive.svg";

const DeathChecks = () => {
  return (
    <div className="death-container">
      <div className="checks">
        <img src={deadIcon} alt="dead-icon" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <input type="checkbox" />
        <img src={aliveIcon} alt="alive-icon" />
      </div>
    </div>
  );
};

export default DeathChecks;
