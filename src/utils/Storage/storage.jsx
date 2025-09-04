// src/utils/storage.js

const APP_STATE_KEY = "urlShortenerState";

/**
 * Loads the application state from localStorage.
 * @returns {object} The loaded state or a default initial state.
 */
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(APP_STATE_KEY);
    if (serializedState === null) {
      return { urls: [], logs: [] }; // Default initial state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return { urls: [], logs: [] };
  }
};

/**
 * Saves the application state to localStorage.
 * @param {object} state - The state to save.
 */
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(APP_STATE_KEY, serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};
