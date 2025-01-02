// src/pages/HiveMetrics.jsx
import React from 'react';
import { Grid, Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';

function HiveMetrics() {
  const hivesData = [
    {
      id: 1,
      damagePercentage: 10,
      foodQuantity: 50,
      needsRestocking: false,
      lastRepaired: '2023-09-15',
    },
    {
      id: 2,
      damagePercentage: 25,
      foodQuantity: 20,
      needsRestocking: true,
      lastRepaired: '2023-08-10',
    },
    // Add more hives as needed
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Hive Metrics
      </Typography>
      <Grid container spacing={2}>
        {hivesData.map((hive) => (
          <Grid item xs={12} sm={6} md={4} key={hive.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Hive {hive.id}</Typography>
                <Typography variant="body1">
                  Damage Percentage:
                  <Box sx={{ width: '100%', mt: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={hive.damagePercentage}
                      color="error"
                    />
                  </Box>
                </Typography>
                <Typography variant="body1">
                  Food Quantity: {hive.foodQuantity} kg
                </Typography>
                {hive.needsRestocking && (
                  <Typography variant="body2" color="error">
                    Needs Restocking!
                  </Typography>
                )}
                <Typography variant="body1">
                  Last Repaired: {hive.lastRepaired}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default HiveMetrics;