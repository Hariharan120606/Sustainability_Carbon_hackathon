import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Leaf, TrendingUp, Building, AlertCircle } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CarbonEmission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('carbon');

  // Mock data for demonstration
  const mockWarehouses = [
    { id: 1, name: 'North Warehouse', carbonfootprint: 1250 },
    { id: 2, name: 'South Distribution Center', carbonfootprint: 890 },
    { id: 3, name: 'East Regional Hub', carbonfootprint: 1560 },
    { id: 4, name: 'West Coast Facility', carbonfootprint: 2100 },
    { id: 5, name: 'Central Processing', carbonfootprint: 780 },
  ];

  const totalEmissions = mockWarehouses.reduce((sum, wh) => sum + (wh.carbonfootprint || 0), 0);
  const avgEmissions = totalEmissions / mockWarehouses.length;
  const highestEmitter = mockWarehouses.reduce((max, wh) => 
    (wh.carbonfootprint || 0) > (max.carbonfootprint || 0) ? wh : max, mockWarehouses[0]);

  const getEmissionLevel = (value) => {
    if (value < 1000) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
    if (value < 1500) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading carbon emission data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="bg-red-900/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-8 max-w-md mx-4">
          <div className="flex items-center gap-4 text-red-400">
            <AlertCircle className="h-8 w-8" />
            <span className="text-xl font-semibold">Error Loading Data</span>
          </div>
          <p className="text-red-300 mt-4 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-emerald-500/20 backdrop-blur-sm rounded-2xl border border-emerald-500/30 shadow-lg">
              <Leaf className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-5xl font-bold text-white">
              Carbon Emission Dashboard
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monitor and track carbon footprint across all warehouse facilities
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-3xl font-bold text-white">
                {totalEmissions.toLocaleString()}
              </span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-1">Total Emissions</h3>
            <p className="text-gray-400">kg CO₂ across all facilities</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                <Building className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-3xl font-bold text-white">
                {Math.round(avgEmissions).toLocaleString()}
              </span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-1">Average Emissions</h3>
            <p className="text-gray-400">kg CO₂ per facility</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <AlertCircle className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-3xl font-bold text-white">
                {mockWarehouses.length}
              </span>
            </div>
            <h3 className="text-white text-lg font-semibold mb-1">Active Facilities</h3>
            <p className="text-gray-400">Monitored locations</p>
          </div>
        </div>

        {/* Warehouse Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {mockWarehouses.map((wh, index) => {
            const emissionData = getEmissionLevel(wh.carbonfootprint || 0);
            return (
              <div
                key={wh.id}
                className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <Building className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {wh.name}
                      </h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        emissionData.level === 'Low' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : emissionData.level === 'Medium' 
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {emissionData.level} Impact
                      </span>
                    </div>
                  </div>
                </div>

                {/* Emission Value */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold text-white">
                      {(wh.carbonfootprint || 0).toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm">kg CO₂</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${Math.min((wh.carbonfootprint || 0) / 2500 * 100, 100)}%`
                      }}
                    />
                  </div>
                </div>

                {/* Chart */}
                <div className="h-32 mb-6 bg-slate-900/50 rounded-xl p-3 border border-slate-700/30">
                  <Bar
                    data={{
                      labels: ['Current'],
                      datasets: [
                        {
                          label: 'kg CO₂',
                          data: [wh.carbonfootprint || 0],
                          backgroundColor: 'rgba(59, 130, 246, 0.8)',
                          borderColor: 'rgba(59, 130, 246, 1)',
                          borderWidth: 2,
                          borderRadius: 8,
                          barThickness: 40,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: 'rgba(30, 41, 59, 0.95)',
                          titleColor: 'white',
                          bodyColor: 'white',
                          borderColor: 'rgba(148, 163, 184, 0.3)',
                          borderWidth: 1,
                          cornerRadius: 8,
                          callbacks: {
                            label: (context) => `${context.raw.toLocaleString()} kg CO₂`,
                          },
                        },
                      },
                      scales: {
                        x: { 
                          display: false,
                          grid: { display: false }
                        },
                        y: { 
                          beginAtZero: true, 
                          display: false,
                          grid: { display: false }
                        },
                      },
                    }}
                  />
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                  View Details
                </button>
              </div>
            );
          })}
        </div>

        {/* Summary Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Leaf className="w-6 h-6 text-emerald-400" />
              Emission Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Highest Emitter</h3>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                  <p className="text-emerald-400 font-medium">{highestEmitter.name}</p>
                  <p className="text-white text-2xl font-bold">{highestEmitter.carbonfootprint?.toLocaleString()} kg CO₂</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Environmental Impact</h3>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                  <p className="text-blue-400 font-medium">Total Carbon Footprint</p>
                  <p className="text-white text-2xl font-bold">{totalEmissions.toLocaleString()} kg CO₂</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="bg-slate-800/80 backdrop-blur-xl rounded-xl p-4 max-w-md mx-auto border border-slate-700/50">
            <p className="text-gray-300 font-medium mb-1">Last updated: {new Date().toLocaleString()}</p>
            <p className="text-gray-500 text-sm">Real-time monitoring system</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonEmission;