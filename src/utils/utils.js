export const getRandomId = () => {
  return Math.floor(Date.now() * Math.random()).toString();
};

export const getFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setStorage = (key, obj) => {
  return localStorage.setItem(key, JSON.stringify(obj));
};
