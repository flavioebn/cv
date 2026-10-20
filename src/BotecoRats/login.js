import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginBotecoUser } from "./functions";
import { getFromStorage } from "../utils/utils";
import botecoRatsLogo from "../assets/images/botecoRatsLogo.png";
import Loader from "../components/loader";

const BotecoRatsLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const res = await loginBotecoUser(form);

    if (res?.code === 200) {
      localStorage.setItem("botecoRatsUser", JSON.stringify(res.res.user));
      setLoading(false);

      navigate("/botecorats/home", { replace: true });
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      {loading && <Loader />}
      <div className="header">
        <div className="logo" style={{ cursor: "pointer" }}>
          <img className="img" src={botecoRatsLogo} alt="group" />
        </div>
        {/* <h2>
          Welcome to <strong>Boteco Rats</strong>
        </h2> */}
      </div>
      <div className="login-form">
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
    </div>
  );
};

export default BotecoRatsLogin;
