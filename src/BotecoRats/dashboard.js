import { useEffect, useState } from "react";
import { getUserInfo } from "./functions";
import BotecoSidebar from "./components/sidebar";
import { SidebarProvider } from "./hooks/useSidebar";
import Loader from "../components/loader";
import Calendar from "./components/Calendar";
import { useNavigate } from "react-router-dom";
import AddDrink from "./components/AddDrink";

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
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    setLoading(true);
    const res = await getUserInfo();
    if (res.code !== 200) {
      navigate("/botecorats/login", { replace: true });
      localStorage.removeItem("botecoRatsUser");
      setLoading(false);
      return;
    }
    setUserInfos(res.res);
    setLoading(false);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("botecoRatsUser");
    if (!savedUser) {
      navigate("/botecorats/login", { replace: true });
      return;
    }
    const parsed = JSON.parse(localStorage.getItem("botecoRatsUser"));
    if (parsed?._id) {
      fetchUserInfo();
    } else {
      navigate("/botecorats/login", { replace: true });
    }
  }, []);

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

          <Calendar
            drinks={userInfos.drinks}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
          />

          <AddDrink userInfos={userInfos} setUserInfos={setUserInfos} />
        </>
      )}
    </div>
  );
};

export default BotecoRatsDashboard;
