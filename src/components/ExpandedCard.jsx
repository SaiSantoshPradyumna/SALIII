// src/components/ExpandedCard.jsx
import React from 'react';
import { Dialog, DialogTitle, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

function ExpandedCard({ data, onClose }) {
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
    <Dialog open onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        {data.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 500, // Adjust as per your requirement
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: '80%', // Box width for the graph
            height: '100%', // Full height of the container
          }}
        >
          <ResponsiveContainer width="100%" height="90%">
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
    </Dialog>
  );
}

export default ExpandedCard;
