import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/loader";

const Converter = () => {
  const [rate, setRate] = useState({ rate: "", date: 0 });
  const [jpy, setJpy] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRates = async () => {
    setLoading(true);
    const response = await fetch(
      "https://api.transferwise.com/v1/rates?source=BRL&target=JPY",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer ea7316d4-1a8a-403f-82d0-c4b6157ba099",
        },
      }
    )
      .then((response) => response.text())
      .then((result) => setRate(JSON.parse(result)[0]))
      .catch((error) => console.log("error", error));
    setLoading(false);
    return response;
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <>
      <div className="container-cami">
        <Link className="back-to-hub" to="/hub ">
          Back to hub
        </Link>
        <p className="version">v1.3</p>
        {loading && <Loader />}
        <p className="rate">
          Rate do dia: {rate.rate !== "" ? rate.rate.toFixed(5) : ""} <br />
        </p>
        <a
          href="https://twitter.com/messages/compose?recipient_id=1243210988704448517"
          target="_blank"
          className="arroba"
          rel="noreferrer"
        >
          @cardcaptorcami
        </a>
        {/* <div className="yens-container"> */}
        <p className="currency">Preço em ienes (um anúncio por vez):</p>
        <div>
          <input
            type="number"
            value={jpy}
            onChange={(e) => setJpy(e.target.value)}
          />
          <p className="yen">¥</p>
        </div>
        {/* </div> */}
        <h1>
          Total: R${" "}
          {jpy
            ? Math.ceil(((jpy * 1.1 + 100) / rate.rate) * 1.0219 + 10.92)
            : "00"}
          ,00
        </h1>
        {/* <p>fee: {((jpy / rate.rate) * 0.0219).toFixed(2)} + 10,92</p> */}
      </div>
    </>
  );
};

export default Converter;
