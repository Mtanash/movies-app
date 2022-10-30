export const saveToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const retrieveFromLocalStorage = (name, fallback) =>
  localStorage.getItem(name)
    ? JSON.parse(localStorage.getItem(name))
    : fallback;
