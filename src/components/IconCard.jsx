import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

function IconCard({ data, isSelected, onClick }) {
  const { title, leftValue, rightValue } = data;

  const sampleData = [
    { time: 'Jan', value: Math.random() * 100 },
    { time: 'Feb', value: Math.random() * 100 },
    { time: 'Mar', value: Math.random() * 100 },
    { time: 'Apr', value: Math.random() * 100 },
    { time: 'May', value: Math.random() * 100 },
    { time: 'Jun', value: Math.random() * 100 },
    { time: 'Jul', value: Math.random() * 100 },
    { time: 'Aug', value: Math.random() * 100 },
    { time: 'Sep', value: Math.random() * 100 },
    { time: 'Oct', value: Math.random() * 100 },
    { time: 'Nov', value: Math.random() * 100 },
    { time: 'Dec', value: Math.random() * 100 },
  ];

  return (
    <Card
      variant="outlined"
      sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', p: 2 }}
      onClick={() => onClick(data.id)}
    >
      {isSelected ? (
        <Box sx={{ width: '100%', height: 300 }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <ResponsiveContainer width="100%" height="95%">
            <LineChart data={sampleData}>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{ flex: 1, fontSize: '1.5rem', textAlign: 'center' }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              position: 'relative',
              width: 150,
              height: 80,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #9BFAA9 50%, #FC7E7E 50%)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                border: '3px solid #00FF26',
                borderRight: 'none',
                borderRadius: '8px 0 0 8px',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                border: '3px solid #FF0000',
                borderLeft: 'none',
                borderRadius: '0 8px 8px 0',
              },
            }}
          >
            <Typography
              variant="h4"
              color="white"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '25%',
                transform: 'translate(-50%, -50%)',
                fontSize: '1.5rem',
              }}
            >
              {leftValue}
            </Typography>
            <Typography
              variant="h4"
              color="white"
              sx={{
                position: 'absolute',
                top: '50%',
                right: '25%',
                transform: 'translate(50%, -50%)',
                fontSize: '1.5rem',
              }}
            >
              {rightValue}
            </Typography>
          </Box>
        </>
      )}
    </Card>
  );
}

export default IconCard;
