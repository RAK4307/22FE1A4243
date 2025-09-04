// src/hooks/useLogger.js
import { useContext } from "react";
import { AppContext } from "../context/Appcontext";
export const useLogger = () => {
  const { dispatch } = useContext(AppContext);
  return {
    logEvent: (msg, data = {}) => {
      dispatch({ type: "ADD_LOG", payload: { timestamp: new Date().toISOString(), msg, data } });
    }
  };
};
