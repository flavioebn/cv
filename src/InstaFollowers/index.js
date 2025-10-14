import { useState } from "react";
import { getFollowersText } from "./toCopy";

const InstaFollowers = () => {
  const [username, setUsername] = useState("");
  const [checkInfo, setCheckInfo] = useState({
    followers: [],
    followings: [],
    dontFollowMeBack: [],
    iDontFollowBack: [],
  });
  const [instaOpen, setInstaOpen] = useState(false);

  const handleJson = (json) => {
    setCheckInfo(json.CLICA_COM_O_DA_DIREITA_AQUI);
  };

  const checkPasted = (e) => {
    const text = e.target.value;
    if (text.length < 4) return;
    try {
      JSON.parse(text);
      handleJson(JSON.parse(text));
    } catch (e) {
      alert("Isso não é um JSON válido, fez cagada");
    }
  };

  const handleOpenInsta = async () => {
    await navigator.clipboard.writeText(getFollowersText(username));
    window.alert(
      "Nessa janela do Insta aperta Ctrl + Shift + J pra abrir o console, cola nele o código que já ta no teu Ctrl + V, e aperta Enter. \n\n SE NÃO ESTIVER LOGADO NÃO VAI FUNCIONAR \n\n Obs: Se der um erro com [Violation], pode ignorar. \n Obs2: Se aparecer um Warning (texto amarelo), só digita 'allow pasting' antes de colar o código"
    );
    setInstaOpen(true);
    window.open(
      `https://www.instagram.com/${username}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="insta-check">
      <h1>InstaCheck</h1>
      <p className="disclaimer">
        Eu não testei isso em nada que não é chrome nem windows
      </p>
      <div className="instructions">
        <div>
          <label>1.</label>
          <input
            value={username}
            placeholder="Teu user do insta (sem a @)"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className={username.trim() === "" ? "inactive" : ""}>2.</label>
          <button disabled={username.trim() === ""} onClick={handleOpenInsta}>
            Clica pra pegar o código e abrir teu perfil
          </button>
        </div>
        <div>
          <label className={!instaOpen ? "inactive" : ""}>3.</label>
          <textarea
            disabled={!instaOpen}
            placeholder="Cola aqui o negócio que tu copiou"
            onChange={checkPasted}
          />
        </div>
      </div>
      <div>
        <div className="results">
          <div>
            <h3>Quem não me segue de volta:</h3>
            <div>
              {checkInfo?.dontFollowMeBack?.map((user, idx) => (
                <p key={user.username}>
                  {idx}. {user.full_name} -{" "}
                  <a
                    href={`https://www.instagram.com/${user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.username}
                  </a>
                </p>
              ))}
            </div>
          </div>
          <div>
            <h3>Quem eu não sigo de volta:</h3>
            <div>
              {checkInfo?.iDontFollowBack?.map((user, idx) => (
                <p key={user.username}>
                  {idx}. {user.full_name} -{" "}
                  <a
                    href={`https://www.instagram.com/${user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.username}
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstaFollowers;
