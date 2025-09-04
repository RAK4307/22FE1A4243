// src/components/UrlTable.jsx
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ContentCopy, BarChart, Delete } from "@mui/icons-material";
import { AppContext } from "../context/Appcontext";
import { useLogger } from "../hooks/useLogger";

const UrlTable = () => {
  const { state, dispatch } = useContext(AppContext);
  const { logEvent } = useLogger();

  const handleDelete = (shortCode) => {
    if (window.confirm(`Are you sure you want to delete the link for "${shortCode}"?`)) {
      dispatch({ type: "DELETE_URL", payload: shortCode });
      logEvent("URL Deleted", { shortCode });
    }
  };

  const handleCopy = (shortCode) => {
    const url = `${window.location.origin}/`;
    navigator.clipboard.writeText(url);
    logEvent("URL Copied", { shortCode });
    // Optionally, show a toast notification here
  };

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell align="right">Clicks</TableCell>
            <TableCell>Expires At</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.urls.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No URLs shortened yet.
              </TableCell>
            </TableRow>
          )}
          {state.urls.map((url) => (
            <TableRow key={url.shortCode}>
              <TableCell>
                <Link href={`/${url.shortCode}`} target="_blank" rel="noopener">
                  {`${window.location.host}/${url.shortCode}`}
                </Link>
              </TableCell>
              <TableCell>
                <Tooltip title={url.longUrl}>
                  <Typography noWrap sx={{ maxWidth: "300px" }}>
                    {url.longUrl}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell align="right">{url.clicks}</TableCell>
              <TableCell>
                {new Date(url.expiresAt).toLocaleString()}
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Copy">
                  <IconButton onClick={() => handleCopy(url.shortCode)} size="small">
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Stats">
                  <IconButton
                    component={RouterLink}
                    to={`/stats?shortCode=${url.shortCode}`}
                    size="small"
                  >
                    <BarChart />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => handleDelete(url.shortCode)}
                    size="small"
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UrlTable;
