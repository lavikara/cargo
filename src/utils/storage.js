export const removeItem = (key) => {
  return localStorage.removeItem(key);
};

export const setItem = (key, item) => {
  return localStorage.setItem(key, JSON.stringify(item));
};

export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const clearStorage = () => {
  return localStorage.clear();
};
