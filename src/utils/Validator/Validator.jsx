// src/utils/validators.js

/**
 * Validates if a given string is a proper URL.
 * @param {string} url - The URL string to validate.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
export const validateUrl = (url) => {
  if (!url) return false;
  try {
    // The URL constructor will throw an error for invalid URLs.
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates the validity period.
 * @param {string|number} minutes - The validity period in minutes.
 * @returns {boolean} - True if the validity is a positive integer <= 1440.
 */
export const validateValidity = (minutes) => {
  if (!minutes) return true; // Optional field
  const num = Number(minutes);
  return Number.isInteger(num) && num > 0 && num <= 1440;
};
