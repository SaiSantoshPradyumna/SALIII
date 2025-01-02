// src/components/IconCard.jsx
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

  // Sample data for the graph
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
      sx={{ cursor: 'pointer' }}
      onClick={() => onClick(data.id)}
    >
      {isSelected ? (
        // Render the expanded graph
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Box sx={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleData}>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      ) : (
        // Render the icon view
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
          }}
        >
          {/* Title beside the box */}
          <Typography variant="h6" sx={{ mr: 2, minWidth: 80 }}>
            {title}
          </Typography>
          {/* Box with diagonal division */}
          <Box
            sx={{
              position: 'relative',
              width: 150,
              height: 100,
              borderRadius: 2,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, green 50%, red 50%)',
            }}
          >
            {/* Left Value */}
            <Typography
              variant="h4"
              color="white"
              sx={{
                position: 'absolute',
                top: '25%',
                left: '25%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {leftValue}
            </Typography>
            {/* Right Value */}
            <Typography
              variant="h4"
              color="white"
              sx={{
                position: 'absolute',
                bottom: '25%',
                right: '25%',
                transform: 'translate(50%, 50%)',
              }}
            >
              {rightValue}
            </Typography>
          </Box>
        </Box>
      )}
    </Card>
  );
}

export default IconCard;