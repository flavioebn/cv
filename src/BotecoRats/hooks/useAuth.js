import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFromStorage } from "../../utils/utils";

export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [drinks, setDrinks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getFromStorage("botecoRatsUser");
    const storedDrinks = getFromStorage("botecoRatsDrinks");

    if (!storedUser) {
      navigate("/botecorats/login", { replace: true });
    } else {
      setUser(storedUser);
      setDrinks(storedDrinks);
    }

    setLoading(false);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("botecoRatsUser");
    navigate("/botecorats/login", { replace: true });
  };

  return {
    user,
    loading,
    logout,
    drinks,
  };
}
