import { useEffect, useState } from "react";
import { getFromStorage, PokeURL } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";

const PokeDash = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

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
  }, []);

  const handleClick = (e) => {
    console.log(e);
    navigator.clipboard.writeText(e);
  };

  return (
    <div className="poke-container-login dash">
      {loading && <Loader />}
      <h1>{userInfo.ign}</h1>
      <h2>{userInfo.email}</h2>
      <h3>Códigos (Clica pra copiar): </h3>
      <div className="codes">
        {userInfo?.codes?.map((i) => {
          return (
            <div onClick={() => handleClick(i.code)} className="code-container">
              <span className="event">{i.event}</span>
              <span className="code">{i.code}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokeDash;
