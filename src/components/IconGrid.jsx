// src/components/IconGrid.jsx
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import IconCard from './IconCard';

function IconGrid() {
  const [selectedIconId, setSelectedIconId] = useState(null);

  const iconsData = [
    { id: 1, title: 'Hive 1', leftValue: 20, rightValue: 80 },
    { id: 2, title: 'Hive 2', leftValue: 50, rightValue: 50 },
    { id: 3, title: 'Hive 3', leftValue: 70, rightValue: 30 },
    { id: 4, title: 'Hive 4', leftValue: 60, rightValue: 40 },
    { id: 5, title: 'Hive 5', leftValue: 80, rightValue: 20 },
    { id: 6, title: 'Hive 6', leftValue: 30, rightValue: 70 },
    { id: 7, title: 'Hive 7', leftValue: 40, rightValue: 60 },
    { id: 8, title: 'Hive 8', leftValue: 90, rightValue: 10 },
    { id: 9, title: 'Hive 9', leftValue: 55, rightValue: 45 },
  ];

  const handleIconClick = (id) => {
    // Toggle selection
    setSelectedIconId(selectedIconId === id ? null : id);
  };

  return (
    <Grid container spacing={2}>
      {iconsData.map((iconData) => (
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