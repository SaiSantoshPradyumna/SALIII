// src/pages/Settings.jsx
import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
  Box,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

function Settings() {
  const [username, setUsername] = useState('User123');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings update
    alert('Settings updated!');
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box
        component="form"
        sx={{
          maxWidth: 400,
          mt: 3,
        }}
        onSubmit={handleSubmit}
      >
        <Stack spacing={2}>
          <Avatar
            alt="Profile Picture"
            src={profilePic}
            sx={{ width: 100, height: 100, alignSelf: 'center' }}
          />
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
          >
            Upload Profile Picture
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleProfilePicChange}
            />
          </Button>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Change Password"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Save Changes
          </Button>
        </Stack>
      </Box>
    </>
  );
}

export default Settings;