import { useEffect, useState } from "react";
import { getMyGroups } from "./functions";
import { useNavigate } from "react-router-dom";
import BotecoSidebar from "./components/sidebar";
import Loader from "../components/loader";

const BotecoUserGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyGroups = async () => {
    setLoading(true);
    const res = await getMyGroups();
    setGroups(res.res.groups);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyGroups();
  }, []);

  const navigateToGroup = (groupId) => {
    navigate(`/botecorats/group/${groupId}`);
  };

  return (
    <div className="boteco-groups">
      <BotecoSidebar />
      <h2>Meus Grupos</h2>
      {loading && <Loader />}

      {groups.length === 0 ? (
        <p>Você ainda não participa de nenhum grupo</p>
      ) : (
        <div className="groups-container">
          {groups.map((group) => (
            <div
              className="group-card"
              key={group._id}
              onClick={() => navigateToGroup(group._id)}
            >
              <img src={group.avatarUrl} alt={group.name} />
              <div>
                <h3>{group.name}</h3>
                <span>{group.members.length} membros</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BotecoUserGroups;
