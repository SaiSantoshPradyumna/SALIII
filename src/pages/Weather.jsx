import React, { useState, useEffect } from 'react';
import IconGrid from '../components/IconGrid2';
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

function WeatherDashboard() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [isCompareDialogOpen, setCompareDialogOpen] = useState(false);
  const [isGraphDialogOpen, setGraphDialogOpen] = useState(false);
  const [selectedParams, setSelectedParams] = useState([]);
  const [selectedParameter, setSelectedParameter] = useState(null);
  const [graphData, setGraphData] = useState([]);

  const weatherParameters = [
    'Heat Index',
    'Dew Point',
    'Vapor Pressure Deficit',
    'Wind Chill',
    'Relative Humidity Ratio',
    'Wet Bulb Temperature',
    'Atmospheric Pressure Gradient',
    'Cloud Base Height',
    'Specific Humidity',
    'Evapotranspiration Rate',
    'Solar Insolation Duration',
    'Heat Stress Index',
  ];

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

  const handleGenerateGraph = () => {
    if (selectedParams.length > 0) {
      setGraphDialogOpen(true);
      setCompareDialogOpen(false);
    } else {
      alert('Please select at least one parameter.');
    }
  };

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

  const handleIconClick = (parameter) => {
    setSelectedParameter(parameter);
  };

  const handleCloseExpanded = () => {
    setSelectedParameter(null);
  };

  useEffect(() => {
    if (isGraphDialogOpen && selectedParams.length > 0) {
      const generateSampleData = (param) => {
        return Array.from({ length: 24 }, (_, i) => ({
          x: i,
          y: Math.random() * 100,
        }));
      };

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
        <Typography variant="h4" gutterBottom>
          Weather Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <IconButton color="primary" onClick={() => setCompareDialogOpen(true)}>
            <FontAwesomeIcon icon={faCodeCompare} />
          </IconButton>
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
      <IconGrid parameters={weatherParameters} onIconClick={handleIconClick} />
      <Dialog open={isCompareDialogOpen} onClose={() => setCompareDialogOpen(false)}>
        <DialogTitle>Select Parameters to Compare</DialogTitle>
        <DialogContent>
          <FormGroup>
            {weatherParameters.map((param) => (
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
      <Dialog open={isGraphDialogOpen} onClose={() => setGraphDialogOpen(false)} fullWidth maxWidth="md">
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
      {selectedParameter && (
        <ExpandedCard parameter={selectedParameter} onClose={handleCloseExpanded} />
      )}
    </Box>
  );
}

export default WeatherDashboard;
