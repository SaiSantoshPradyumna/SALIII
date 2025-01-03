import React, { useState, useEffect } from 'react';
import IconGrid from '../components/IconGrid';
import {
  Typography,
  Box,
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faCodeCompare } from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from 'jspdf';
import Plot from 'react-plotly.js';
import ExpandedCard from '../components/ExpandedCard';

function Dashboard() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [isCompareDialogOpen, setCompareDialogOpen] = useState(false);
  const [isGraphDialogOpen, setGraphDialogOpen] = useState(false);
  const [selectedParams, setSelectedParams] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState(null); // For ExpandedCard
  const [graphData, setGraphData] = useState([]);

  const parameters = [
    'Temperature',
    'Humidity',
    'Weight',
    'Swarming',
    'Brood',
    'Ventilation',
    'Vibrations',
    'Foraging Resources',
    'Honey Production',
  ];

  // Handle parameter selection for comparison
  const handleParamChange = (event) => {
    const value = event.target.name;
    if (selectedParams.includes(value)) {
      setSelectedParams(selectedParams.filter((param) => param !== value));
    } else if (selectedParams.length < 2) {
      setSelectedParams([...selectedParams, value]);
    } else {
      alert('You can select up to 2 parameters.');
    }
  };

  // Handle graph generation for comparison
  const handleGenerateGraph = () => {
    if (selectedParams.length > 0) {
      setGraphDialogOpen(true); // Open the graph dialog
      setCompareDialogOpen(false); // Close the compare dialog
    } else {
      alert('Please select at least one parameter.');
    }
  };

  // Handle PDF Download
  const handleDownload = () => {
    if (dateRange.length < 2) {
      alert('Please select a start and end date with time.');
      return;
    }

    const doc = new jsPDF();
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    const startDate = dateRange[0].toLocaleString('en-US', options);
    const endDate = dateRange[1].toLocaleString('en-US', options);

    doc.text('Selected Date and Time Range:', 10, 10);
    doc.text(`Start: ${startDate}`, 10, 20);
    doc.text(`End: ${endDate}`, 10, 30);
    doc.save('date_range.pdf');
  };

  // Handle opening the ExpandedCard when an icon is clicked
  const handleIconClick = (parameter) => {
    console.log('Icon clicked:', parameter);
    setSelectedParameter(parameter);
  };

  // Handle closing the ExpandedCard
  const handleCloseExpanded = () => {
    setSelectedParameter(null);
  };

  // Generate graph data when selected parameters change
  useEffect(() => {
    if (isGraphDialogOpen && selectedParams.length > 0) {
      // Generate sample data for the selected parameters
      const generateSampleData = (param) => {
        switch (param) {
          case 'Temperature':
            return Array.from({ length: 24 }, (_, i) => ({
              x: i,
              y: Math.random() * 15 + 15, // Random temperature between 15°C and 30°C
            }));
          case 'Humidity':
            return Array.from({ length: 24 }, (_, i) => ({
              x: i,
              y: Math.random() * 50 + 30, // Random humidity between 30% and 80%
            }));
          case 'Weight':
            return Array.from({ length: 24 }, (_, i) => ({
              x: i,
              y: Math.random() * 5 + 70, // Random weight between 70kg and 75kg
            }));
          // Add cases for other parameters with sample data
          default:
            return [];
        }
      };

      // Create traces for each selected parameter
      const traces = selectedParams.map((param) => {
        const data = generateSampleData(param);
        return {
          x: data.map((point) => point.x),
          y: data.map((point) => point.y),
          type: 'scatter',
          mode: 'lines+markers',
          name: param,
        };
      });

      setGraphData(traces);
    }
  }, [isGraphDialogOpen, selectedParams]);

  return (
    <Box sx={{ padding: '16px' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* Dashboard Title */}
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {/* Compare Icon, Calendar, and Download Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Compare Icon */}
          <IconButton color="primary" onClick={() => setCompareDialogOpen(true)}>
            <FontAwesomeIcon icon={faCodeCompare} />
          </IconButton>

          {/* Calendar Picker */}
          <Flatpickr
            value={dateRange}
            options={{
              mode: 'range',
              dateFormat: 'Y-m-d H:i',
              enableTime: true,
              time_24hr: true,
              minuteIncrement: 1,
            }}
            onChange={(selectedDates) => {
              if (selectedDates.length === 2) {
                setDateRange([selectedDates[0], selectedDates[1]]);
              }
            }}
          />

          {/* Download Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            sx={{ height: 'fit-content' }}
          >
            <FontAwesomeIcon icon={faDownload} style={{ marginRight: '8px' }} />
            Download PDF
          </Button>
        </Box>
      </Stack>

      {/* Icon Grid */}
      <IconGrid onIconClick={handleIconClick} />

      {/* Compare Parameters Dialog */}
      <Dialog open={isCompareDialogOpen} onClose={() => setCompareDialogOpen(false)}>
        <DialogTitle>Select Parameters to Compare</DialogTitle>
        <DialogContent>
          <FormGroup>
            {parameters.map((param) => (
              <FormControlLabel
                key={param}
                control={
                  <Checkbox
                    name={param}
                    checked={selectedParams.includes(param)}
                    onChange={handleParamChange}
                    disabled={!selectedParams.includes(param) && selectedParams.length >= 2}
                  />
                }
                label={param}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGenerateGraph} variant="contained" color="primary">
            Generate Graph
          </Button>
          <Button onClick={() => setCompareDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Graph Display Dialog */}
      <Dialog
        open={isGraphDialogOpen}
        onClose={() => setGraphDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {selectedParams.length === 1
            ? `Visualization: ${selectedParams[0]}`
            : `Comparison: ${selectedParams[0]} and ${selectedParams[1]}`}
        </DialogTitle>
        <DialogContent>
          {graphData.length > 0 ? (
            <Plot
              data={graphData}
              layout={{
                width: 700,
                height: 500,
                title:
                  selectedParams.length === 1
                    ? `Visualization of ${selectedParams[0]}`
                    : `Comparison of ${selectedParams[0]} and ${selectedParams[1]}`,
                xaxis: { title: 'Time (hours)' },
                yaxis: { title: 'Value' },
              }}
            />
          ) : (
            <Typography>No data available for the selected parameters.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGraphDialogOpen(false)} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* ExpandedCard Dialog for Parameter Details */}
      {selectedParameter && (
        <ExpandedCard parameter={selectedParameter} onClose={handleCloseExpanded} />
      )}
    </Box>
  );
}

export default Dashboard;