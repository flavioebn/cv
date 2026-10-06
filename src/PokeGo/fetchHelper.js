import { PokeURL } from "../utils/utils";

const fetchHelper = async ({ body, url }) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(body);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${PokeURL}/${url}`, requestOptions);

    // Obtenha o código de status da resposta
    const statusCode = response.status;

    // Verifica se a resposta foi bem-sucedida (status 2xx)
    if (response.ok) {
      const result = await response.json(); // Converte a resposta para JSON
      return result;
    } else {
      console.error(`Erro: Código da resposta ${statusCode}`);
      const errorResult = await response.json(); // Converte a resposta de erro para JSON
      console.error("Mensagem de erro:", errorResult.message); // Acessa a propriedade "message" do JSON de erro, se existir
      return errorResult;
    }
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
    return error;
  }
};

export default fetchHelper;
