// src/hooks/useLogger.js
import { useContext } from "react";
// import { AppContext } from "../context/Appcontext";

/**
 * Custom hook for logging events to our application state.
 * It abstracts away the dispatch logic.
 */
export const useLogger = () => {
  const { dispatch } = useContext(AppContext);

  /**
   * Logs an event by dispatching an ADD_LOG action.
   * @param {string} message - The log message.
   * @param {object} data - Additional data to log.
   */
  const logEvent = (message, data = {}) => {
    // In a real app, you might check for NODE_ENV here to avoid logging in production.
    // For this exercise, we log everything to localStorage.
    dispatch({
      type: "ADD_LOG",
      payload: {
        timestamp: new Date().toISOString(),
        message,
        data,
      },
    });
  };

  return { logEvent };
};
