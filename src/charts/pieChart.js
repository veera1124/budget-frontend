import React from 'react';
import { Pie } from 'react-chartjs-2';
import chroma from 'chroma-js'; // Import Chroma.js library

const PieChart = (props) => {
  const labels = props.labels;
  const dataPoints = props.data;

  // Generate a range of colors using Chroma.js
  const colorScale = chroma.scale(['#FF6347', '#87CEEB', '#32CD32']).mode('lch').colors(dataPoints.length);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: colorScale,
        borderColor: colorScale.map(color => chroma(color).darken().hex()), // Darken border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
