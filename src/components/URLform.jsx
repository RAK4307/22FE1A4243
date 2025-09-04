import React, { useState, useContext } from "react";
import { nanoid } from "nanoid";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { AppContext } from "../context/Appontext";
import { useLogger } from "../hooks/useLogger";
import { validateUrl, validateValidity } from "../utils/validators";

const UrlForm = () => {
  const { state, dispatch } = useContext(AppContext);
  const { logEvent } = useLogger();

  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [validity, setValidity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Client-side validation
    if (!validateUrl(longUrl)) {
      setError("Please enter a valid URL.");
      return;
    }
    if (!validateValidity(validity)) {
      setError("Validity must be a positive number between 1 and 1440 minutes.");
      return;
    }

    const finalShortCode = shortCode || nanoid(6);

    // Check for shortcode uniqueness
    if (state.urls.some((url) => url.shortCode === finalShortCode)) {
      setError(`Shortcode "${finalShortCode}" is already taken. Please choose another.`);
      return;
    }

    setError("");

    // Calculate expiry date
    const validityMinutes = Number(validity) || 30;
    const expiryDate = new Date(Date.now() + validityMinutes * 60 * 1000);

    const newUrl = {
      longUrl,
      shortCode: finalShortCode,
      validity: validityMinutes,
      createdAt: new Date().toISOString(),
      expiresAt: expiryDate.toISOString(),
      clicks: 0,
    };

    // Dispatch action to update state
    dispatch({ type: "ADD_URL", payload: newUrl });

    // Log the event
    logEvent("URL Shortened", { longUrl, shortCode: finalShortCode });

    // Reset form fields
    setLongUrl("");
    setShortCode("");
    setValidity("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shorten a URL
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Long URL"
          variant="outlined"
          fullWidth
          value={longUrl}
          onChange={(e) => {
            setLongUrl(e.target.value);
            if (error) setError("");
          }}
          required
          error={!!error && error.includes("URL")}
        />
        <TextField
          label="Custom Shortcode (Optional)"
          variant="outlined"
          fullWidth
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          error={!!error && error.includes("Shortcode")}
        />
        <TextField
          label="Validity (1-1440 minutes, Optional, defaults to 30)"
          variant="outlined"
          fullWidth
          type="number"
          value={validity}
          onChange={(e) => {
            setValidity(e.target.value);
            if (error) setError("");
          }}
          error={!!error && error.includes("Validity")}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" color="primary">
          Shorten URL
        </Button>
      </Box>
    </Paper>
  );
};

export default UrlForm;
