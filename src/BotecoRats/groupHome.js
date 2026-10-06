import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getGroupDetails,
  joinLeaveGroup,
  updateBotecoGroup,
} from "./functions";
import Loader from "../components/loader";
import BotecoSidebar from "./components/sidebar";
import { copyToClipboard } from "../utils/utils";
import { calculateLiters, drinkList, points } from "./drinkList";
import infoIcon from "../assets/icons/info.svg";
import shareIcon from "../assets/icons/share.svg";
import leaveIcon from "../assets/icons/leave.svg";
import joinIcon from "../assets/icons/join.svg";
import cogIcon from "../assets/icons/cog.svg";
import Modal from "../components/modal";
import Calendar from "./components/Calendar";

const GroupHome = () => {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupDrinks, setGroupDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [infosModalVisible, setInfosModalVisible] = useState(false);
  const [membersModal, setMembersModal] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [groupEditInfos, setGroupEditInfos] = useState(null);
  const [groupEditNoEndDate, setGroupEditNoEndDate] = useState(false);
  const user = JSON.parse(localStorage.getItem("botecoRatsUser"));

  let drinksByMember = groupDetails?.members?.map((i) => {
    const memberDrinks = groupDrinks.filter((drink) => drink.userId === i._id);
    const totalLiters = calculateLiters(memberDrinks).liters;
    const totalPoints = calculateLiters(memberDrinks).points;
    const totalAmount = memberDrinks.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0,
    );
    return {
      ...i,
      drinks: memberDrinks,
      totalLiters,
      totalPoints,
      totalAmount,
    };
  });

  drinksByMember?.sort(
    (a, b) => b[groupDetails.goalType] - a[groupDetails.goalType],
  );

  const userInGroup = groupDetails?.members.find(
    (m) => m._id === JSON.parse(localStorage.getItem("botecoRatsUser"))?._id,
  );

  const fetchGroup = async () => {
    setLoading(true);
    const res = await getGroupDetails(groupId);
    setGroupDetails(res.res.group);
    setGroupEditInfos({
      ...res.res.group,
      groupStartDate: res.res.group.groupStartDate.slice(0, 10) || "",
      groupEndDate: res.res.group.groupEndDate?.slice(0, 10) || null,
    });
    if (res.res.group.groupEndDate === null) setGroupEditNoEndDate(true);
    const { drinks: resDrinks } = res.res;
    const { group: resGroup } = res.res;
    const { drinksFilter } = resGroup;
    const allowedDrinks = resDrinks.filter((i) => {
      return drinksFilter.some(
        (j) => j.name === i.name && j.types.includes(i.type),
      );
    });
    const onDateDrinks = allowedDrinks.filter((i) => {
      const drinkDate = new Date(i.date);
      const groupStartDate = new Date(res.res.group.groupStartDate);
      if (!res.res.group.groupEndDate) return drinkDate >= groupStartDate;
      const groupEndDate = new Date(res.res.group.groupEndDate).setDate(
        new Date(res.res.group.groupEndDate).getDate() + 1,
      );
      return drinkDate >= groupStartDate && drinkDate <= groupEndDate;
    });
    if (res.res.group.weekendOnly) {
      const weekendDrinks = onDateDrinks.filter((i) => {
        const drinkDate = new Date(i.date);
        return (
          drinkDate.getDay() === 0 ||
          drinkDate.getDay() === 6 ||
          drinkDate.getDay() === 5
        );
      });
      setGroupDrinks(weekendDrinks);
    } else {
      setGroupDrinks(onDateDrinks);
    }
    setLoading(false);
  };

  const handleJoinLeave = async () => {
    const confirm = window.confirm(
      `Você tem certeza que deseja ${
        userInGroup ? "sair do" : "entrar no"
      } grupo ${groupDetails.name}?`,
    );
    const action = userInGroup ? "leave" : "join";
    if (confirm) {
      setLoading(true);
      await joinLeaveGroup({ groupId, action });
      await fetchGroup();
    }
    setLoading(false);
  };

  const handleInfosModalVisibility = () => {
    setInfosModalVisible(!infosModalVisible);
  };

  useEffect(() => {
    if (groupId) {
      fetchGroup();
    }
  }, [groupId]);

  const handleMembersModal = () => {
    setMembersModal(!membersModal);
  };

  const getAllowedDrinksText = (drinksFilter) => {
    if (
      JSON.stringify(drinksFilter.flatMap((i) => i.types).sort()) ===
      JSON.stringify(drinkList.flatMap((i) => i.types).sort())
    ) {
      return "Todas";
    }
    if (!drinksFilter || drinksFilter.length === 0) return "Todas";
    return drinksFilter
      .map((i) => `${i.name} (${i.types.join(", ")})`)
      .join("; ");
  };

  const goalNames = {
    totalLiters: "Litragem total",
    totalPoints: "Pontos totais",
    totalAmount: "Quantidade total",
  };

  const getTotals = (drinks) => {
    const map = {};
    drinks.forEach((d) => {
      const name = d.name;
      const type = d.type;
      const amount = Number(d.amount) || 0;
      const key = `${name}||${type}`;
      if (!map[key]) {
        map[key] = { name, type, totalAmount: 0 };
      }
      map[key].totalAmount += amount;
      map[key].totalLiters = calculateLiters([d]).liters;
      map[key].totalPoints = calculateLiters([d]).points;
    });
    const res = Object.values(map).sort(
      (a, b) => b[groupDetails.goalType] - a[groupDetails.goalType],
    );
    return res;
  };

  const getPersonalGoalSums = (drinks) => {
    if (groupDetails.goalType === "totalLiters") {
      return `${drinks.totalLiters * drinks.totalAmount}L`;
    } else if (groupDetails.goalType === "totalPoints") {
      return `${points[drinks.name][drinks.type] * drinks.totalAmount} pontos`;
    } else {
      return ``;
    }
  };

  const RenderMemberRow = ({ member, idx }) => {
    const [open, setOpen] = useState(false);
    return (
      <div
        key={member.userId}
        className={`member-row ${open ? "open" : "closed"} bronze rank-${idx + 1}`}
        onClick={() => setOpen(!open)}
      >
        <img
          className="member-thumb"
          src={member.avatarUrl}
          alt={member.user}
        />
        <div className="member-infos">
          <span>
            {idx + 1}. {member.user}
          </span>
          <p>
            {goalNames[groupDetails.goalType]}: {member[groupDetails.goalType]}
          </p>
          <div>
            {getTotals(
              groupDrinks.filter((drink) => drink.userId === member._id),
            ).map((i) => {
              return (
                <p key={`${i.name}-${i.type}`}>
                  {i.totalAmount}x {i.name} ({i.type}) -{" "}
                  {getPersonalGoalSums(i)}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const RenderUserSubHeader = ({ user }) => {
    if (groupDetails.goalType === "totalLiters") {
      return calculateLiters(
        groupDrinks.filter((drink) => drink.userId === user._id),
      ).liters;
    } else if (groupDetails.goalType === "totalPoints") {
      return calculateLiters(
        groupDrinks.filter((drink) => drink.userId === user._id),
      ).points;
    } else {
      return groupDrinks
        .filter((drink) => drink.userId === user._id)
        .reduce((a, b) => a + Number(b.amount), 0);
    }
  };

  const ModalMemberCard = ({ member }) => {
    const [open, setOpen] = useState(false);
    return (
      <div
        className={`member-card ${open ? "open" : "closed"}`}
        onClick={() => setOpen(!open)}
      >
        <img
          className="member-thumb"
          src={member.avatarUrl}
          alt={member.user}
        />
        <div className="member-infos">
          <div className="member-header">
            <span>{member.user}</span>
            <p>
              {goalNames[groupDetails.goalType].split(" ")[0]}:{" "}
              {<RenderUserSubHeader user={member} />}
            </p>
          </div>
          <div className="drinks-container">
            {getTotals(
              groupDrinks.filter((drink) => drink.userId === member._id),
            ).map((i) => {
              return (
                <p className="drink-row" key={`${i.name}-${i.type}`}>
                  {i.totalAmount}x {i.name} ({i.type}) -{" "}
                  {getPersonalGoalSums(i)}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const getCurrentGoal = () => {
    if (groupDetails.goalType === "totalLiters") {
      return calculateLiters(groupDrinks).liters;
    } else if (groupDetails.goalType === "totalPoints") {
      return calculateLiters(groupDrinks).points;
    } else {
      return groupDrinks.reduce((a, b) => a + Number(b.amount), 0);
    }
  };

  const handleEditModalVisibility = () => {
    setEditModalVisible(!editModalVisible);
  };

  const handleCheckCount = (item) => {
    if (!groupEditInfos.drinksFilter.some((i) => i.name === item)) {
      setGroupEditInfos({
        ...groupEditInfos,
        drinksFilter: [
          ...groupEditInfos.drinksFilter,
          { name: item, types: drinkList.find((i) => i.name === item).types },
        ],
      });
    } else {
      setGroupEditInfos({
        ...groupEditInfos,
        drinksFilter: groupEditInfos.drinksFilter.filter(
          (i) => i.name !== item,
        ),
      });
    }
  };

  const handleTypeCount = (drinkName, typeName) => {
    const drinkIndex = groupEditInfos.drinksFilter.findIndex(
      (i) => i.name === drinkName,
    );
    if (drinkIndex === -1) return;
    const typeIndex =
      groupEditInfos.drinksFilter[drinkIndex].types.indexOf(typeName);
    let newTypes = [...groupEditInfos.drinksFilter[drinkIndex].types];
    if (typeIndex === -1) {
      newTypes.push(typeName);
    } else {
      newTypes.splice(typeIndex, 1);
    }
    const newDrinksFilter = [...groupEditInfos.drinksFilter];
    newDrinksFilter[drinkIndex].types = newTypes;
    setGroupEditInfos({ ...groupEditInfos, drinksFilter: newDrinksFilter });
  };

  const handleUpdateGroup = async () => {
    setLoading(true);
    const newGroupEndDate = groupEditNoEndDate
      ? null
      : groupEditInfos.groupEndDate;
    const groupEditInfosFinal = {
      ...groupEditInfos,
      groupEndDate: newGroupEndDate,
    };
    const response = await updateBotecoGroup(groupEditInfosFinal);
    setLoading(false);
    if (response.code !== 200) {
      alert("Erro ao atualizar grupo");
    } else {
      alert("Grupo atualizado com sucesso!");
      window.location.reload();
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="boteco-group-home">
          {infosModalVisible && (
            <Modal close={handleInfosModalVisibility} classes={"boteco"}>
              <h1>{groupDetails?.name}</h1>
              <div className="group-infos">
                <div className="group-info-row">
                  <p className="bold">Membros: </p>
                  <p>{groupDetails?.members.length}</p>
                </div>
                <div className="group-info-row">
                  <p className="bold">Começou em: </p>
                  <p>
                    {groupDetails?.groupStartDate
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </p>
                </div>

                {groupDetails?.groupEndDate && (
                  <div className="group-info-row">
                    <p className="bold"> E vai até: </p>
                    <p>
                      {groupDetails?.groupEndDate
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("/")}
                    </p>
                  </div>
                )}
                <div className="group-info-row">
                  <p className="bold">Grupo: </p>
                  <p>
                    {groupDetails?.type === "goal"
                      ? "Cooperativo"
                      : "Competitivo"}
                  </p>
                </div>
                {groupDetails?.weekendOnly && (
                  <div className="group-info-row">
                    <p className="bold">
                      Contabilizado só bebidas de sexta a domingo
                    </p>
                  </div>
                )}
              </div>
              <div className="group-info-row" style={{ textAlign: "center" }}>
                <p style={{ marginBottom: "4px" }} className="bold">
                  Bebidas válidas:
                </p>
                <p style={{ marginTop: "0px" }}>
                  {getAllowedDrinksText(groupDetails?.drinksFilter)}
                </p>
              </div>
            </Modal>
          )}
          {membersModal && (
            <Modal close={handleMembersModal} classes={"boteco"}>
              <h1>Membros</h1>
              <div className="members-container">
                {groupDetails?.members.map((i) => {
                  return <ModalMemberCard member={i} key={i._id} />;
                })}
              </div>
            </Modal>
          )}
          {editModalVisible && (
            <Modal
              close={handleEditModalVisibility}
              classes={"boteco edit-group-modal"}
            >
              <h1>Editar Grupo</h1>
              <label>Nome</label>
              <input
                type="text"
                value={groupEditInfos?.name || ""}
                onChange={(e) =>
                  setGroupEditInfos({
                    ...groupEditInfos,
                    name: e.target.value,
                  })
                }
              />
              <p style={{ marginTop: "0px" }}>Período do grupo</p>
              <div style={{ display: "flex", gap: "4px" }}>
                <input
                  type="date"
                  value={groupEditInfos.groupStartDate}
                  onChange={(e) =>
                    setGroupEditInfos({
                      ...groupEditInfos,
                      groupStartDate: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  disabled={groupEditNoEndDate}
                  value={groupEditInfos.groupEndDate}
                  onChange={(e) =>
                    setGroupEditInfos({
                      ...groupEditInfos,
                      groupEndDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="weekendCheck" style={{ marginTop: "8px" }}>
                <input
                  type="checkbox"
                  checked={groupEditNoEndDate}
                  onChange={(e) => setGroupEditNoEndDate(e.target.checked)}
                />
                <p>Grupo sem data de fim</p>
              </div>
              <div className="weekendCheck">
                <input
                  type="checkbox"
                  checked={groupEditInfos.weekendOnly}
                  onChange={(e) =>
                    setGroupEditInfos({
                      ...groupEditInfos,
                      weekendOnly: e.target.checked,
                    })
                  }
                />
                <p>Contabilizar apenas finais de semana</p>
              </div>
              <p style={{ fontSize: "16px", marginTop: "12px" }}>
                Esse é um grupo:
              </p>
              <select
                value={groupEditInfos.type}
                style={{ marginBottom: "0px" }}
                onChange={(e) =>
                  setGroupEditInfos({ ...groupEditInfos, type: e.target.value })
                }
              >
                <option value="goal">Cooperativo (Com uma meta)</option>
                <option value="competitive">
                  Competitivo (Quem bebe mais)
                </option>
              </select>
              <p style={{ marginTop: "8px" }}>
                {groupEditInfos.type === "goal" ? "Meta de:" : "Competir por:"}
              </p>
              <div style={{ width: "100%", display: "flex", gap: "4px" }}>
                {groupEditInfos.type === "goal" && (
                  <input
                    style={{ width: "20%" }}
                    type="number"
                    value={groupEditInfos.goalValue}
                    placeholder="Qtd"
                    onChange={(e) =>
                      setGroupEditInfos({
                        ...groupEditInfos,
                        goalValue: e.target.value,
                      })
                    }
                  />
                )}
                <select
                  value={groupEditInfos.goalType}
                  style={{
                    width: groupEditInfos.type === "goal" ? "60%" : "90%",
                  }}
                  onChange={(e) =>
                    setGroupEditInfos({
                      ...groupEditInfos,
                      goalType: e.target.value,
                    })
                  }
                >
                  <option value="totalLiters">Litros</option>
                  <option value="totalPoints">Pontos</option>
                  <option value="totalAmount">Quantidade</option>
                </select>
              </div>
              <p>Permitido nesse grupo:</p>
              <div className="group-count-allowed">
                {drinkList.map((i) => {
                  return (
                    <>
                      <div
                        key={i.name}
                        onClick={() => handleCheckCount(i.name)}
                      >
                        <div>
                          <input
                            checked={groupEditInfos.drinksFilter.some(
                              (drink) => drink.name === i.name,
                            )}
                            type="checkbox"
                          />
                          <label>{i.name}</label>
                        </div>
                        {groupEditInfos.drinksFilter.some(
                          (drink) => drink.name === i.name,
                        ) && (
                          <div className="types">
                            {drinkList
                              .find((drink) => drink.name === i.name)
                              .types.map((j) => {
                                return (
                                  <div>
                                    <input
                                      type="checkbox"
                                      onChange={() =>
                                        handleTypeCount(i.name, j)
                                      }
                                      checked={groupEditInfos.drinksFilter
                                        .find((drink) => drink.name === i.name)
                                        .types.includes(j)}
                                    />
                                    <label>{j}</label>
                                  </div>
                                );
                              })}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="finish-buttons" style={{ width: "100%" }}>
                <button onClick={handleUpdateGroup}>Enviar</button>
              </div>
            </Modal>
          )}
          <div className="group-header">
            <h2>{groupDetails?.name}</h2>
            <img src={groupDetails?.avatarUrl} alt={groupDetails?.name} />
          </div>

          <BotecoSidebar />
          <div className="group-actions">
            <button onClick={handleJoinLeave}>
              <img
                src={userInGroup ? leaveIcon : joinIcon}
                alt="leave/joinIcon"
              />
            </button>
            <button
              onClick={() => {
                copyToClipboard(
                  `https://flavioebn.com/botecorats/group/${groupId}`,
                );
                alert("Link do grupo copiado para a área de transferência!");
              }}
            >
              <img src={shareIcon} alt="shareIcon" />
            </button>
            <button onClick={handleInfosModalVisibility}>
              <img src={infoIcon} alt="infoIcon" />
            </button>
            {user?._id === groupDetails?.owner._id && (
              <button onClick={handleEditModalVisibility}>
                <img src={cogIcon} alt="cogIcon" />
              </button>
            )}
          </div>

          {groupDetails.type === "goal" ? (
            <>
              <div
                className="members-thumbs-container"
                onClick={handleMembersModal}
              >
                {groupDetails.members.map((i) => {
                  return (
                    <img
                      className="member-thumb"
                      src={i.avatarUrl}
                      alt={i.user}
                      key={i._id}
                    />
                  );
                })}
              </div>
              <div
                className="info-cards"
                style={{ gridTemplateColumns: "1fr", width: "70vw" }}
              >
                <div className="card big">
                  <label>Meta ({goalNames[groupDetails.goalType]}): </label>
                  <p>
                    {getCurrentGoal()} / {groupDetails.goalValue}
                  </p>
                </div>
              </div>
              <Calendar
                infoCards={false}
                userInfos={null}
                setUserInfos={null}
                drinks={groupDrinks.map((i) => ({
                  ...i,
                  user: groupDetails.members.find((m) => m._id === i.userId)
                    ?.user,
                }))}
                allowEdit={false}
              />
            </>
          ) : (
            <div className="group-competitive-container">
              {drinksByMember.length > 0 && (
                <div>
                  {drinksByMember.map((member, idx) => {
                    return <RenderMemberRow member={member} idx={idx} />;
                  })}
                </div>
              )}
            </div>
          )}
          {/* <div className="group-history">
            <h2>Última Semana</h2>
            {RenderArray(filterDrinksFromLastWeek())}
            <h2>Último Mês</h2>
            {RenderArray(filterDrinksFromLastMonth())}
            <h2>Mais Antigas</h2>
            {RenderArray(filterDrinksFromOlder())}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default GroupHome;
