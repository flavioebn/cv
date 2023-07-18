import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { getData } from "./service";
import { Link } from "react-router-dom";

const Scrap = () => {
  const [stores, setStores] = useState(["", "", ""]);
  const [cards, setCards] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const [expandedAccordions, setExpandedAccordions] = useState([]);

  const handleFetch = async () => {
    setModalVisible(false);
    setIsLoading(true);
    const storesArray = stores.filter((e) => e);
    const cardArray = cards.split("\n");
    const response = await getData(storesArray, cardArray);
    setResult(response);
    setIsLoading(false);
  };

  const editStores = (index, str) => {
    let temp = stores;
    temp[index] = str;
    setStores(temp);
  };

  const renderStores = (index, children) => {
    return (
      <>
        <div className="storeInput">
          <h2>{index}.</h2>
          <p>www.</p>
          {children}
          <p>.com.br/</p>
        </div>
      </>
    );
  };

  const accordionClicked = (index) => {
    if (expandedAccordions.includes(index))
      setExpandedAccordions(
        expandedAccordions.filter((number) => number !== index)
      );
    else setExpandedAccordions([...expandedAccordions, index]);
  };

  const collapseAll = () => {
    setExpandedAccordions([]);
  };

  return (
    <div className="scrap-container">
      <Link className="back-to-hub" to="/hub ">
        Back to hub
      </Link>
      {isLoading && (
        <div className="loadingbg">
          <div class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <button className="collapsebg" onClick={collapseAll}>
        <p>Collapse all</p>
      </button>
      <div
        className="modalButton"
        onClick={() => {
          setModalVisible(!modalVisible);
          collapseAll();
        }}
        style={{ left: modalVisible ? "360px" : "0px" }}
      >
        {modalVisible ? "<" : ">"}
      </div>
      <div className="modal" style={{ left: modalVisible ? "0px" : "-390px" }}>
        <h1 onClick={() => setShowForm(!showForm)}>Lojas</h1>
        {renderStores(
          1,
          <input
            value={stores[0]}
            onChange={(e) => {
              editStores(0, e.target.value);
              setCount(count + 1);
            }}
          />
        )}
        {renderStores(
          2,
          <input
            value={stores[1]}
            onChange={(e) => {
              editStores(1, e.target.value);
              setCount(count + 1);
            }}
          />
        )}
        {renderStores(
          3,
          <input
            value={stores[2]}
            onChange={(e) => {
              editStores(2, e.target.value);
              setCount(count + 1);
            }}
          />
        )}
        <h1>Cards</h1>
        <>
          <textarea
            className="cardsInput"
            onChange={(e) => {
              setCards(e.target.value);
            }}
            value={cards}
          />
          <br />
          <button onClick={handleFetch}>Send</button>
        </>
      </div>
      {modalVisible && (
        <div
          className="modalBackground"
          onClick={() => setModalVisible(!modalVisible)}
        />
      )}
      {result.length === 0 && (
        <p className="placeholderText">
          {isLoading ? "CARREGANDO" : "OS RESULTADOS VEM AQUI"}
        </p>
      )}
      {result.map((i) => {
        return (
          <div className="storeContainer">
            <div className="storeName">
              <h2>Loja: {i.store}</h2>
              <p>
                {i.cards.filter((k) => k.inStock.length > 0).length}/
                {i.cards.length}
              </p>
            </div>
            {i.cards.map((j, idx) => {
              return (
                <>
                  <Accordion
                    disabled={j.inStock.length === 0}
                    onChange={() => accordionClicked(idx)}
                    expanded={expandedAccordions.includes(idx)}
                  >
                    <AccordionSummary>
                      <div className="cardNameContainer">
                        <p className="cardName">{j.card}</p>
                      </div>
                    </AccordionSummary>
                    <a
                      className="storeLink"
                      href={j.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Link
                    </a>
                    {j.inStock.map((k) => {
                      return (
                        <AccordionDetails>
                          <div className="cardContainer">
                            <p>Edição: {k[0]}</p>
                            <p>Idioma: {k[1]}</p>
                            <p>Condição: {k[2]}</p>
                            <p>Extra: {k[3]}</p>
                            <p>Quantidade: {k[4]}</p>
                            <p>Preço: {k[5]}</p>
                          </div>
                        </AccordionDetails>
                      );
                    })}
                    <br />
                  </Accordion>
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Scrap;
