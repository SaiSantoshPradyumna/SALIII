// src/pages/Weather.jsx
import React, { useState } from 'react';
import { Grid, Card, CardActionArea, Typography, Box } from '@mui/material';
import ExpandedCard from '../components/ExpandedCard';

function Weather() {
  const [selectedMetric, setSelectedMetric] = useState(null);

  const weatherData = [
    { id: 1, title: 'Temperature', leftValue: '25°C', rightValue: 'High' },
    { id: 2, title: 'Humidity', leftValue: '60%', rightValue: 'Moderate' },
    { id: 3, title: 'Wind Speed', leftValue: '15 km/h', rightValue: 'Low' },
    // Add more weather metrics as needed
  ];

  const handleMetricClick = (data) => {
    setSelectedMetric(data);
  };

  const handleCloseExpanded = () => {
    setSelectedMetric(null);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Weather
      </Typography>
      <Grid container spacing={2}>
        {weatherData.map((data) => (
          <Grid item xs={12} sm={6} md={4} key={data.id}>
            <Card variant="outlined">
              <CardActionArea onClick={() => handleMetricClick(data)}>
                <Box
                  sx={{
                    height: 150,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #2196f3 50%, #ff9800 50%)',
                    borderRadius: 2,
                    position: 'relative',
                    color: '#fff',
                  }}
                >
                  <Typography variant="h6" align="center" sx={{ mb: 1 }}>
                    {data.title}
                  </Typography>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '30%',
                      left: '25%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <Typography variant="h5">{data.leftValue}</Typography>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '30%',
                      right: '25%',
                      transform: 'translate(50%, 50%)',
                    }}
                  >
                    <Typography variant="h5">{data.rightValue}</Typography>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedMetric && (
        <ExpandedCard data={selectedMetric} onClose={handleCloseExpanded} />
      )}
    </>
  );
}

export default Weather;