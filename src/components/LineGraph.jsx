'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ horizontal_values, vertical_values}) => {

  const chartData = {
    labels: horizontal_values,
    datasets: [
      {
        label: 'Temperatura Media (°C)',
        data: vertical_values,
        borderColor: 'red',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: false,
        text: "Title",
      },
    },
  };

  return (
      <div className="w-full h-full">
        <Line 
          data={chartData} options={options} 
          className = "text-xl text-maiz"
        />
      </div>
  );
};

export default LineGraph;
