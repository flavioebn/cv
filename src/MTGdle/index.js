import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import mtgBack from "../assets/images/mtg-back.jpeg";

const MTGdle = () => {
  const [cardToGuess, setCardToGuess] = useState();
  const [cardNames, setCardNames] = useState([]);
  const [chosenCards, setChosenCards] = useState([]);
  const [cardSearch, setCardSearch] = useState("");
  const [found, setFound] = useState(false);

  const getCard = async () => {
    const randomPage = Math.floor(Math.random() * 4) + 1;
    const randomIndex = Math.floor(Math.random() * 175) + 1;
    const response = await fetch(
      `https://api.scryfall.com/cards/search?order=edhrec&q=format:commander&page=${randomPage}`
    ).then((res) => res.json());
    const card = await fetch(
      `https://api.scryfall.com/cards/search?q=!"${response.data[randomIndex].name}" is:firstprinting`
    ).then((response) => response.json());
    setCardToGuess(card.data[0]);
  };

  const getSpecificCard = async (card) => {
    if (card === null) return;
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=!"${card}" is:firstprinting`
    ).then((response) => response.json());

    if (card === cardToGuess.name) {
      setFound(true);
    }
    setChosenCards([...chosenCards, response.data[0]]);
  };

  useEffect(() => {
    getCard();
  }, []);

  const searchAutoComplete = async (name) => {
    const response = await fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${name}`
    ).then((res) => res.json());
    setCardNames(response.data);
  };

  const selectCard = (card) => {
    getSpecificCard(card);
    setCardNames([]);
    setCardSearch("");
  };

  const handleTextChange = (e) => {
    setCardSearch(e.target.value);
    let name = e.target.value;
    if (name.length > 3) {
      searchAutoComplete(name);
    }
  };

  const checkColors = (colors) => {
    let answer = "wrong";
    if (colors === [] && cardToGuess.colors === []) {
      answer = "right";
    }
    cardToGuess.colors.forEach((i) => {
      if (colors.includes(i)) {
        answer = "kinda";
      }
    });
    if (colors.toString() === cardToGuess.colors.toString()) {
      answer = "right";
    }
    return answer;
  };

  const getType = (type) => {
    let formattedType = type.replace("Legendary ", "");
    if (formattedType.includes("Land")) {
      return "Land";
    }
    if (
      formattedType.includes("Enchantment") &&
      formattedType.includes("Creature")
    ) {
      return "Enchant. Creature";
    }
    if (formattedType.includes("Enchantment")) {
      return "Enchant.";
    }
    if (formattedType.includes("Planeswalker")) {
      return "PW";
    }
    return formattedType.split("—")[0];
  };

  return (
    <div className="mtg-daily">
      <div className="header">
        <img
          alt="back"
          className="mtg-back"
          src={found ? cardToGuess?.image_uris.normal : mtgBack}
        />
        {found && <h3>Tries: {chosenCards.length}</h3>}
      </div>
      <Autocomplete
        className="input"
        disablePortal
        id="combo-box-demo"
        options={cardNames}
        value={cardSearch}
        sx={{ width: "100%" }}
        type="text"
        onChange={(event, newValue) => {
          selectCard(newValue);
        }}
        renderInput={(params) => (
          <TextField type="text" {...params} onChange={handleTextChange} />
        )}
        filterOptions={(x) => x}
      />
      <div className="vertical-scroll">
        <div className="guesses-container little">
          <div className="card-guess">
            <div className="name">
              <p className="label">Card</p>
            </div>
            <div>
              <p className="label">Cmc</p>
            </div>
            <div>
              <p className="label">Color</p>
            </div>
            <div>
              <p className="label">Type</p>
            </div>
            <div>
              <p className="label">Year</p>
            </div>
            <div>
              <p className="label">Rarity</p>
            </div>
            <div>
              <p className="label">Legendary</p>
            </div>
          </div>
        </div>
        <div className="guesses-container">
          {chosenCards.map((i) => {
            return (
              <div className="card-guess">
                <div className="name">
                  <span>{i.name}</span>
                  <img src={i.image_uris.art_crop} alt={i.name} />
                </div>
                <div className={i.cmc === cardToGuess.cmc ? `right` : "wrong"}>
                  <p className="tip">
                    {i.cmc}
                    {i.cmc === cardToGuess.cmc
                      ? ""
                      : i.cmc > cardToGuess.cmc
                      ? " >"
                      : " <"}
                  </p>
                </div>
                <div className={checkColors(i.colors)}>
                  <p className="tip year">{i.colors.map((j) => j)}</p>
                </div>
                <div
                  className={
                    getType(i.type_line) === getType(cardToGuess.type_line)
                      ? "right"
                      : "wrong"
                  }
                >
                  <p className="tip type">{getType(i.type_line)}</p>
                </div>
                <div
                  className={
                    i.released_at.slice(0, 4) ===
                    cardToGuess.released_at.slice(0, 4)
                      ? "right"
                      : "wrong"
                  }
                >
                  <p className="tip year">
                    {i.released_at.slice(0, 4)}
                    {i.released_at.slice(0, 4) ===
                    cardToGuess.released_at.slice(0, 4)
                      ? ""
                      : +i.released_at.slice(0, 4) >
                        +cardToGuess.released_at.slice(0, 4)
                      ? " >"
                      : " <"}
                  </p>
                </div>
                <div
                  className={
                    i.rarity === cardToGuess.rarity ? "right" : "wrong"
                  }
                >
                  <p className="tip">{i.rarity.slice(0, 1).toUpperCase()}</p>
                </div>
                <div
                  className={
                    i.type_line.includes("Legendary") ===
                    cardToGuess.type_line.includes("Legendary")
                      ? "right"
                      : "wrong"
                  }
                >
                  <p className="tip">
                    {i.type_line.includes("Legendary") ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MTGdle;
