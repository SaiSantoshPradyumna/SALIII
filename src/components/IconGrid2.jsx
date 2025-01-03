// src/components/IconGrid.jsx
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import IconCard from './IconCard';

function IconGrid() {
  const [selectedIconId, setSelectedIconId] = useState(null);

  const weatherData = [
    { id: 201, title: 'Heat Index', leftValue: 30, rightValue: 70 },
    { id: 202, title: 'Dew Point', leftValue: 25, rightValue: 75 },
    { id: 203, title: 'Vapor Pressure Deficit', leftValue: 20, rightValue: 80 },
    { id: 204, title: 'Wind Chill', leftValue: 35, rightValue: 65 },
    { id: 205, title: 'Relative Humidity Ratio', leftValue: 50, rightValue: 50 },
    { id: 206, title: 'Wet Bulb Temperature', leftValue: 28, rightValue: 72 },
    { id: 207, title: 'Atmospheric Pressure Gradient', leftValue: 40, rightValue: 60 },
    { id: 208, title: 'Cloud Base Height', leftValue: 60, rightValue: 40 },
    { id: 209, title: 'Specific Humidity', leftValue: 45, rightValue: 55 },
    { id: 210, title: 'Evapotranspiration Rate', leftValue: 33, rightValue: 67 },
    { id: 211, title: 'Solar Insolation Duration', leftValue: 70, rightValue: 30 },
    { id: 212, title: 'Heat Stress Index', leftValue: 38, rightValue: 62 },
  ];

  const handleIconClick = (id) => {
    // Toggle selection
    setSelectedIconId(selectedIconId === id ? null : id);
  };

  return (
    <Grid container spacing={2}>
      {weatherData.map((iconData) => (
        <Grid
          item
          key={iconData.id}
          xs={selectedIconId ? (selectedIconId === iconData.id ? 12 : 6) : 4}
        >
          <IconCard
            data={iconData}
            isSelected={selectedIconId === iconData.id}
            onClick={handleIconClick}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default IconGrid;
