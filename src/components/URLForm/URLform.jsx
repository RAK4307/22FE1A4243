import React, { useState, useContext, useRef } from "react";
import { nanoid } from "nanoid";
// ...existing code...
import { AppContext } from "../../context/Appcontext";
import { validateUrl, validateValidity } from "../../utils/Validator/Validator";
import { useLogger } from "../../hooks/userLogger";
import "./form.css";

const UrlForm = () => {
  const { state, dispatch } = useContext(AppContext);
  const { logEvent } = useLogger();
  // Replace toast notifications with alert()
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [validity, setValidity] = useState("");
  const [errors, setErrors] = useState({});
  const longUrlRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = {};
    if (!validateUrl(longUrl)) newErrors.longUrl = "Please enter a valid URL.";
    if (validity && !validateValidity(validity)) newErrors.validity = "Validity must be 1-1440 minutes.";
    const finalShortCode = shortCode || nanoid(6);
    if (state.urls.some(u => u.shortCode === finalShortCode)) newErrors.shortCode = "Shortcode already taken.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length) { longUrlRef.current?.focus(); return; }
    const validityMinutes = Number(validity) || 30;
    const expiryDate = new Date(Date.now() + validityMinutes * 60 * 1000);
    const newUrl = { longUrl, shortCode: finalShortCode, validity: validityMinutes, createdAt: new Date().toISOString(), expiresAt: expiryDate.toISOString(), clicks: 0 };
    dispatch({ type: "ADD_URL", payload: newUrl });
    logEvent("URL Shortened", { longUrl, shortCode: finalShortCode });
  alert(`URL Shortened!\nYour short URL: /${finalShortCode}`);
  window.open(longUrl, '_blank');
    setLongUrl(""); setShortCode(""); setValidity(""); setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="url-form" noValidate>
      <div className="form-fields">
        <div className="form-group">
          <label htmlFor="longUrl">Long URL<span className="required-asterisk">*</span></label>
          <input id="longUrl" ref={longUrlRef} value={longUrl} onChange={e => setLongUrl(e.target.value)} className="form-input" placeholder="https://example.com" />
          {errors.longUrl && <div className="form-error">{errors.longUrl}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="shortCode">Custom Shortcode (Optional)</label>
          <input id="shortCode" value={shortCode} onChange={e => setShortCode(e.target.value)} className="form-input" placeholder="my-link" />
          {errors.shortCode && <div className="form-error">{errors.shortCode}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="validity">Validity (1-1440 min, default 30)</label>
          <input id="validity" type="number" value={validity} onChange={e => setValidity(e.target.value)} className="form-input" placeholder="30" />
          {errors.validity && <div className="form-error">{errors.validity}</div>}
        </div>
        <button type="submit" className="form-submit-btn">Shorten URL</button>
      </div>
    </form>
  );
};
export default UrlForm;
