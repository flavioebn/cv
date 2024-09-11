import { useEffect, useState } from "react";
import { getFromStorage, PokeURL } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import logoM from "../assets/images/logo-mystic.png";
import logoV from "../assets/images/logo-valor.png";
import logoI from "../assets/images/logo-instinct.png";

const PokeInfos = () => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [newInfo, setNewInfo] = useState({
    friend_code: 0,
    team: "",
  });
  const navigate = useNavigate();

  const getUserInfo = async (id) => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${PokeURL}/poke-codes`, requestOptions);

      // Obtenha o código de status da resposta
      const statusCode = response.status;

      // Verifica se a resposta foi bem-sucedida (status 2xx)
      if (response.ok) {
        const result = await response.json(); // Converte a resposta para JSON
        setUserInfo(result);
        console.log(result);
        setNewInfo({
          team: result.team,
          friend_code: result.friend_code,
        });
      } else {
        console.error(`Erro: Código da resposta ${statusCode}`);
        const errorResult = await response.json(); // Converte a resposta de erro para JSON
        console.error("Mensagem de erro:", errorResult.message); // Acessa a propriedade "message" do JSON de erro, se existir
      }
    } catch (error) {
      console.error("Erro ao fazer a requisição:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const id = getFromStorage("poke-login-id");
    if (id === null || id === "") {
      navigate("/pokelogin");
    } else {
      getUserInfo(id);
    }
  }, [navigate]);

  const editInfo = (e) => {
    const { name, value } = e.target;

    setNewInfo(
      ...(prev) => {
        return {
          ...prev,
          [name]: value,
        };
      }
    );
  };

  const submitChanges = async (e) => {
    e.preventDefault();
  };

  const setTeam = (e) => {
    const { name } = e.target;
    setNewInfo((prev) => {
      return {
        ...prev,
        team: name,
      };
    });
  };

  return (
    <div className="poke-container-login dash">
      {loading && <Loader />}
      <h1>{userInfo.ign}</h1>
      <h2>{userInfo.email}</h2>
      <form>
        <label>Código de amizade: </label>
        <input
          name="friend_code"
          onChange={editInfo}
          value={newInfo.friend_code}
        />
        <label>Time:</label>
        <div className="logos">
          <img
            className={newInfo.team === "mystic" ? "active" : undefined}
            src={logoM}
            alt="logo-m"
            name="mystic"
            onClick={setTeam}
          />
          <img
            className={newInfo.team === "instinct" ? "active" : undefined}
            src={logoI}
            alt="logo-i"
            name="instinct"
            onClick={setTeam}
          />
          <img
            className={newInfo.team === "valor" ? "active" : undefined}
            src={logoV}
            alt="logo-v"
            name="valor"
            onClick={setTeam}
          />
        </div>
        <button type="submit" onClick={submitChanges}>
          Atualizar
        </button>
      </form>
    </div>
  );
};

export default PokeInfos;
