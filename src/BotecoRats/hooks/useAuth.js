import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("botecoRatsUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (!storedUser) {
      navigate("/botecorats/login", { replace: true });
    } else {
      setUser(JSON.parse(storedUser));
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
  };
}
