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
    types: ["Puro", "Misturado"],
  },
  {
    name: "Vodka",
    types: ["Puro", "Misturado"],
  },
  {
    name: "Gin",
    types: ["Puro", "Misturado"],
  },
  {
    name: "Shot",
    types: ["Vodka", "Tequila", "Cachaça"],
  },
  {
    name: "Caipirinha",
    types: ["300ml", "500ml", "1L"],
  },
  {
    name: "Drink",
    types: ["Aperol", "Moscow Mule", "Negroni"],
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

export const liters = {
  Cerveja: {
    Lata: 0.35,
    Longneck: 0.35,
    Litrão: 1.0,
    Copo: 0.25,
  },
  Chopp: {
    "300ml": 0.3,
    "500ml": 0.5,
    "1L": 1.0,
  },
  Vinho: {
    Taça: 0.25,
    Garrafa: 0.75,
  },
  Whisky: {
    Puro: 0.3,
    Misturado: 0.15,
  },
  Vodka: {
    Puro: 0.3,
    Misturado: 0.15,
  },
  Gin: {
    Puro: 0.3,
    Misturado: 0.15,
  },
  Shot: {
    Vodka: 0.3,
    Tequila: 0.5,
    Cachaça: 0.3,
  },
  Caipirinha: {
    "300ml": 0.3,
    "500ml": 0.5,
    "1L": 1.0,
  },
  Drink: {
    Aperol: 0.35,
    "Moscow Mule": 0.35,
    Negroni: 0.35,
  },
  Outros: {
    Ice: 0.35,
    "Skol beats": 0.35,
    "Bebida SABOR energético": 0.35,
    "Xeque Mate": 0.35,
    Corote: 0.35,
  },
};

export const points = {
  Cerveja: {
    Lata: 1,
    Longneck: 1,
    Litrão: 3,
    Copo: 0.5,
  },
  Chopp: {
    "300ml": 1,
    "500ml": 1.5,
    "1L": 3,
  },
  Vinho: {
    Taça: 1.5,
    Garrafa: 5,
  },
  Whisky: {
    "Copo puro": 7,
    Misturado: 3,
  },
  Vodka: {
    "Copo puro": 7,
    Misturado: 3,
  },
  Gin: {
    "Copo puro": 7,
    Misturado: 3,
  },
  Shot: {
    Vodka: 5,
    Tequila: 10,
    Cachaça: 5,
  },
  Caipirinha: {
    "300ml": 1.5,
    "500ml": 2.5,
    "1L": 5,
  },
  Drink: {
    Aperol: 3.5,
    "Moscow Mule": 3.5,
    Negroni: 3.5,
  },
  Outros: {
    Ice: 2,
    "Skol beats": 2,
    "Bebida SABOR energético": 2,
    "Xeque Mate": 2,
    Corote: 5,
  },
};

// const defaultAbv = {
//   Cerveja: 0.05,
//   Chopp: 0.05,
//   Vinho: 0.12,
//   Whisky: 0.4,
//   Vodka: 0.4,
//   Gin: 0.4,
//   Shot: 0.4,
//   Caipirinha: 0.09,
//   Drink: 0.18,
//   Outros: 0.1,
// };

// const getDrinkValue = (name, type) => {
//   return (
//     Math.round(((liters[name][type] * defaultAbv[name] * 100) / 1.75) * 2) / 2
//   );
// };

export const calculateLiters = (arr) => {
  let totalLiters = 0;
  let totalPoints = 0;
  //   drinkList.forEach((i) => {
  //     i.types.forEach((j) => {
  //       console.log(`${i.name} - ${j}: ${getDrinkValue(i.name, j)}`);
  //     });
  //   });
  arr.forEach((drink) => {
    const name = drink.name;
    const type = drink.type;
    const amount = Number(drink.amount) || 0;
    if (liters[name] && liters[name][type]) {
      totalLiters += liters[name][type] * amount;
      totalPoints += points[name][type] * amount;
    }
  });
  return { liters: +totalLiters.toFixed(2), points: +totalPoints.toFixed(2) };
};
