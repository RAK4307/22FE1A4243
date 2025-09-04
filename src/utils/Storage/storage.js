// src/utils/storage.js

const APP_STATE_KEY = "urlShortenerState";

/**
 * Loads the application state from localStorage.
 * @returns {object} The loaded state or a default initial state.
 */
export const loadState = () => {
  try {
    const s = localStorage.getItem(APP_STATE_KEY);
    return s ? JSON.parse(s) : { urls: [], logs: [] };
  } catch {
    return { urls: [], logs: [] };
  }
};

/**
 * Saves the application state to localStorage.
 * @param {object} state - The state to save.
 */
export const saveState = (state) => {
  try { localStorage.setItem(APP_STATE_KEY, JSON.stringify(state)); } catch {}
};
