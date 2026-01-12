import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupDetails } from "./functions";
import Loader from "../components/loader";

const GroupHome = () => {
  const { groupId } = useParams();
  const [groupDetails, setGroupDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchGroup = async () => {
    setLoading(true);
    const res = await getGroupDetails(groupId);
    console.log(res);
    setGroupDetails(res.res.group);
    setLoading(false);
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
        <>
          <h1>{groupDetails?.name}</h1>
          <img src={groupDetails?.avatarUrl} alt={groupDetails?.name} />
          <h2>Membros ({groupDetails?.members.length}):</h2>
          {groupDetails.members.map((i) => {
            return (
              <div>
                <p>{i.user} </p>
                <img src={i.avatarUrl} alt={i.user} width="50" />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default GroupHome;
