import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupDetails, joinLeaveGroup } from "./functions";
import Loader from "../components/loader";
import BotecoSidebar from "./components/sidebar";
import { copyToClipboard } from "../utils/utils";
import { calculateLiters, drinkList, points } from "./drinkList";
import infoIcon from "../assets/icons/info.svg";
import shareIcon from "../assets/icons/share.svg";
import leaveIcon from "../assets/icons/leave.svg";
import joinIcon from "../assets/icons/join.svg";
import Modal from "../components/modal";
import Calendar from "./components/Calendar";

const GroupHome = () => {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupDrinks, setGroupDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [infosModalVisible, setInfosModalVisible] = useState(false);
  const [membersModal, setMembersModal] = useState(false);

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
