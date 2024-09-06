import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { getFromStorage, PokeURL, setStorage } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const PokeLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("login");
  const [info, setInfo] = useState({
    email: "",
    password: "",
    ign: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const id = getFromStorage("poke-login-id");
    if (id === null || id === "") {
      navigate("/pokelogin");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (active === "login") delete info.ign;

    const raw = JSON.stringify({
      ...info,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const link = active === "login" ? "/poke-login" : "/poke-register";

    try {
      const response = await fetch(`${PokeURL}${link}`, requestOptions);

      if (response.ok) {
        const result = await response.json();
        if (active === "login") {
          setStorage("poke-login-id", result.user._id);
          navigate("/pokedash");
        } else {
          try {
            const login = await fetch(`${PokeURL}/poke-login`, requestOptions);
            if (login.ok) {
              const res = await login.json();
              setStorage("poke-login-id", res.user._id);
              navigate("/pokedash");
            }
          } catch (error) {
            console.error("Erro ao fazer a requisição:", error);
          }
        }
      } else {
        const errorResult = await response.json();
        setError(errorResult.msg);
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="poke-container-login">
      {loading && <Loader />}
      <div className="options">
        <h2
          className={active === "login" ? "active" : ""}
          onClick={() => setActive("login")}
        >
          Login
        </h2>
        <h2
          className={active !== "login" ? "active" : ""}
          onClick={() => setActive("register")}
        >
          Cadastro
        </h2>
      </div>
      <form onSubmit={handleLogin}>
        <label>E-mail</label>
        <input name="email" onChange={handleChange} value={info.email} />
        <label>Senha</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={info.password}
        />
        {active === "register" && (
          <>
            <label>Nick no PokeGO</label>
            <input name="ign" onChange={handleChange} value={info.ign} />
          </>
        )}
        {error !== "" && <span className="error-msg">{error}</span>}
        <button>{active === "login" ? "Entrar" : "Cadastrar"}</button>
      </form>
    </div>
  );
};

export default PokeLogin;
