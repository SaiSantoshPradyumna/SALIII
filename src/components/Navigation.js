import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Hive } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBoxArchive, faCloud, faUser } from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  const [anchorEl, setAnchorEl] = useState(null);

  // Replace with dynamic data
  const userName = "John Doe";
  const userEmail = "john.doe@example.com";

  // Handle menu opening
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu closing
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#d29d30' }}> {/* Set background color */}
      <Toolbar>
        <Hive sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Project B
        </Typography>
        
        {/* Dashboard Link */}
        <IconButton color="inherit" component={RouterLink} to="/">
          <FontAwesomeIcon icon={faHouse} />
        </IconButton>

        {/* Hive Metrics Link */}
        <IconButton color="inherit" component={RouterLink} to="/hive-metrics">
          <FontAwesomeIcon icon={faBoxArchive} />
        </IconButton>

        {/* Weather Link */}
        <IconButton color="inherit" component={RouterLink} to="/weather">
          <FontAwesomeIcon icon={faCloud} />
        </IconButton>

        {/* Profile Icon and Name */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip
            title={
              <Box>
                <Typography variant="body2">{userName}</Typography>
                <Typography variant="body2">{userEmail}</Typography>
              </Box>
            }
            arrow
          >
            <IconButton color="inherit" onClick={handleProfileMenuOpen}>
              <FontAwesomeIcon icon={faUser} />
            </IconButton>
          </Tooltip>
          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Support</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
