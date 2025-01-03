// src/components/ExpandedCard.jsx
import React from 'react';
import { Dialog, DialogTitle, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  FunnelChart,
  Funnel,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

function ExpandedCard({ parameter, onClose }) {
  console.log('ExpandedCard received parameter:', parameter);

  // Helper function to generate sample data
  const generateSampleData = (param) => {
    switch (param) {
      case 'Temperature':
        return Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          value: parseFloat((Math.random() * 15 + 15).toFixed(1)),
        }));
      case 'Humidity':
        return Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          value: parseFloat((Math.random() * 50 + 30).toFixed(1)),
        }));
      case 'Weight':
        return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
          (day) => ({
            day,
            value: parseFloat((Math.random() * 50 + 50).toFixed(1)),
          })
        );
      case 'Swarming':
        return [
          { name: 'Swarming', value: Math.floor(Math.random() * 10 + 5) },
          { name: 'Non-Swarming', value: Math.floor(Math.random() * 20 + 10) },
        ];
      case 'Brood':
        return Array.from({ length: 4 }, (_, i) => ({
          week: `Week ${i + 1}`,
          healthy: Math.floor(Math.random() * 100 + 200),
          unhealthy: Math.floor(Math.random() * 50 + 50),
        }));
      case 'Ventilation':
        return [
          { location: 'Front', co2: Math.floor(Math.random() * 500 + 400) },
          { location: 'Back', co2: Math.floor(Math.random() * 500 + 400) },
          { location: 'Left', co2: Math.floor(Math.random() * 500 + 400) },
          { location: 'Right', co2: Math.floor(Math.random() * 500 + 400) },
          { location: 'Center', co2: Math.floor(Math.random() * 500 + 400) },
        ];
      case 'Vibrations':
        return Array.from({ length: 10 }, (_, i) => ({
          intensity: i * 10,
          frequency: Math.floor(Math.random() * 50 + 10),
        }));
      case 'Foraging Resources':
        return Array.from({ length: 14 }, (_, i) => ({
          day: `Day ${(i % 7) + 1}`,
          resourceType: ['Nectar', 'Pollen'][Math.floor(Math.random() * 2)],
          amount: Math.floor(Math.random() * 50 + 10),
        }));
      case 'Honey Production':
        return [
          { stage: 'Harvested', amount: 100 },
          { stage: 'Processed', amount: 80 },
          { stage: 'Stored', amount: 60 },
        ];
      default:
        console.warn('No matching data for parameter:', param);
        return [];
    }
  };

  const renderChart = () => {
    console.log('Rendering chart for parameter:', parameter);
    const chartData = generateSampleData(parameter);

    switch (parameter) {
      case 'Temperature':
        // Line Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid stroke="#eee" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'Humidity':
        // Area Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorHumidity)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'Weight':
        // Bar Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'Swarming':
        // Pie Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label={(entry) => `${entry.name}: ${entry.value}`}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'Brood':
        // Stacked Bar Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <XAxis dataKey="week" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="healthy" stackId="a" fill="#82ca9d" name="Healthy Brood" />
              <Bar dataKey="unhealthy" stackId="a" fill="#8884d8" name="Unhealthy Brood" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'Ventilation':
        // Radar Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="location" />
              <PolarRadiusAxis angle={30} domain={[0, 1000]} />
              <Radar
                name="CO₂ Levels"
                dataKey="co2"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        );

      case 'Vibrations':
        // Histogram (Bar Chart)
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <XAxis dataKey="intensity" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="frequency" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'Foraging Resources':
        // Bubble Chart
        const formattedData = chartData.map((entry) => ({
          x: entry.day,
          y: entry.resourceType,
          z: entry.amount,
        }));
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="category" dataKey="x" name="Day" />
              <YAxis type="category" dataKey="y" name="Resource Type" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                name="Foraging Resources"
                data={formattedData}
                fill="#8884d8"
              >
                {formattedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} radius={entry.z / 2} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        );

      case 'Honey Production':
        // Funnel Chart
        return (
          <ResponsiveContainer width="100%" height={400}>
            <FunnelChart>
              <Tooltip />
              <Funnel dataKey="amount" data={chartData} isAnimationActive labelKey="stage">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#8884d8" />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        );

      default:
        console.warn('No matching chart for parameter:', parameter);
        return <p>No data available for this parameter.</p>;
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        {parameter}
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
      <Box sx={{ padding: 2 }}>{renderChart()}</Box>
    </Dialog>
  );
}

export default ExpandedCard;