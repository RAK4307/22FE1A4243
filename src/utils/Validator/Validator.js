// src/utils/validators.js

/**
 * Validates if a given string is a proper URL.
 * @param {string} url - The URL string to validate.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
export const validateUrl = url => {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch { return false; }
};
export const validateValidity = v => {
  if (!v) return true;
  const n = Number(v);
  return Number.isInteger(n) && n > 0 && n <= 1440;
};
