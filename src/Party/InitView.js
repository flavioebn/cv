import { Fragment, useEffect, useState } from "react";
import plusIcon from "../assets/icons/plus.svg";
import CustomTooltip from "./tooltip";
import caIcon from "../assets/icons/ca.svg";
import hpIcon from "../assets/icons/hp.svg";
import initiativeIcon from "../assets/icons/initiative.svg";
import MonsterModal from "./addMonsterModal";
import fillIcon from "../assets/icons/fill.svg";
import DeathChecks from "./deathChecks";
import ConditionsModal from "./conditionsModal";

const RenderParty = ({
  pc,
  idx,
  updateTemp,
  handleCondition,
  removeCondition,
  onKill,
  getDefenses,
  getActions,
  getInfos,
  getTraits,
}) => {
  const isEnemy = pc.inventory ? false : true;
  return (
    <div
      key={idx}
      className={`init-item ${pc.concentrate && "contrating"} ${
        !isEnemy && pc.curHp <= 0 && "dying"
      }`}
    >
      {isEnemy && (
        <button className="minus-container" onClick={() => onKill(idx, pc._id)}>
          <p>Kill</p>
        </button>
      )}
      <img
        src={
          isEnemy
            ? `https://raw.githubusercontent.com/5etools-mirror-1/5etools-mirror-1.github.io/master/img/MM/${pc.name
                .replace(/[\(\)\d]+/g, "")
                .trim()}.png`
            : pc.image
        }
        className="pc-icon"
        alt={`${pc.name}_icon`}
      />
      <div className={`info ${isEnemy && "enemy"}`}>
        <div className={`align-left  ${!isEnemy && pc.curHp <= 0 && "dying"}`}>
          <div>
            <div
              onClick={(e) => updateTemp(!pc.concentrate, "concentrate", idx)}
              className={`concentrate ${pc.concentrate && "active"}`}
            >
              <p>C</p>
            </div>
            <h2 onClick={() => handleCondition(isEnemy, pc)}>{pc.name}</h2>
          </div>
          {pc.curHp <= 0 && !isEnemy && <DeathChecks />}
        </div>
        <div>
          <img src={initiativeIcon} alt="init-icon" />
          <input
            value={pc.initiative}
            onChange={(e) =>
              updateTemp(e.target.value, "initiative", idx, isEnemy, pc._id)
            }
          />
        </div>
        <div>
          <img src={hpIcon} alt="hp" />
          <input
            value={pc.curHp}
            onChange={(e) =>
              updateTemp(
                parseInt(e.target.value),
                "curHp",
                idx,
                isEnemy,
                pc._id
              )
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
        <div className="last-on-mobile">
          {isEnemy && !pc.custom && (
            <div className="monster-infos">
              <CustomTooltip
                position={"left"}
                value={<Fragment>{getActions(pc)}</Fragment>}
              >
                <p>Actions</p>
              </CustomTooltip>
              <CustomTooltip
                position={"left"}
                value={<Fragment>{getDefenses(pc)}</Fragment>}
              >
                <p>Defenses</p>
              </CustomTooltip>
              <CustomTooltip
                position={"left"}
                value={<Fragment>{getInfos(pc)}</Fragment>}
              >
                <p>Infos</p>
              </CustomTooltip>
              <CustomTooltip
                small
                position={"left"}
                value={<Fragment>{getTraits(pc)}</Fragment>}
              >
                <p>Traits</p>
              </CustomTooltip>
            </div>
          )}
          {pc.conditions?.length > 0 && (
            <div className="pc-conditions">
              {pc.conditions.map((i, idx) => {
                return (
                  <CustomTooltip
                    key={idx}
                    small
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
                      onClick={() => removeCondition(i, idx, pc, isEnemy)}
                    />
                  </CustomTooltip>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const InitView = () => {
  const [party, setParty] = useState([]);
  const [count, setCount] = useState(0);
  const [conditionModal, setConditionModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [turnOrder, setTurnOrder] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [conditionDetails, setConditionDetails] = useState({
    type: "",
    id: "",
  });

  useEffect(() => {
    const newPt = JSON.parse(localStorage.getItem("tracker-party"));
    const newMonsters = JSON.parse(localStorage.getItem("tracker-monsters"));

    setParty(newPt);

    if (newMonsters) {
      let newOrder = newPt.concat(newMonsters);
      setMonsters(newMonsters);
      setTurnOrder(newOrder);
    } else {
      localStorage.setItem("tracker-monsters", JSON.stringify([]));
      setTurnOrder(newPt);
    }
  }, []);

  const save = () => {
    localStorage.setItem("tracker-party", JSON.stringify(party));
    localStorage.setItem("tracker-monsters", JSON.stringify(monsters));
  };

  const updateTemp = (e, field, idx, isEnemy, id) => {
    const tempArray = turnOrder;
    tempArray[idx] = { ...tempArray[idx], [field]: e };
    setTurnOrder(tempArray);
    if (!isEnemy) {
      let tempParty = party;
      const index = party.findIndex((i) => i._id === id);
      tempParty[index] = { ...tempParty[index], [field]: e };
      setParty(tempParty);
    } else {
      let tempMonsters = monsters;
      const monsterIdx = tempMonsters.findIndex((i) => i._id === id);
      tempMonsters[monsterIdx] = { ...tempMonsters[monsterIdx], [field]: e };
    }
    setCount(count + 1);
    save();
  };

  const handleCondition = (isEnemy, pc) => {
    setConditionDetails({
      type: isEnemy ? "enemy" : "pt",
      id: pc._id,
    });
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
    if (conditionDetails.type === "pt") {
      let tempParty = party;
      const index = party.findIndex((i) => i._id === conditionDetails.id);
      tempParty[index].conditions.push(e);
      setParty(tempParty);
    } else {
      let tempMonsters = monsters;
      const monsterIdx = tempMonsters.findIndex(
        (i) => i._id === conditionDetails.id
      );
      tempMonsters[monsterIdx].conditions.push(e);
    }
    // let tempOrder = turnOrder;
    // const index = tempOrder.findIndex((i) => i._id === conditionDetails.id);
    // tempOrder[index].conditions.push(e);
    // setTurnOrder(tempOrder);
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

  const removeCondition = (e, idx, pc, enemy) => {
    if (enemy) {
      let tempMonsters = monsters;
      const monsterIdx = tempMonsters.findIndex((i) => i._id === pc._id);
      tempMonsters[monsterIdx].conditions.splice(idx, 1);
      setMonsters(tempMonsters);
    } else {
      let tempPt = party;
      const ptIdx = tempPt.findIndex((i) => i._id === pc._id);
      tempPt[ptIdx].conditions.splice(idx, 1);
      setParty(tempPt);
    }
    // let tempOrder = turnOrder;
    // const orderIdx = tempOrder.findIndex((i) => i._id === pc._id);
    // tempOrder[orderIdx].conditions.splice(idx, 1);
    // setTurnOrder(tempOrder);
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
    return dices;
  };

  const handleAddMonster = (e) => {
    let m = {};
    if (e.custom) {
      m.name = e.name;
      m.maxHp = e.hp;
      m.curHp = e.hp;
      m.ac = e.ac;
      m._id = Date.now();
      m.custom = true;
      m.conditions = [];
      m.concentrate = false;
    } else {
      const qtd = monsters.filter((i) => i.name === e.name).length;
      m.name = `${e.name} (${qtd + 1})`;
      m.initiative = 0;
      m.custom = false;
      m.curHp = 0;
      m.ac = e.ac[0].ac ? e.ac[0].ac : e.ac[0];
      m.stats = [
        { name: "Str", value: e.str },
        { name: "Dex", value: e.dex },
        { name: "Con", value: e.con },
        { name: "Int", value: e.int },
        { name: "Wis", value: e.wis },
        { name: "Cha", value: e.cha },
      ];
      m.actions = e.action;
      m.cr = e.cr;
      const hp = calculateHp(e.hp.formula);
      m.maxHp = hp;
      m.curHp = hp;
      m.languages = e.languages;
      m.size = e.size[0];
      m.type = e.type.type ? e.type.type : e.type;
      m.skills = e.skill;
      m.speed = e.speed;
      m.traits = e.trait;
      m.resists = e.resist;
      m.defenses = [
        { name: "Conditions Immunities", entries: e.conditionImmune },
        { name: "Damages Immunities", entries: e.immune },
        { name: "Damage Resistances", entries: e.resist },
      ];
      m.saves = e.save;
      m._id = Date.now();
      m.conditions = [];
      m.concentrate = false;
      e.legendary ? (m.legendary = e.legendary) : <></>;
      e.spellcasting ? (m.spellcasting = e.spellcasting) : <></>;
    }

    let tempOrder = turnOrder;
    tempOrder.push(m);
    setTurnOrder(tempOrder);
    let tempMonsters = monsters;
    monsters.push(m);
    setMonsters(tempMonsters);
    setCount(count + 1);
    save();
  };

  const handleModal = () => {
    setAddModal(!addModal);
  };

  const onKill = (idx, _id) => {
    let tempOrder = turnOrder;
    turnOrder.splice(idx, 1);
    setTurnOrder(tempOrder);
    let tempMonsters = monsters;
    const monsterIdx = tempMonsters.findIndex((i) => i._id === _id);
    tempMonsters.splice(monsterIdx, 1);
    setMonsters(tempMonsters);
    setCount(count + 1);
    save();
  };

  const capitalize = (e) => {
    return e.charAt(0).toUpperCase() + e.slice(1);
  };

  const getDefenses = (pc) => {
    let response = [<br />];

    pc.defenses?.forEach((i) => {
      if (i.entries !== undefined) {
        response.push(<span className="tt-span">{i.name}</span>);
        i.entries.forEach((j) => {
          if (typeof j === "string") {
            response.push(<li className="tt-p">{capitalize(j)}</li>);
          } else if (j.special) {
            response.push(<li className="tt-p">{capitalize(j.special)}</li>);
          } else {
            let temp = "";
            j.resist?.forEach((k) => {
              temp = temp + k + ", ";
            });
            temp = temp + j.note;
            response.push(<li className="tt-p">{capitalize(temp)}</li>);
          }
        });
        response.push(<br />);
      }
    });

    return response;
  };

  const removeThings = (e) => {
    return e.replace(/[@{}]/g, "");
  };

  const removeSelfOnly = (text) => {
    const regex = /\s*\(self only\)$/i;
    return text.replace(regex, "");
  };

  const getActions = (pc) => {
    let response = [<br />];
    pc.actions?.forEach((item, index) => {
      response.push(
        <>
          <span className="tt-span">{item.name}</span>
          {item.entries[1]?.items ? (
            item.entries[1]?.items?.map((j) => {
              return <p className="tt-p">{removeThings(j.entry)}</p>;
            })
          ) : (
            <>
              <p className="tt-p">{removeThings(item.entries[0])}</p>
              <br />
            </>
          )}
        </>
      );
    });
    if (pc.legendary) {
      response.push(<h3>Legendary Actions</h3>);
      pc.legendary.forEach((i) => {
        response.push(
          <>
            <span className="tt-span">{i.name}</span>
            {i.entries.map((j) => {
              return <p className="tt-p">{removeThings(j)}</p>;
            })}
          </>
        );
        response.push(<br />);
      });
    }

    if (pc.spellcasting) {
      response.push(<h3>{capitalize(pc.spellcasting[0].name)}</h3>);
      response.push(
        <p>{capitalize(removeThings(pc.spellcasting[0].headerEntries[0]))}</p>
      );

      if (pc.spellcasting[0].daily) {
        response.push(<span className="tt-span">Daily:</span>);
        response.push(<br />);
        response.push(<br />);
        const keys = Object.keys(pc.spellcasting[0].daily);
        keys.forEach((i) => {
          response.push(<p className="tt-p">{i}/day</p>);
          pc.spellcasting[0].daily[i].forEach((j) => {
            response.push(
              <li>
                <a
                  className="tt-a"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://dnd5e.wikidot.com/spell:${removeSelfOnly(
                    removeThings(j)
                  )}`}
                >
                  {capitalize(removeThings(j))}
                </a>
              </li>
            );
          });
          response.push(<br />);
        });
      }

      if (pc.spellcasting[0].spells) {
        const keys = Object.keys(pc.spellcasting[0].spells);
        keys.forEach((i) => {
          response.push(
            <span className="tt-span">
              Level {i}{" "}
              {pc.spellcasting[0].spells[i].slots &&
                `(${pc.spellcasting[0].spells[i].slots} slots)`}
              :
            </span>
          );
          response.push(<br />);
          let temp = [];
          pc.spellcasting[0].spells[i].spells.forEach((j) => {
            temp.push(
              <a
                className="tt-a"
                target="_blank"
                rel="noreferrer"
                href={`https://dnd5e.wikidot.com/spell:${removeThings(j)}`}
              >
                {capitalize(removeThings(j))}
              </a>
            );
          });
          const joinedTemp = temp.map((item, index) => (
            <Fragment key={index}>
              {index > 0 && ", "} {item}
            </Fragment>
          ));
          response.push(joinedTemp);
          response.push(<br />);
          response.push(<br />);
        });
      }
    }
    return response;
  };

  const getInfos = (pc) => {
    if (pc.custom || pc.inventory) return;
    let response = [];

    response.push(<h3>{pc.name}</h3>);

    response.push(
      <>
        <span className="tt-span">
          CR {pc.cr?.cr ? pc.cr?.cr : pc.cr} {getSize(pc.size)} {pc.type}
        </span>
        <br />
      </>
    );
    response.push(<h3>Stats:</h3>);

    pc.stats?.forEach((i) => {
      response.push(
        <>
          <span className="tt-span">
            {i.name}: {i.value}
          </span>
          <br />
        </>
      );
    });

    if (pc.saves !== undefined) {
      response.push(<h3>Saves:</h3>);
      let keys = Object.keys(pc.saves);

      keys.forEach((i) => {
        response.push(
          <>
            <span>
              {capitalize(i)}: {pc.saves[i]}
            </span>
            <br />
          </>
        );
      });
    }

    response.push(<br />);

    response.push(<span className="tt-span">Speed: </span>);

    let keys = Object.keys(pc.speed);

    keys.forEach((i) => {
      if (i === "canHover") return;
      response.push(
        <p className="tt-p">
          {capitalize(i)}:{" "}
          {pc.speed[i].number
            ? pc.speed[i].number + pc.speed[i].condition
            : pc.speed[i]}
          ft
        </p>
      );
    });

    response.push(<br />);

    if (pc.languages) {
      response.push(<span className="tt-span">Languages:</span>);
      pc.languages.forEach((i) => {
        response.push(<p className="tt-p">{i}</p>);
      });
    }

    response.push(<br />);

    return response;
  };

  const getSize = (size) => {
    switch (size) {
      case "H":
        return "huge";
      case "S":
        return "small";
      case "L":
        return "large";
      case "M":
        return "medium";
      default:
        return size;
    }
  };

  const getTraits = (pc) => {
    let response = [<br />];

    if (!pc.traits) return;
    pc.traits.forEach((i) => {
      response.push(<span className="tt-span">{i.name}</span>);
      i.entries.forEach((j) => {
        if (j.type) {
          j.items.forEach((k) => {
            response.push(
              <p>
                {k.name} {k.entry}
              </p>
            );
          });
        } else {
          response.push(<p>{removeThings(j)}</p>);
        }
      });
    });

    return response;
  };

  return (
    <div className="init-container">
      {addModal && (
        <MonsterModal onClose={handleModal} onAdd={handleAddMonster} />
      )}
      {conditionModal && (
        <ConditionsModal onAdd={addCondition} close={handleConditionModal} />
      )}
      {turnOrder.map((i, idx) => {
        return (
          <RenderParty
            onKill={onKill}
            pc={i}
            key={idx}
            idx={idx}
            updateTemp={updateTemp}
            handleCondition={handleCondition}
            removeCondition={removeCondition}
            getDefenses={getDefenses}
            getActions={getActions}
            getTraits={getTraits}
            getInfos={getInfos}
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
