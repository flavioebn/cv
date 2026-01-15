import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { filters } from "./filters";

const MtgGrid = () => {
  const [cardNames, setCardNames] = useState([]);
  const [chosenCards, setChosenCards] = useState(new Array(9));
  const [count, setCount] = useState(0);
  const [chosenFilters, setChosenFilters] = useState(new Array(9));

  const getCard = async (card, index) => {
    if (card === null) return;
    const response = await fetch(
      `https://api.scryfall.com/cards/named?exact=${card}`
    ).then((response) => response.json());

    let filtersToAnalyze = [];
    switch (index) {
      case 0:
        filtersToAnalyze.push(0, 3);
        break;
      case 1:
        filtersToAnalyze.push(1, 3);
        break;
      case 2:
        filtersToAnalyze.push(2, 3);
        break;
      case 3:
        filtersToAnalyze.push(0, 4);
        break;
      case 4:
        filtersToAnalyze.push(1, 4);
        break;
      case 5:
        filtersToAnalyze.push(2, 4);
        break;
      case 6:
        filtersToAnalyze.push(0, 5);
        break;
      case 7:
        filtersToAnalyze.push(1, 5);
        break;
      case 8:
        filtersToAnalyze.push(2, 5);
        break;
      default:
        break;
    }

    let color = "";
    switch (chosenFilters[filtersToAnalyze[0]].split(" ")[0]) {
      case "Black":
        color = "B";
        break;
      case "Blue":
        color = "U";
        break;
      case "Green":
        color = "G";
        break;
      case "Red":
        color = "R";
        break;
      case "White":
        color = "W";
        break;

      case "Colorless":
        color = "C";
        break;

      default:
        break;
    }

    let colors = false;

    const type = chosenFilters[filtersToAnalyze[0]].split(" ")[1];
    if (color === "C") {
      colors = response.colors.length === 0;
    } else {
      colors = response.colors.includes(color);
    }

    const signal = chosenFilters[filtersToAnalyze[1]].split(" ")[0];
    const number = chosenFilters[filtersToAnalyze[1]].split(" ")[1];

    let checkCmc = true;

    switch (signal) {
      case ">":
        checkCmc = response.cmc > +number;
        break;
      case "<":
        checkCmc = response.cmc < +number;
        break;
      case "=":
        checkCmc = response.cmc === +number;
        break;
      default:
        break;
    }

    if (!checkCmc || !response.type_line.includes(type) || !colors) {
      window.alert("ERROOOOOO");
    } else {
      let temp = chosenCards;
      temp[index] = { card, img: response.image_uris.art_crop };
      setChosenCards(() => temp);
      setCount(count + 1);
    }
  };

  const searchAutoComplete = async (name) => {
    const response = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${name}`
    ).then((res) => res.json());
    setCardNames(response.data);
  };

  const selectCard = (card, index) => {
    getCard(card, index);
    setCardNames([]);
  };

  const handleTextChange = (e) => {
    let name = e.target.value;
    if (name.length > 3) {
      searchAutoComplete(name);
    }
  };

  useEffect(() => {
    let temp = new Array(6);
    for (let i = 0; i < 3; i++) {
      temp[i] =
        filters[0].data[Math.floor(Math.random() * filters[0].data.length)];
    }

    for (let i = 3; i < 6; i++) {
      temp[i] =
        filters[1].data[Math.floor(Math.random() * filters[1].data.length)];
    }
    setChosenFilters(temp);
  }, []);

  const renderSquare = (index) => {
    let fill = (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={cardNames}
        value={chosenCards[index]}
        sx={{ width: "100%" }}
        onChange={(event, newValue) => {
          selectCard(newValue, index);
        }}
        renderInput={(params) => (
          <TextField {...params} onChange={handleTextChange} />
        )}
        filterOptions={(x) => x}
      />
    );

    if (chosenCards[index]?.img) {
      fill = (
        <div className="card-name-container">
          <h2 className="card-name">{chosenCards[index].card}</h2>
        </div>
      );
    }
    return (
      <div className="card-square">
        <div className="image-wrapper">
          <img src={chosenCards[index]?.img} alt="abuble" />
        </div>
        {fill}
      </div>
    );
  };

  return (
    <>
      <h1>MtGrid</h1>
      <div className="mtg-grid">
        <div className="card-square half half-top"></div>
        <div className="card-square half-top">
          <p>{chosenFilters[0]}</p>
        </div>
        <div className="card-square half-top">
          <p>{chosenFilters[1]}</p>
        </div>
        <div className="card-square half-top">
          <p>{chosenFilters[2]}</p>
        </div>
        <div className="card-square half">
          <p>{chosenFilters[3]}</p>
        </div>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        <div className="card-square half">
          <p>{chosenFilters[4]}</p>
        </div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        <div className="card-square half">
          <p>{chosenFilters[5]}</p>
        </div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </>
  );
};

export default MtgGrid;
