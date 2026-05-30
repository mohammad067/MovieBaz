// src/utils/userStorage.js

export const getUserFromStorage = () => {
  try {
    const saved = localStorage.getItem("moviebaz_user");
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    localStorage.removeItem("moviebaz_user");
    return null;
  }
};

export const saveUserToStorage = (userData) => {
  try {
    localStorage.setItem("moviebaz_user", JSON.stringify(userData));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const removeUserFromStorage = () => {
  localStorage.removeItem("moviebaz_user");
};