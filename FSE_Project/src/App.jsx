import React from 'react';
import Dashboard from './components/Dashboard';
import Charts from './components/Charts';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Automated Weather Monitoring</h1>
      <Dashboard />
      <Charts />
    </div>
  );
}

export default App;
