// src/pages/Dashboard.jsx
import React from 'react';
import IconGrid from '../components/IconGrid';
import { Typography } from '@mui/material';

function Dashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <IconGrid />
    </>
  );
}

export default Dashboard;