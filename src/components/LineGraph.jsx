'use client'
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ horizontal_values, vertical_values, titulo }) => {
//   const horizontal_values = data.slice(-7).map(item => item.fecha);
//   const vertical_values = data.slice(-7).map(item => item.temperatura_media);

  const chartData = {
    labels: horizontal_values,
    datasets: [
      {
        label: 'Temperatura Media (°C)',
        data: vertical_values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${titulo}`,
      },
    },
  };

  return (
    <div className="flex flex-col px-4 text-maiz mb-10">
      <div className="container flex flex-col">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineGraph;
