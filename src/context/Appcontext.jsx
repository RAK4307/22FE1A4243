// src/context/AppContext.jsx
import React, { createContext, useReducer, useEffect } from "react";
import { loadState, saveState } from "../utils/Storage/storage";

// Create the context
export const AppContext = createContext();

// Define the reducer function to manage state updates
const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_URL":
      return {
        ...state,
        urls: [...state.urls, action.payload],
      };
    case "ADD_LOG":
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    case "INCREMENT_CLICKS":
      return {
        ...state,
        urls: state.urls.map((url) =>
          url.shortCode === action.payload
            ? { ...url, clicks: url.clicks + 1 }
            : url
        ),
      };
    case "DELETE_URL":
      return {
        ...state,
        urls: state.urls.filter((url) => url.shortCode !== action.payload),
        logs: state.logs.filter((log) => log.data.shortCode !== action.payload),
      };
    default:
      return state;
  }
};

// Create the provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, { urls: [], logs: [] }, loadState);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
