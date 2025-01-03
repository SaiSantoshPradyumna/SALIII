import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css'; // Optional theme
import { jsPDF } from 'jspdf';

const DateRangeSelector = ({ onDateRangeChange }) => {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  // Handle date and time change
  const handleDateChange = (selectedDates) => {
    setDateRange(selectedDates);
    if (onDateRangeChange) {
      onDateRangeChange(selectedDates);
    }
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Ensure there are two dates selected
    if (dateRange.length < 2) {
      alert('Please select a start and end date with time.');
      return;
    }

    // Format options to include date and time
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    // Format the selected date and time for the PDF
    const startDate = dateRange[0].toLocaleString('en-US', options);  // Start date and time
    const endDate = dateRange[1].toLocaleString('en-US', options);    // End date and time

    // Add content to the PDF
    doc.text('Selected Date and Time Range:', 10, 10);
    doc.text(`Start: ${startDate}`, 10, 20);
    doc.text(`End: ${endDate}`, 10, 30);

    // Save the PDF
    doc.save('date_range.pdf');
  };

  return (
    <div className="date-range-selector">
      <label>Select Date Range and Time:</label>
      <Flatpickr
        value={dateRange}
        options={{
          mode: 'range',             // Select a range of dates
          dateFormat: 'Y-m-d H:i',   // Format to include date and time
          enableTime: true,          // Enable time picker
          time_24hr: true,           // Use 24-hour format
          minuteIncrement: 1,        // Increment minutes by 1
        }}
        onChange={handleDateChange}
      />

      {/* Button to download the selected date range as PDF */}
      <button onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default DateRangeSelector;
