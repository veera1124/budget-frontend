import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: 'Expenses',
        data: props.data,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false, // Set this to false to allow the Y-axis to not start from zero
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
