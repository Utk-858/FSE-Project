import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { 
  Cloud, 
  Droplets, 
  Wind, 
  Gauge, 
  Eye, 
  Sun, 
  ThermometerSun, 
  CloudSun, 
  Clock, 
  MapPin, 
  Calendar 
} from 'lucide-react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('day');
  
  const data = {
    location: "San Francisco, CA",
    lastUpdated: "Today, 3:45 PM",
    date: "April 22, 2025",
    weatherCondition: "Partly Cloudy",
    temperature: 42,
    humidity: 25,
    pressure: 1012,
    airQuality: 'Moderate',
    windSpeed: 12,
    visibility: 6.5,
    uvIndex: 7,
  };

  const getAQIColor = (quality) => {
    const map = {
      'Good': 'bg-green-100 text-green-800',
      'Moderate': 'bg-yellow-100 text-yellow-800',
      'Poor': 'bg-orange-100 text-orange-800',
      'Unhealthy': 'bg-red-100 text-red-800',
      'Hazardous': 'bg-purple-100 text-purple-800'
    };
    return map[quality] || 'bg-gray-100 text-gray-800';
  };

  const weatherCards = [
    { 
      label: 'Temperature', 
      value: `${data.temperature}°C`, 
      icon: <ThermometerSun className="text-red-500" size={24} />,
      bg: 'bg-red-50',
      color: 'text-red-600'
    },
    { 
      label: 'Humidity', 
      value: `${data.humidity}%`, 
      icon: <Droplets className="text-blue-500" size={24} />,
      bg: 'bg-blue-50',
      color: 'text-blue-600'
    },
    { 
      label: 'Pressure', 
      value: `${data.pressure} hPa`, 
      icon: <Gauge className="text-purple-500" size={24} />,
      bg: 'bg-purple-50',
      color: 'text-purple-600'
    },
    { 
      label: 'Wind Speed', 
      value: `${data.windSpeed} km/h`, 
      icon: <Wind className="text-cyan-500" size={24} />,
      bg: 'bg-cyan-50',
      color: 'text-cyan-600'
    },
    { 
      label: 'Visibility', 
      value: `${data.visibility} km`, 
      icon: <Eye className="text-gray-500" size={24} />,
      bg: 'bg-gray-50',
      color: 'text-gray-600'
    },
    { 
      label: 'UV Index', 
      value: `${data.uvIndex}`, 
      icon: <Sun className="text-yellow-500" size={24} />,
      bg: 'bg-yellow-50',
      color: 'text-yellow-600'
    },
  ];

  // Different data for time range options
  const timeRangeData = {
    day: {
      labels: ['10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'],
      data: [38, 39, 40, 42, 41, 43]
    },
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [36, 38, 42, 45, 40, 38, 41]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [35, 39, 42, 38]
    }
  };

  const graphData = {
    labels: timeRangeData[timeRange].labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: timeRangeData[timeRange].data,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgb(239, 68, 68)',
        pointBorderWidth: 2,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          color: '#6b7280',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#111827',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          labelPointStyle: () => ({
            pointStyle: 'circle',
            rotation: 0
          }),
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
          callback: (value) => `${value}°C`
        },
        grid: {
          color: 'rgba(243, 244, 246, 1)',
          drawBorder: false,
        },
        border: {
          dash: [4, 4],
        }
      },
      x: {
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const timeRangeOptions = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Weather Monitoring Dashboard</h1>
          <div className="text-sm text-gray-500 flex items-center">
            <Clock size={16} className="mr-1" />
            <span>Last updated: {data.lastUpdated}</span>
          </div>
        </div>
        
        {/* Current Conditions Card */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg mb-6 text-white overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side with location and condition */}
            <div className="p-6 flex-1">
              <div className="flex items-center mb-2">
                <MapPin size={18} className="mr-2" />
                <h2 className="text-lg font-medium">{data.location}</h2>
              </div>
              <div className="flex items-center mb-4">
                <Calendar size={16} className="mr-2" />
                <span className="text-sm opacity-90">{data.date}</span>
              </div>
              <div className="flex items-center mb-3">
                <CloudSun size={28} className="mr-3" />
                <span className="text-xl font-medium">{data.weatherCondition}</span>
              </div>
              <div className="mt-2">
                <span className="text-5xl font-bold">{data.temperature}°</span>
                <span className="text-xl ml-1">C</span>
              </div>
            </div>
            
            {/* Right side with additional stats */}
            <div className="bg-white/10 backdrop-blur-sm p-6 flex-1">
              <h3 className="text-sm uppercase tracking-wider mb-4 font-medium opacity-90">Current Conditions</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Droplets size={16} className="mr-2 opacity-80" />
                  <div>
                    <p className="text-xs opacity-80">Humidity</p>
                    <p className="font-medium">{data.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Wind size={16} className="mr-2 opacity-80" />
                  <div>
                    <p className="text-xs opacity-80">Wind</p>
                    <p className="font-medium">{data.windSpeed} km/h</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Sun size={16} className="mr-2 opacity-80" />
                  <div>
                    <p className="text-xs opacity-80">UV Index</p>
                    <p className="font-medium">{data.uvIndex}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Cloud size={16} className="mr-2 opacity-80" />
                  <div>
                    <p className="text-xs opacity-80">Air Quality</p>
                    <p className="font-medium">{data.airQuality}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="space-y-6">
          {/* Weather cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {weatherCards.map((item, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300`}
              >
                <div className="flex items-center p-4">
                  <div className={`p-3 rounded-lg ${item.bg} mr-4`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
                    <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Air Quality Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center p-4">
                <div className="p-3 rounded-lg bg-yellow-50 mr-4">
                  <Cloud className="text-yellow-500" size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Air Quality</h3>
                  <div className="mt-1">
                    <span className={`px-2 py-1 text-sm font-medium rounded-full ${getAQIColor(data.airQuality)}`}>
                      {data.airQuality}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-lg font-semibold text-gray-800">Temperature Trend</h2>
              
              {/* Time range selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {timeRangeOptions.map(option => (
                  <button
                    key={option.value}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      timeRange === option.value 
                        ? 'bg-white text-gray-800 shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setTimeRange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chart container with fixed height */}
            <div className="h-64">
              <Line data={graphData} options={graphOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;