import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Charts = () => {
  const data = {
    labels: ['10 AM', '11 AM', '12 PM', '1 PM'],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [39, 40, 41, 42],
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="text-lg font-semibold mb-2">Temperature Trend</h3>
      <Line data={data} />
    </div>
  );
};

export default Charts;
