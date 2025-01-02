// src/components/Navigation.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Hive } from '@mui/icons-material';

function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Hive sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Beekeeping Monitoring
        </Typography>
        <IconButton color="inherit" component={RouterLink} to="/">
          Dashboard
        </IconButton>
        <IconButton color="inherit" component={RouterLink} to="/hive-metrics">
          Hive Metrics
        </IconButton>
        <IconButton color="inherit" component={RouterLink} to="/weather">
          Weather
        </IconButton>
        <IconButton color="inherit" component={RouterLink} to="/settings">
          Settings
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;