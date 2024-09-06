import { useEffect, useState } from "react";
import { getFromStorage, PokeURL } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const PokeAdmin = () => {
  const navigate = useNavigate();
  const [newEmail, setNewEmail] = useState("");
  const [codes, setCodes] = useState({
    eventName: "",
    codes: "",
  });

  useEffect(() => {
    const id = getFromStorage("poke-login-id");
    if (id !== "66daca4429c442b6d9492604") {
      navigate("/pokelogin");
    }
  }, []);

  const handleEmail = (e) => {
    const { value } = e.target;
    setNewEmail(value);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        email: newEmail,
      }),
      redirect: "follow",
    };

    fetch(`${PokeURL}/poke-register-allowed`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const handleCodes = (e) => {
    const { name, value } = e.target;
    setCodes((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const sendCodes = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const codesArray = codes.codes.split("\n");
    console.log(codesArray);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        eventName: codes.eventName,
        codes: codesArray,
      }),
      redirect: "follow",
    };

    fetch(`${PokeURL}/poke-register-codes`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <div className="poke-container-login dash">
      <h1>Adm</h1>
      <form>
        <label>Add email</label>
        <input name="newEmail" onChange={handleEmail} value={newEmail} />
        <button type="submit" onClick={sendEmail}>
          Enviar
        </button>
      </form>

      <form>
        <label>Add codes</label>
        <input
          name="eventName"
          onChange={handleCodes}
          value={codes.eventName}
        />
        <textarea value={codes.codes} name="codes" onChange={handleCodes} />
        <button type="submit" onClick={sendCodes}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default PokeAdmin;
