// src/context/AppContext.js
import { createContext, useEffect, useReducer } from "react";
import { loadState, saveState } from "../utils/Storage/storage";

export const AppContext = createContext();

const INITIAL_STATE = { urls: [], logs: [] };

function appReducer(state, action) {
  switch (action.type) {
    case "ADD_URL":
      return { ...state, urls: [...state.urls, action.payload] };
    case "DELETE_URL":
      return { ...state, urls: state.urls.filter(u => u.shortCode !== action.payload) };
    case "ADD_LOG":
      return { ...state, logs: [...state.logs, action.payload] };
    case "LOG_CLICK": {
      const { shortCode, clickRecord } = action.payload;
      const updatedUrls = state.urls.map(url => {
        if (url.shortCode === shortCode) {
          // Ensure clickHistory is an array and increment clicks count
          const clickHistory = Array.isArray(url.clickHistory) ? url.clickHistory : [];
          const newClicks = (url.clicks || 0) + 1;
          return { ...url, clicks: newClicks, clickHistory: [...clickHistory, clickRecord] };
        }
        return url;
      });
      return { ...state, urls: updatedUrls };
    }
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE, loadState);
  useEffect(() => { saveState(state); }, [state]);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
