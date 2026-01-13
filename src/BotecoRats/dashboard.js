import { useEffect, useState } from "react";
import { addPersonalDrink, getUserInfo } from "./functions";
import { drinkList } from "./drinkList";
import BotecoSidebar from "./components/sidebar";
import { SidebarProvider } from "./hooks/useSidebar";
import Loader from "../components/loader";
import Calendar from "./components/Calendar";

const BotecoRatsDashboard = () => {
  return (
    <SidebarProvider>
      <BotecoRatsDashboardContent />
    </SidebarProvider>
  );
};

const BotecoRatsDashboardContent = () => {
  const [loading, setLoading] = useState(true);
  const [userInfos, setUserInfos] = useState(null);
  const [drinkToAdd, setDrinkToAdd] = useState(drinkList[0].name);
  const [typeToAdd, setTypeToAdd] = useState(drinkList[0].types[0]);

  const fetchUserInfo = async () => {
    setLoading(true);
    const res = await getUserInfo();
    setUserInfos(res.res);
    console.log(res);
    setLoading(false);
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("botecoRatsUser"));
    if (savedUser?._id) {
      fetchUserInfo();
    }
  }, []);

  const handleSendDrink = async () => {
    const res = await addPersonalDrink({
      userId: userInfos.user._id,
      name: drinkToAdd,
      type: typeToAdd,
      amount: 1,
    });
    console.log(res);
  };

  return (
    <div className="boteco-home">
      {loading ? (
        <Loader />
      ) : (
        <>
          <BotecoSidebar />
          <div className="user-header">
            <h2>{userInfos.user.user}</h2>
            <img
              className="user-image"
              src={userInfos.user.avatarUrl}
              alt="Profile"
            />
          </div>

          <Calendar drinks={userInfos.drinks} />
          <div className="quick-add">
            <h3>Quick add</h3>
            <div>
              <select onChange={(e) => setDrinkToAdd(e.target.value)}>
                {drinkList.map((i) => {
                  return <option value={i.name}>{i.name}</option>;
                })}
              </select>
              <select onChange={(e) => setTypeToAdd(e.target.value)}>
                {drinkList
                  .find((i) => i.name === drinkToAdd)
                  .types.map((i) => {
                    return <option value={i}>{i}</option>;
                  })}
              </select>
            </div>
            <button onClick={handleSendDrink}>Adicionar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BotecoRatsDashboard;
