export const drinkList = [
  {
    name: "Cerveja",
    types: ["Lata", "Longneck", "Litrão", "Copo"],
  },
  {
    name: "Chopp",
    types: ["300ml", "500ml", "1L"],
  },
  {
    name: "Vinho",
    types: ["Taça", "Garrafa"],
  },
  {
    name: "Whisky",
    types: ["Dose", "Copo", "Misturado"],
  },
  {
    name: "Vodka",
    types: ["Dose", "Misturado"],
  },
  {
    name: "Gin",
    types: ["Dose", "Misturado"],
  },
  {
    name: "Shot",
    types: ["Vodka", "Whisky", "Tequila", "Cachaça"],
  },
  {
    name: "Caipirinha",
    types: ["Limão", "Morango", "Vinho"],
  },
  {
    name: "Outros",
    types: [
      "Ice",
      "Skol beats",
      "Bebida SABOR energético",
      "Xeque Mate",
      "Corote",
    ],
  },
];

const liters = {
  Cerveja: {
    Lata: 0.355,
    Longneck: 0.355,
    Litrão: 1.0,
    Copo: 0.25,
  },
  Chopp: {
    "300ml": 0.3,
    "500ml": 0.5,
    "1L": 1.0,
  },
  Vinho: {
    Taça: 0.15,
    Garrafa: 0.75,
  },
  Whisky: {
    Dose: 0.05,
    Copo: 0.2,
    Misturado: 0.3,
  },
  Vodka: {
    Dose: 0.05,
    Misturado: 0.3,
  },
  Gin: {
    Dose: 0.05,
    Misturado: 0.3,
  },
  Shot: {
    Vodka: 0.04,
    Whisky: 0.04,
    Tequila: 0.04,
    Cachaça: 0.04,
  },
  Caipirinha: {
    Limão: 0.3,
    Morango: 0.3,
    Vinho: 0.3,
  },
  Outros: {
    Ice: 0.355,
    "Skol beats": 0.355,
    "Bebida SABOR energético": 0.355,
    "Xeque Mate": 0.355,
    Corote: 0.355,
  },
};

const defaultAbv = {
  Cerveja: 0.05,
  Chopp: 0.05,
  Vinho: 0.12,
  Whisky: 0.4,
  Vodka: 0.4,
  Gin: 0.4,
  Shot: 0.4,
  Caipirinha: 0.18,
  Outros: 0.1,
};

export const calculateLiters = (arr) => {
  let totalLiters = 0;
  let totalPoints = 0;
  arr.forEach((drink) => {
    const name = drink.name;
    const type = drink.type;
    const amount = Number(drink.amount) || 0;
    if (liters[name] && liters[name][type]) {
      totalLiters += liters[name][type] * amount;
      totalPoints += liters[name][type] * (defaultAbv[name] * 100) * amount;
    }
  });
  return { liters: totalLiters.toFixed(2), points: totalPoints.toFixed(2) };
};
