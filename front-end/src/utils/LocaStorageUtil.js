const setItemLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default setItemLocalStorage;
