import { useEffect, useState } from "react";
import { addPersonalDrink, getUserInfo } from "./functions";
import { drinkList } from "./drinkList";
import BotecoSidebar from "./components/sidebar";
import { SidebarProvider } from "./hooks/useSidebar";
import Loader from "../components/loader";
import Calendar from "./components/Calendar";
import { useNavigate } from "react-router-dom";

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
  const [drinkToAdd, setDrinkToAdd] = useState("");
  const [typeToAdd, setTypeToAdd] = useState("");
  const [amountToAdd, setAmountToAdd] = useState(1);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    setLoading(true);
    const res = await getUserInfo();
    setUserInfos(res.res);
    console.log(res);
    setLoading(false);
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("botecoRatsUser"));
    setDrinkToAdd(drinkList[0].name);
    setTypeToAdd(drinkList[0].types[0]);
    if (savedUser?._id) {
      fetchUserInfo();
    } else {
      navigate("/botecorats/login", { replace: true });
    }
  }, []);

  const handleSendDrink = async () => {
    setLoading(true);
    const res = await addPersonalDrink({
      userId: userInfos.user._id,
      name: drinkToAdd,
      type: typeToAdd,
      amount: amountToAdd,
    });
    if (res.code === 201) {
      setUserInfos({
        ...userInfos,
        drinks: [...userInfos.drinks, res.res.drink],
      });
    }
    setLoading(false);
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
              {/* <input
                type="number"
                min={1}
                value={amountToAdd}
                onChange={(e) => setAmountToAdd(e.target.value)}
              /> */}
              <select
                value={amountToAdd}
                onChange={(e) => setAmountToAdd(e.target.value)}
              >
                {[...Array(parseInt(30)).keys()].map((i) => {
                  return <option value={i + 1}>{i + 1}</option>;
                })}
              </select>
              <select
                onChange={(e) => {
                  setDrinkToAdd(e.target.value);
                  setTypeToAdd(
                    drinkList.find((i) => i.name === e.target.value).types[0]
                  );
                }}
                value={drinkToAdd}
              >
                {drinkList.map((i) => {
                  return <option value={i.name}>{i.name}</option>;
                })}
              </select>
              <select
                onChange={(e) => setTypeToAdd(e.target.value)}
                value={typeToAdd}
              >
                {drinkList
                  .find((i) => i.name === drinkToAdd)
                  ?.types.map((i) => {
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
