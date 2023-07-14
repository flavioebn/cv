import { Fragment, useEffect, useState } from "react";
import plusIcon from "../assets/icons/plus.svg";
import deathSavesIcon from "../assets/icons/death-saves.svg";
import thumbsUpIcon from "../assets/icons/thumbs-up.svg";
import thumbsDownIcon from "../assets/icons/thumbs-down.svg";
import CustomTooltip from "./tooltip";
import caIcon from "../assets/icons/ca.svg";
import hpIcon from "../assets/icons/hp.svg";
import initiativeIcon from "../assets/icons/initiative.svg";
import MonsterModal from "./addMonsterModal";
import fillIcon from "../assets/icons/fill.svg";
import minusIcon from "../assets/icons/minus.svg";

const RenderParty = ({
  pc,
  idx,
  updateTemp,
  handleCondition,
  removeCondition,
  onKill,
}) => {
  const isEnemy = pc.image ? false : true;
  return (
    <div
      className={`init-item ${!isEnemy && pc.concentrate && "contrating"} ${
        !isEnemy && pc.damage >= pc.maxHp && "dying"
      }`}
    >
      {isEnemy && (
        <button className="minus-container" onClick={() => onKill(idx)}>
          <p>Kill</p>
        </button>
      )}
      {!isEnemy && <img src={pc.image} alt={`${pc.name}_icon`} />}
      <div className={`info ${isEnemy && "enemy"}`}>
        <div className="align-left">
          {!isEnemy && (
            <div
              onClick={(e) => updateTemp(!pc.concentrate, "concentrate", idx)}
              className={`concentrate ${pc.concentrate && "active"}`}
            >
              <p>C</p>
            </div>
          )}
          <h2 onClick={() => handleCondition(idx)}>{pc.name}</h2>
        </div>

        {pc.conditions?.length > 0 && (
          <div className="pc-conditions">
            {pc.conditions.map((i) => {
              return (
                <CustomTooltip
                  value={i.details.map((item, index) => (
                    <Fragment key={index}>
                      {index === 0 && (
                        <h3 className="condition-tooltip-name">{i.name}</h3>
                      )}
                      {item}
                      <br />
                    </Fragment>
                  ))}
                >
                  <img
                    src={i.icon}
                    alt={i.name}
                    onClick={() => removeCondition(i, idx)}
                  />
                </CustomTooltip>
              );
            })}
          </div>
        )}
        <div>
          <img src={initiativeIcon} />
          <input
            value={pc.initiative}
            onChange={(e) =>
              updateTemp(e.target.value, "initiative", idx, isEnemy, pc.name)
            }
          />
        </div>
        <div>
          <img src={hpIcon} alt="hp" />
          <input
            value={pc.damage}
            min={0}
            onChange={(e) =>
              updateTemp(parseInt(e.target.value), "damage", idx, isEnemy)
            }
            className="fillable"
            type="number"
          />
          <p>/ {pc.maxHp}</p>
        </div>
        <div>
          <img src={caIcon} alt="ac" />
          <p>{pc.ac}</p>
        </div>
        {pc.damage >= pc.maxHp && (
          <div className="death-container">
            <img className="bedIcon" src={deathSavesIcon} />
            <div className="checks">
              <img src={thumbsDownIcon} />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <input type="checkbox" />
              <img src={thumbsUpIcon} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const InitView = () => {
  const [party, setParty] = useState([]);
  const [count, setCount] = useState(0);
  const [conditionModal, setConditionModal] = useState(false);
  const [idxEditing, setIdxEditing] = useState(0);
  const [addModal, setAddModal] = useState(false);
  const [turnOrder, setTurnOrder] = useState([]);

  useEffect(() => {
    const newPt = JSON.parse(localStorage.getItem("tracker-party"));
    const newOrder = JSON.parse(localStorage.getItem("tracker-inits"));
    setParty(newPt);
    let partyInOrder = false;
    const names = newPt.map((i) => i.name);
    console.log(names);
    if (newOrder) {
      newOrder.map((i) => {
        if (names.includes(i.name)) partyInOrder = true;
      });
    }
    if (partyInOrder) {
      setTurnOrder(newOrder);
    } else {
      setTurnOrder(newPt);
    }
  }, []);

  const save = () => {
    localStorage.setItem("tracker-party", JSON.stringify(party));
    localStorage.setItem("tracker-inits", JSON.stringify(turnOrder));
  };

  const updateTemp = (e, field, idx, isEnemy, name) => {
    const tempArray = turnOrder;
    tempArray[idx] = { ...tempArray[idx], [field]: e };
    setTurnOrder(tempArray);
    if (!isEnemy) {
      console.log("afs");
      let tempParty = party;
      const index = party.findIndex((i) => i.name === name);
      tempParty[index] = { ...tempParty[index], [field]: e };
      setParty(tempParty);
    }
    setCount(count + 1);
    save();
  };

  const handleCondition = (e) => {
    setIdxEditing(e);
    handleConditionModal();
  };

  const sortOrder = () => {
    let tempOrder = turnOrder;
    tempOrder.sort((a, b) => b.initiative - a.initiative);
    setTurnOrder(tempOrder);
    setCount(count + 1);
    save();
  };

  const addCondition = (e) => {
    console.log(e);
    const tempArray = party;
    tempArray[idxEditing].conditions.push(e);
    setParty(tempArray);
    save();
    handleConditionModal();
  };

  const fillInits = () => {
    let tempOrder = turnOrder;
    turnOrder.map((i) => {
      i.initiative = Math.floor(Math.random() * 23) + 1;
    });
    setTurnOrder(tempOrder);
    setCount(count + 1);
    save();
  };

  const handleConditionModal = () => {
    setConditionModal(!conditionModal);
  };

  const removeCondition = (e, idx) => {
    console.log(e, idx);
    const tempParty = party;
    const indexToRemove = tempParty[idx].conditions.findIndex(
      (i) => i.name === e.name
    );
    tempParty[idx].conditions.splice(indexToRemove, 1);
    setParty(party);
    setCount(count + 1);
    save();
  };

  const calculateHp = (hp) => {
    const splited = hp.split(" ");
    let dices =
      parseInt(splited[0].split("d")[0]) * parseInt(splited[0].split("d")[1]);
    if (splited[2]) {
      dices = dices + parseInt(splited[2]);
    }
    console.log(dices);
    return dices;
  };

  const handleAddMonster = (e) => {
    let m = {};
    m.name = e.name;
    m.initiative = 0;
    m.damage = 0;
    m.ac = e.ac[0].ac ? e.ac[0].ac : e.ac[0];
    m.stats = {
      str: e.str,
      dex: e.dex,
      con: e.con,
      int: e.int,
      wis: e.wis,
      cha: e.cha,
    };
    m.actions = e.action;
    m.cr = e.cr;
    m.maxHp = calculateHp(e.hp.formula);
    m.languages = e.languages;
    m.size = e.size[0];
    m.type = e.type.type ? e.type.type : e.type;
    m.skills = e.skill;
    m.speed = e.speed;
    m.traits = e.trait;
    m.immunities = { conditions: e.conditionImmune, damage: e.immune };
    m.saves = e.save;
    e.legendary ? (m.legendary = e.legendary) : <></>;
    console.log(m);
    let tempOrder = turnOrder;
    tempOrder.push(m);
    setTurnOrder(tempOrder);
    setCount(count + 1);
    save();
  };

  const handleModal = () => {
    setAddModal(!addModal);
  };

  const onKill = (idx) => {
    console.log(idx);
    let tempOrder = turnOrder;
    turnOrder.splice(idx, 1);
    setTurnOrder(tempOrder);
    setCount(count + 1);
    save();
  };

  return (
    <div className="init-container">
      {addModal && (
        <MonsterModal onClose={handleModal} onAdd={handleAddMonster} />
      )}
      {turnOrder.map((i, idx) => {
        return (
          <RenderParty
            onKill={onKill}
            pc={i}
            idx={idx}
            updateTemp={updateTemp}
            handleCondition={handleCondition}
            removeCondition={removeCondition}
          />
        );
      })}
      <button className="plus-container" onClick={handleModal}>
        <img src={plusIcon} alt="plus" />
      </button>
      <button className="fill-container" onClick={fillInits}>
        <img src={fillIcon} alt="fill" />
      </button>
      <button className="sort-container" onClick={sortOrder}>
        <img src={initiativeIcon} alt="sort" />
      </button>
    </div>
  );
};

export default InitView;
