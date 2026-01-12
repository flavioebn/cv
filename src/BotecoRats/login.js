import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginBotecoUser } from "./functions";
import { getFromStorage, setStorage } from "../utils/utils";

const BotecoRatsLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    user: "",
    password: "",
  });

  useEffect(() => {
    const storedUser = getFromStorage("botecoRatsUser");
    if (storedUser) {
      navigate("/botecorats/home", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await loginBotecoUser(form);

    if (res?.code === 200) {
      localStorage.setItem("botecoRatsUser", JSON.stringify(res.res.user));
      localStorage.setItem("botecoRatsDrinks", JSON.stringify(res.res.drinks));

      navigate("/botecorats/home", { replace: true });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Usuário"
        value={form.user}
        onChange={(e) => setForm({ ...form, user: e.target.value })}
      />

      <br />

      <input
        type="password"
        placeholder="Senha"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default BotecoRatsLogin;
