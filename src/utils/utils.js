export const getRandomId = () => {
  return Math.floor(Date.now() * Math.random()).toString();
};

export const getFromStorage = (key) => {
  const info = localStorage.getItem(key);
  if (!info) return null;
  return JSON.parse(info);
};

export const setStorage = (key, obj) => {
  return localStorage.setItem(key, JSON.stringify(obj));
};

export const PokeURL = "https://cv-back-c19n.onrender.com";

export const formatWordCaseAndSpecials = (str) => {
  // Define um mapa de substituições
  const replacements = {
    á: "a",
    à: "a",
    â: "a",
    ã: "a",
    ä: "a",
    å: "a",
    é: "e",
    è: "e",
    ê: "e",
    ë: "e",
    í: "i",
    ì: "i",
    î: "i",
    ï: "i",
    ó: "o",
    ò: "o",
    ô: "o",
    õ: "o",
    ö: "o",
    ú: "u",
    ù: "u",
    û: "u",
    ü: "u",
    ç: "c",
    ñ: "n",
    ß: "ss",
    æ: "ae",
    œ: "oe",
    ø: "o",
    þ: "th",
    ð: "dh",
    ý: "y",
    ÿ: "y",
    š: "s",
    ž: "z",
    č: "c",
    ć: "c",
    đ: "dj",
    ľ: "l",
    ĺ: "l",
    ď: "d",
    ť: "t",
    ň: "n",
    ħ: "h",
    ċ: "c",
    ġ: "g",
    ż: "z",
    ĩ: "i",
    į: "i",
    ı: "i",
    ă: "a",
    ĕ: "e",
    ė: "e",
    ę: "e",
    ğ: "g",
    ĭ: "i",
    ķ: "k",
    ļ: "l",
    ņ: "n",
    ŋ: "n",
    ő: "o",
    ŕ: "r",
    ř: "r",
    ș: "s",
    ț: "t",
    ũ: "u",
    ū: "u",
    ů: "u",
    ű: "u",
    ų: "u",
    ź: "z",
    À: "A",
    Á: "A",
    Â: "A",
    Ã: "A",
    Ä: "A",
    Å: "A",
    Æ: "AE",
    È: "E",
    É: "E",
    Ê: "E",
    Ë: "E",
    Ì: "I",
    Í: "I",
    Î: "I",
    Ï: "I",
    Ò: "O",
    Ó: "O",
    Ô: "O",
    Õ: "O",
    Ö: "O",
    Ø: "O",
    Ù: "U",
    Ú: "U",
    Û: "U",
    Ü: "U",
    Ç: "C",
    Ñ: "N",
    Ý: "Y",
    Þ: "TH",
    Ð: "DH",
    Ą: "A",
    Ć: "C",
    Ę: "E",
    Ł: "L",
    Ń: "N",
    Ś: "S",
    Ź: "Z",
    Ż: "Z",
    ą: "a",
    ł: "l",
    ń: "n",
    ś: "s",
    Œ: "OE",
  };

  // Aplica as substituições usando um regex global e uma função de substituição
  // eslint-disable-next-line no-control-regex
  return str.toLowerCase().replace(/[^\u0000-\u007E]/g, function (char) {
    // eslint-disable-line no-control-regex
    return replacements[char] || char; // eslint-disable-line no-control-regex
  }); // eslint-disable-line no-control-regex
};
