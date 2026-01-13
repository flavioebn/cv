import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginBotecoUser } from "./functions";
import { getFromStorage } from "../utils/utils";
import groupPlaceholderIcon from "../assets/icons/edit.svg";

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

      navigate("/botecorats/home", { replace: true });
    }
  };

  return (
    <div className="login-container">
      <div className="logo" style={{ cursor: "pointer" }}>
        <img className="img" src={groupPlaceholderIcon} alt="group" />
      </div>

      <input
        type="text"
        placeholder="Usuário"
        value={form.user}
        onChange={(e) => setForm({ ...form, user: e.target.value })}
      />
      <input
        type="password"
        placeholder="Senha"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin(e);
          }
        }}
      />
      <button disabled={!form.user || !form.password} onClick={handleLogin}>
        Login
      </button>
      <p
        className="register-link"
        onClick={() => navigate("/botecorats/register")}
      >
        Register
      </p>
    </div>
  );
};

export default BotecoRatsLogin;
