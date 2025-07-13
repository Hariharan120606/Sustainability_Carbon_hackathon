import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWarehouses } from '../features/warehouseActions';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Leaf, TrendingUp, Building, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CarbonEmission = () => {
  const dispatch = useDispatch();
  const { warehouses, loading, error } = useSelector((state) => state.warehouse);
  const [selectedMetric, setSelectedMetric] = useState('carbon');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  const mockWarehouses = warehouses?.length ? warehouses : [
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading carbon emission data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 text-red-400">
            <AlertCircle className="h-6 w-6" />
            <span className="text-lg font-semibold">Error Loading Data</span>
          </div>
          <p className="text-red-300 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} link_av="Dashboard" />

      <div style={{
        flexGrow: 1,
        transition: 'margin-left 0.3s ease',
        marginLeft: sidebarOpen ? '200px' : '0px'
      }}>
        <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      position: 'relative'
    }}>
      {/* Animated background elements */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        overflow: 'hidden',
        zIndex: 1
      }}>
        <div style={{ 
          position: 'absolute', 
          top: '-160px', 
          right: '-160px', 
          width: '320px', 
          height: '320px', 
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{ 
          position: 'absolute', 
          bottom: '-160px', 
          left: '-160px', 
          width: '320px', 
          height: '320px', 
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite 3s'
        }}></div>
        <div style={{ 
          position: 'absolute', 
          top: '20%', 
          left: '20%', 
          width: '200px', 
          height: '200px', 
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite 1.5s'
        }}></div>
      </div>

      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        width: '100%',
        padding: '32px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '12px', 
            marginBottom: '16px' 
          }}>
            <div style={{ 
              padding: '12px', 
              background: 'rgba(16, 185, 129, 0.2)', 
              borderRadius: '50%', 
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              marginTop : "30px"
            }}>
              <Leaf style={{ width: '32px', height: '32px', color: '#10b981' }} />
            </div>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: 'bold', 
              color: 'white', 
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              marginTop : "30px"
            }}>
              Carbon Emission Dashboard
            </h1>
          </div>
          <p style={{ 
            fontSize: '20px', 
            color: 'rgba(255, 255, 255, 0.8)', 
            maxWidth: '768px', 
            margin: '0 auto'
          }}>
            Monitor and track carbon footprint across all warehouse facilities
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px', 
          marginBottom: '48px', 
          maxWidth: '1200px', 
          margin: '0 auto 48px' 
        }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(20px)', 
            borderRadius: '16px', 
            padding: '24px', 
            border: '1px solid rgba(255, 255, 255, 0.2)', 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 25px 30px -5px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '16px' 
            }}>
              <div style={{ 
                padding: '12px', 
                background: 'rgba(59, 130, 246, 0.2)', 
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                <TrendingUp style={{ width: '24px', height: '24px', color: '#3b82f6' }} />
              </div>
              <span style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                {totalEmissions.toLocaleString()}
              </span>
            </div>
            <h3 style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontSize: '16px', 
              fontWeight: '600',
              marginBottom: '4px'
            }}>
              Total Emissions
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              fontSize: '14px' 
            }}>
              kg CO₂ across all facilities
            </p>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(20px)', 
            borderRadius: '16px', 
            padding: '24px', 
            border: '1px solid rgba(255, 255, 255, 0.2)', 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 25px 30px -5px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '16px' 
            }}>
              <div style={{ 
                padding: '12px', 
                background: 'rgba(16, 185, 129, 0.2)', 
                borderRadius: '12px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <Building style={{ width: '24px', height: '24px', color: '#10b981' }} />
              </div>
              <span style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                {Math.round(avgEmissions).toLocaleString()}
              </span>
            </div>
            <h3 style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontSize: '16px', 
              fontWeight: '600',
              marginBottom: '4px'
            }}>
              Average Emissions
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              fontSize: '14px' 
            }}>
              kg CO₂ per facility
            </p>
          </div>

          <div style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(20px)', 
            borderRadius: '16px', 
            padding: '24px', 
            border: '1px solid rgba(255, 255, 255, 0.2)', 
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 25px 30px -5px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: '16px' 
            }}>
              <div style={{ 
                padding: '12px', 
                background: 'rgba(239, 68, 68, 0.2)', 
                borderRadius: '12px',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                <AlertCircle style={{ width: '24px', height: '24px', color: '#ef4444' }} />
              </div>
              <span style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: 'white',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                {mockWarehouses.length}
              </span>
            </div>
            <h3 style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontSize: '16px', 
              fontWeight: '600',
              marginBottom: '4px'
            }}>
              Active Facilities
            </h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.6)', 
              fontSize: '14px' 
            }}>
              Monitored locations
            </p>
          </div>
        </div>

        {/* Warehouse Cards Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '32px', 
          maxWidth: '1400px', 
          margin: '0 auto' 
        }}>
          {mockWarehouses.map((wh, index) => {
            const emissionData = getEmissionLevel(wh.carbonfootprint || 0);
            return (
              <div
                key={wh.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.5s ease',
                  cursor: 'pointer',
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 25px 35px -5px rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                {/* Card Header */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  marginBottom: '24px' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      padding: '8px', 
                      background: 'rgba(59, 130, 246, 0.2)', 
                      borderRadius: '8px',
                      border: '1px solid rgba(59, 130, 246, 0.3)'
                    }}>
                      <Building style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                    </div>
                    <div>
                      <h3 style={{ 
                        color: 'white', 
                        fontWeight: '600', 
                        fontSize: '20px',
                        marginBottom: '4px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}>
                        {wh.name}
                      </h3>
                      <span style={{ 
                        fontSize: '12px', 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        background: emissionData.level === 'Low' ? 'rgba(16, 185, 129, 0.2)' : 
                                   emissionData.level === 'Medium' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: emissionData.level === 'Low' ? '#10b981' : 
                               emissionData.level === 'Medium' ? '#f59e0b' : '#ef4444',
                        border: `1px solid ${emissionData.level === 'Low' ? 'rgba(16, 185, 129, 0.3)' : 
                                              emissionData.level === 'Medium' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                        fontWeight: '500'
                      }}>
                        {emissionData.level} Impact
                      </span>
                    </div>
                  </div>
                </div>

                {/* Emission Value */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'baseline', 
                    gap: '8px', 
                    marginBottom: '8px' 
                  }}>
                    <span style={{ 
                      fontSize: '36px', 
                      fontWeight: 'bold', 
                      color: 'white',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}>
                      {(wh.carbonfootprint || 0).toLocaleString()}
                    </span>
                    <span style={{ 
                      color: 'rgba(255, 255, 255, 0.6)', 
                      fontSize: '16px' 
                    }}>
                      kg CO₂
                    </span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    background: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: '8px', 
                    height: '8px',
                    overflow: 'hidden'
                  }}>
                    <div
                      style={{
                        background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
                        height: '8px',
                        borderRadius: '8px',
                        transition: 'all 1s ease',
                        width: `${Math.min((wh.carbonfootprint || 0) / 2500 * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Chart */}
                <div style={{ height: '140px', marginBottom: '20px' }}>
                  <Bar
                    data={{
                      labels: ['Current Emissions'],
                      datasets: [
                        {
                          label: 'kg CO₂',
                          data: [wh.carbonfootprint || 0],
                          backgroundColor: 'rgba(59, 130, 246, 0.6)',
                          borderColor: 'rgba(59, 130, 246, 1)',
                          borderWidth: 2,
                          borderRadius: 8,
                          barThickness: 50,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          titleColor: 'white',
                          bodyColor: 'white',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          borderWidth: 1,
                          callbacks: {
                            label: (context) => `${context.raw.toLocaleString()} kg CO₂`,
                          },
                        },
                      },
                      scales: {
                        x: {
                          display: false,
                        },
                        y: {
                          beginAtZero: true,
                          display: false,
                        },
                      },
                    }}
                  />
                </div>

                {/* Action Button */}
                <button style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  color: 'white',
                  fontWeight: '600',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '16px',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1)';
                }}>
                  View Details
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p className="text-sm">Last updated: {new Date().toLocaleString()}</p>
          <p className="text-xs mt-1">Real-time carbon emission monitoring system</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
      </div>
    </div>
  );
};

export default CarbonEmission;
