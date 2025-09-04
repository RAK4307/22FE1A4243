// src/components/StatsTable.jsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const Stats = ({ logs }) => {
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Click Logs
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Geolocation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No clicks recorded yet.
                </TableCell>
              </TableRow>
            )}
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell>{log.data.source || "N/A"}</TableCell>
                <TableCell>{log.data.geolocation || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Stats;
