import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupDetails, joinLeaveGroup } from "./functions";
import Loader from "../components/loader";
import BotecoSidebar from "./components/sidebar";
import { copyToClipboard, formatMongoDate } from "../utils/utils";
import { calculateLiters } from "./drinkList";
import infoIcon from "../assets/icons/info.svg";
import shareIcon from "../assets/icons/share.svg";
import leaveIcon from "../assets/icons/leave.svg";
import joinIcon from "../assets/icons/join.svg";
import Modal from "../components/modal";

const GroupHome = () => {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupDrinks, setGroupDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [infosModalVisible, setInfosModalVisible] = useState(false);

  const userInGroup = groupDetails?.members.find(
    (m) => m._id === JSON.parse(localStorage.getItem("botecoRatsUser"))?._id
  );

  const fetchGroup = async () => {
    setLoading(true);
    const res = await getGroupDetails(groupId);
    setGroupDetails(res.res.group);
    setGroupDrinks(
      res.res.drinks.filter((i) => res.res.group.drinksFilter.includes(i.name))
    );
    setLoading(false);
  };

  const RenderArray = (arr) => {
    return arr.map((i) => {
      return (
        <p>
          • {formatMongoDate(i.created_at)} {i.amount}x {i.name} {i.type} (
          {groupDetails.members.find((m) => m._id === i.userId)?.user})
        </p>
      );
    });
  };

  const filterDrinksFromLastWeek = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return groupDrinks.filter(
      (drink) => new Date(drink.created_at) >= oneWeekAgo
    );
  };

  const filterDrinksFromLastMonth = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const drinksFromLastweek = filterDrinksFromLastWeek();

    return groupDrinks
      .filter((i) => {
        return drinksFromLastweek.indexOf(i) < 0;
      })
      .filter((drink) => new Date(drink.created_at) >= oneMonthAgo);
  };

  const filterDrinksFromOlder = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const drinksFromLastweek = filterDrinksFromLastWeek();
    const drinksFromLastMonth = filterDrinksFromLastMonth();
    return groupDrinks.filter((i) => {
      return (
        drinksFromLastweek.indexOf(i) < 0 && drinksFromLastMonth.indexOf(i) < 0
      );
    });
  };

  const handleJoinLeave = async () => {
    const confirm = window.confirm(
      `Você tem certeza que deseja ${
        userInGroup ? "sair do" : "entrar no"
      } grupo ${groupDetails.name}?`
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

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="boteco-group-home">
          {infosModalVisible && (
            <Modal close={handleInfosModalVisibility}>
              <h1>{groupDetails?.name}</h1>
              <p>Membros: {groupDetails?.members.length}</p>
              <p>Começou em: {formatMongoDate(groupDetails?.groupStartDate)}</p>
              <p>E vai até: {formatMongoDate(groupDetails?.groupEndDate)}</p>
              <p>Bebidas válidas: {groupDetails?.drinksFilter.join(", ")}</p>
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
                  `https://flavioebn.com/botecorats/group/${groupId}`
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

          <div className="members-thumbs-container">
            {groupDetails.members.map((i) => {
              return (
                <img className="member-thumb" src={i.avatarUrl} alt={i.user} />
              );
            })}
          </div>
          <div className="info-cards">
            <div className="card">
              <label>Drinks</label>
              <p>{groupDrinks.length}</p>
            </div>
            <div className="card big">
              <label>Litragem</label>
              <p>{calculateLiters(groupDrinks).liters}</p>
            </div>
            <div className="card">
              <label>Pontuação</label>
              <p>{calculateLiters(groupDrinks).points}</p>
            </div>
          </div>
          <div className="group-history">
            <h2>Última Semana</h2>
            {RenderArray(filterDrinksFromLastWeek())}
            <h2>Último Mês</h2>
            {RenderArray(filterDrinksFromLastMonth())}
            <h2>Mais Antigas</h2>
            {RenderArray(filterDrinksFromOlder())}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupHome;
