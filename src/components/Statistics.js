import React, { useState, useEffect } from 'react';
import { Upload, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Package, Eye, EyeOff, BarChart3, PieChart } from 'lucide-react';
import Navbar from './Navbar';

const ProductRecommendationSystem = () => {
  const [trainData, setTrainData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [showDetails, setShowDetails] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Sample training data for demonstration
  const sampleTrainData = [
    { id: 'P001', name: 'Laptop Pro', category: 'Electronics', lastMonthSales: 45, price: 1200, inventory: 25 },
    { id: 'P002', name: 'Wireless Mouse', category: 'Electronics', lastMonthSales: 120, price: 35, inventory: 80 },
    { id: 'P003', name: 'Coffee Maker', category: 'Appliances', lastMonthSales: 30, price: 150, inventory: 15 },
    { id: 'P004', name: 'Running Shoes', category: 'Sports', lastMonthSales: 75, price: 95, inventory: 40 },
    { id: 'P005', name: 'Smartphone', category: 'Electronics', lastMonthSales: 85, price: 800, inventory: 30 },
    { id: 'P006', name: 'Desk Chair', category: 'Furniture', lastMonthSales: 20, price: 250, inventory: 12 },
    { id: 'P007', name: 'Tablet', category: 'Electronics', lastMonthSales: 60, price: 400, inventory: 35 },
    { id: 'P008', name: 'Headphones', category: 'Electronics', lastMonthSales: 95, price: 120, inventory: 50 },
  ];

  const sampleTestData = [
    { id: 'P001', name: 'Laptop Pro', category: 'Electronics', price: 1300, inventory: 45 },
    { id: 'P002', name: 'Wireless Mouse', category: 'Electronics', price: 28, inventory: 150 },
    { id: 'P003', name: 'Coffee Maker', category: 'Appliances', price: 175, inventory: 8 },
    { id: 'P004', name: 'Running Shoes', category: 'Sports', price: 85, inventory: 15 },
    { id: 'P005', name: 'Smartphone', category: 'Electronics', price: 850, inventory: 55 },
    { id: 'P006', name: 'Desk Chair', category: 'Furniture', price: 220, inventory: 3 },
    { id: 'P007', name: 'Tablet', category: 'Electronics', price: 450, inventory: 65 },
    { id: 'P008', name: 'Headphones', category: 'Electronics', price: 130, inventory: 25 },
  ];

  // Load sample data
  useEffect(() => {
    setTrainData(sampleTrainData);
    setTestData(sampleTestData);
  }, []);

  // Recommendation algorithm
  const generateRecommendations = () => {
    setIsTraining(true);
    
    setTimeout(() => {
      const categoryStats = {};
      
      // Calculate category-based statistics from training data
      trainData.forEach(item => {
        if (!categoryStats[item.category]) {
          categoryStats[item.category] = {
            avgPrice: 0,
            avgSales: 0,
            avgInventory: 0,
            count: 0
          };
        }
        
        const cat = categoryStats[item.category];
        cat.avgPrice += item.price;
        cat.avgSales += item.lastMonthSales;
        cat.avgInventory += item.inventory;
        cat.count++;
      });

      // Calculate averages
      Object.keys(categoryStats).forEach(category => {
        const cat = categoryStats[category];
        cat.avgPrice /= cat.count;
        cat.avgSales /= cat.count;
        cat.avgInventory /= cat.count;
      });

      // Generate recommendations for test data
      const recs = testData.map(item => {
        const trainItem = trainData.find(t => t.id === item.id);
        const catStats = categoryStats[item.category];
        
        if (!trainItem || !catStats) return null;

        // Price analysis
        const priceChange = ((item.price - trainItem.price) / trainItem.price) * 100;
        const priceVsCategory = ((item.price - catStats.avgPrice) / catStats.avgPrice) * 100;
        
        let priceStatus = 'optimal';
        if (priceChange > 15 || priceVsCategory > 20) priceStatus = 'overpriced';
        else if (priceChange < -10 || priceVsCategory < -15) priceStatus = 'underpriced';

        // Inventory analysis
        const inventoryRatio = item.inventory / trainItem.lastMonthSales;
        const categoryInventoryRatio = item.inventory / catStats.avgSales;
        
        let stockStatus = 'optimal';
        if (inventoryRatio > 2 || categoryInventoryRatio > 1.5) stockStatus = 'overstock';
        else if (inventoryRatio < 0.5 || categoryInventoryRatio < 0.3) stockStatus = 'understock';

        return {
          ...item,
          lastMonthSales: trainItem.lastMonthSales,
          priceStatus,
          stockStatus,
          priceChange: priceChange.toFixed(1),
          priceVsCategory: priceVsCategory.toFixed(1),
          inventoryRatio: inventoryRatio.toFixed(2),
          recommendations: generateActionItems(priceStatus, stockStatus, priceChange, inventoryRatio)
        };
      }).filter(Boolean);

      setRecommendations(recs);
      setIsTraining(false);
      setActiveTab('results');
    }, 2000);
  };

  const generateActionItems = (priceStatus, stockStatus, priceChange, inventoryRatio) => {
    const actions = [];
    
    if (priceStatus === 'overpriced') {
      actions.push(`Consider reducing price by ${Math.abs(priceChange * 0.3).toFixed(1)}%`);
    } else if (priceStatus === 'underpriced') {
      actions.push(`Opportunity to increase price by ${Math.abs(priceChange * 0.5).toFixed(1)}%`);
    }
    
    if (stockStatus === 'overstock') {
      actions.push(`Reduce inventory by ${((inventoryRatio - 1.5) * 30).toFixed(0)} units`);
      actions.push('Consider promotional pricing to move inventory');
    } else if (stockStatus === 'understock') {
      actions.push(`Increase inventory by ${((1.5 - inventoryRatio) * 50).toFixed(0)} units`);
      actions.push('Monitor for stock-outs');
    }
    
    return actions;
  };

  const getStatusStyle = (status) => {
    const baseStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '8px 12px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '500'
    };

    switch (status) {
      case 'overpriced': 
        return { ...baseStyle, color: '#f87171', backgroundColor: 'rgba(153, 27, 27, 0.3)' };
      case 'underpriced': 
        return { ...baseStyle, color: '#60a5fa', backgroundColor: 'rgba(30, 58, 138, 0.3)' };
      case 'overstock': 
        return { ...baseStyle, color: '#fb923c', backgroundColor: 'rgba(154, 52, 18, 0.3)' };
      case 'understock': 
        return { ...baseStyle, color: '#c084fc', backgroundColor: 'rgba(88, 28, 135, 0.3)' };
      default: 
        return { ...baseStyle, color: '#4ade80', backgroundColor: 'rgba(20, 83, 45, 0.3)' };
    }
  };

  const getStatusIcon = (status) => {
    const iconStyle = { width: '16px', height: '16px', marginRight: '8px' };
    
    switch (status) {
      case 'overpriced': return <TrendingUp style={iconStyle} />;
      case 'underpriced': return <TrendingDown style={iconStyle} />;
      case 'overstock': return <Package style={iconStyle} />;
      case 'understock': return <AlertTriangle style={iconStyle} />;
      default: return <CheckCircle style={iconStyle} />;
    }
  };

  // Simple chart components
  const SimpleBarChart = ({ data, title }) => (
    <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>{title}</h3>
      <div style={{ height: '200px', display: 'flex', alignItems: 'end', gap: '8px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div 
              style={{ 
                width: '100%', 
                backgroundColor: '#8b5cf6', 
                height: `${(item.value / Math.max(...data.map(d => d.value))) * 150}px`,
                borderRadius: '4px 4px 0 0',
                marginBottom: '8px'
              }}
            />
            <span style={{ color: '#d1d5db', fontSize: '12px', textAlign: 'center' }}>
              {item.name.length > 8 ? item.name.substring(0, 8) + '...' : item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const SimplePieChart = ({ data, title }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444', '#10b981'];
    
    return (
      <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>{title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', position: 'relative', overflow: 'hidden' }}>
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: `conic-gradient(${colors[index]} 0% ${percentage}%, transparent ${percentage}% 100%)`,
                    transform: `rotate(${data.slice(0, index).reduce((sum, d) => sum + (d.value / total) * 360, 0)}deg)`
                  }}
                />
              );
            })}
          </div>
          <div style={{ flex: 1 }}>
            {data.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: colors[index], borderRadius: '2px', marginRight: '8px' }} />
                <span style={{ color: '#d1d5db', fontSize: '14px' }}>
                  {item.name}: {item.value} ({((item.value / total) * 100).toFixed(0)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Calculate chart data
  const priceChartData = recommendations.map(item => ({
    name: item.name,
    value: item.price
  }));

  const categoryData = recommendations.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.keys(categoryData).map(category => ({
    name: category,
    value: categoryData[category]
  }));

  const statusDistribution = {
    pricing: recommendations.reduce((acc, item) => {
      acc[item.priceStatus] = (acc[item.priceStatus] || 0) + 1;
      return acc;
    }, {}),
    inventory: recommendations.reduce((acc, item) => {
      acc[item.stockStatus] = (acc[item.stockStatus] || 0) + 1;
      return acc;
    }, {})
  };

  const statusChartData = [
    { name: 'Overpriced', value: statusDistribution.pricing.overpriced || 0 },
    { name: 'Underpriced', value: statusDistribution.pricing.underpriced || 0 },
    { name: 'Optimal', value: statusDistribution.pricing.optimal || 0 }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} link_av="Product Analytics" />
      
      <div
        style={{
          flexGrow: 1,
          transition: 'margin-left 0.3s ease',
          marginLeft: sidebarOpen ? '250px' : '0px',
          marginTop: '60px',
          padding: '16px'
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ backgroundColor: '#000000', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }}>
            <div style={{ padding: '32px' }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
                  Product Recommendation System
                </h1>
                <p style={{ fontSize: '20px', color: '#d1d5db', maxWidth: '768px', margin: '0 auto' }}>
                  AI-powered pricing and inventory optimization with advanced analytics
                </p>
              </div>

              {/* Navigation Tabs */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#1f2937', borderRadius: '8px', padding: '4px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                  {['upload', 'training', 'results', 'analytics'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        padding: '12px 24px',
                        borderRadius: '6px',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        cursor: 'pointer',
                        border: 'none',
                        backgroundColor: activeTab === tab ? '#4f46e5' : 'transparent',
                        color: activeTab === tab ? 'white' : '#d1d5db'
                      }}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Tab */}
              {activeTab === 'upload' && (
                <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
                  <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '32px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
                      <Upload style={{ width: '24px', height: '24px', marginRight: '12px', color: '#6366f1' }} />
                      Data Upload & Preview
                    </h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#e5e7eb' }}>Training Data</h3>
                        <div style={{ backgroundColor: '#374151', borderRadius: '8px', padding: '16px', height: '256px', overflowY: 'auto' }}>
                          <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Sample training data loaded:</div>
                          {trainData.slice(0, 3).map(item => (
                            <div key={item.id} style={{ backgroundColor: '#4b5563', borderRadius: '6px', padding: '12px', marginBottom: '8px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                              <div style={{ fontWeight: '500', color: 'white' }}>{item.name}</div>
                              <div style={{ fontSize: '14px', color: '#d1d5db' }}>
                                Sales: {item.lastMonthSales} | Price: ${item.price} | Stock: {item.inventory}
                              </div>
                            </div>
                          ))}
                          <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '8px' }}>
                            +{trainData.length - 3} more items...
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#e5e7eb' }}>Test Data</h3>
                        <div style={{ backgroundColor: '#374151', borderRadius: '8px', padding: '16px', height: '256px', overflowY: 'auto' }}>
                          <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>Current inventory data:</div>
                          {testData.slice(0, 3).map(item => (
                            <div key={item.id} style={{ backgroundColor: '#4b5563', borderRadius: '6px', padding: '12px', marginBottom: '8px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                              <div style={{ fontWeight: '500', color: 'white' }}>{item.name}</div>
                              <div style={{ fontSize: '14px', color: '#d1d5db' }}>
                                Price: ${item.price} | Stock: {item.inventory}
                              </div>
                            </div>
                          ))}
                          <div style={{ fontSize: '14px', color: '#9ca3af', marginTop: '8px' }}>
                            +{testData.length - 3} more items...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Training Tab */}
              {activeTab === 'training' && (
                <div style={{ maxWidth: '512px', margin: '0 auto' }}>
                  <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '32px', textAlign: 'center', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>Model Training</h2>
                    
                    {!isTraining && recommendations.length === 0 && (
                      <div>
                        <div style={{ marginBottom: '24px' }}>
                          <div style={{ width: '64px', height: '64px', backgroundColor: '#312e81', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                            <TrendingUp style={{ width: '32px', height: '32px', color: '#6366f1' }} />
                          </div>
                          <p style={{ color: '#d1d5db', marginBottom: '24px' }}>
                            Ready to train the recommendation model with your data
                          </p>
                        </div>
                        
                        <button
                          onClick={generateRecommendations}
                          style={{
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            padding: '12px 32px',
                            borderRadius: '8px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
                        >
                          Start Training
                        </button>
                      </div>
                    )}

                    {isTraining && (
                      <div>
                        <div style={{ marginBottom: '24px' }}>
                          <div style={{ 
                            width: '64px', 
                            height: '64px', 
                            backgroundColor: '#312e81', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            margin: '0 auto 16px',
                            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                          }}>
                            <TrendingUp style={{ width: '32px', height: '32px', color: '#6366f1' }} />
                          </div>
                          <p style={{ color: '#d1d5db', marginBottom: '16px' }}>Training model...</p>
                          <div style={{ width: '100%', backgroundColor: '#374151', borderRadius: '4px', height: '8px' }}>
                            <div style={{ 
                              backgroundColor: '#4f46e5', 
                              height: '8px', 
                              borderRadius: '4px', 
                              width: '65%',
                              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                            }}></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {recommendations.length > 0 && (
                      <div>
                        <div style={{ marginBottom: '24px' }}>
                          <div style={{ width: '64px', height: '64px', backgroundColor: '#14532d', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                            <CheckCircle style={{ width: '32px', height: '32px', color: '#22c55e' }} />
                          </div>
                          <p style={{ color: '#d1d5db', marginBottom: '16px' }}>Training completed successfully!</p>
                          <div style={{ backgroundColor: 'rgba(20, 83, 45, 0.3)', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', fontSize: '14px' }}>
                              <div>
                                <div style={{ fontWeight: '500', color: '#22c55e' }}>Products Analyzed</div>
                                <div style={{ color: '#86efac' }}>{recommendations.length}</div>
                              </div>
                              <div>
                                <div style={{ fontWeight: '500', color: '#22c55e' }}>Categories</div>
                                <div style={{ color: '#86efac' }}>{Object.keys(categoryData).length}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => setActiveTab('results')}
                          style={{
                            backgroundColor: '#16a34a',
                            color: 'white',
                            padding: '12px 32px',
                            borderRadius: '8px',
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
                        >
                          View Results
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Results Tab */}
              {activeTab === 'results' && recommendations.length > 0 && (
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                  <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '32px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '24px' }}>Recommendations</h2>
                    
                    <div style={{ display: 'grid', gap: '24px' }}>
                      {recommendations.map(item => (
                        <div key={item.id} style={{ border: '1px solid #374151', borderRadius: '8px', padding: '24px', transition: 'box-shadow 0.2s' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <div>
                              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white' }}>{item.name}</h3>
                              <p style={{ color: '#d1d5db' }}>{item.category}</p>
                            </div>
                            <button
                              onClick={() => setShowDetails(prev => ({...prev, [item.id]: !prev[item.id]}))}
                              style={{
                                color: '#6366f1',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              {showDetails[item.id] ? <EyeOff style={{ width: '16px', height: '16px' }} /> : <Eye style={{ width: '16px', height: '16px' }} />}
                            </button>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '16px' }}>
                            <div>
                              <h4 style={{ fontWeight: '500', color: 'white', marginBottom: '8px' }}>Price Analysis</h4>
                              <div style={getStatusStyle(item.priceStatus)}>
                                {getStatusIcon(item.priceStatus)}
                                <span style={{ textTransform: 'capitalize' }}>{item.priceStatus}</span>
                              </div>
                              <div style={{ marginTop: '8px', fontSize: '14px', color: '#d1d5db' }}>
                                <div>Current: ${item.price}</div>
                                <div>Change: {item.priceChange > 0 ? '+' : ''}{item.priceChange}%</div>
                              </div>
                            </div>

                            <div>
                              <h4 style={{ fontWeight: '500', color: 'white', marginBottom: '8px' }}>Inventory Analysis</h4>
                              <div style={getStatusStyle(item.stockStatus)}>
                                {getStatusIcon(item.stockStatus)}
                                <span style={{ textTransform: 'capitalize' }}>{item.stockStatus}</span>
                              </div>
                              <div style={{ marginTop: '8px', fontSize: '14px', color: '#d1d5db' }}>
                                <div>Current: {item.inventory} units</div>
                                <div>Ratio: {item.inventoryRatio}</div>
                              </div>
                            </div>
                          </div>

                          {showDetails[item.id] && (
                            <div style={{ borderTop: '1px solid #374151', paddingTop: '16px' }}>
                              <h4 style={{ fontWeight: '500', color: 'white', marginBottom: '12px' }}>Action Items</h4>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {item.recommendations.map((rec, idx) => (
                                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                                    <CheckCircle style={{ width: '16px', height: '16px', color: '#22c55e', marginRight: '8px', marginTop: '2px', flexShrink: 0 }} />
                                    <span style={{ fontSize: '14px', color: '#d1d5db' }}>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && recommendations.length > 0 && (
                <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                  <div style={{ display: 'grid', gap: '32px' }}>
                    
                    {/* Summary Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                      <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <p style={{ fontSize: '14px', color: '#9ca3af' }}>Total Products</p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{recommendations.length}</p>
                          </div>
                          <Package style={{ width: '32px', height: '32px', color: '#6366f1' }} />
                        </div>
                      </div>

                      <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <p style={{ fontSize: '14px', color: '#9ca3af' }}>Overpriced</p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f87171' }}>{statusDistribution.pricing.overpriced || 0}</p>
                          </div>
                          <TrendingUp style={{ width: '32px', height: '32px', color: '#f87171' }} />
                        </div>
                      </div>

                      <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <p style={{ fontSize: '14px', color: '#9ca3af' }}>Underpriced</p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#60a5fa' }}>{statusDistribution.pricing.underpriced || 0}</p>
                          </div>
                          <TrendingDown style={{ width: '32px', height: '32px', color: '#60a5fa' }} />
                        </div>
                      </div>

                      <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div>
                            <p style={{ fontSize: '14px', color: '#9ca3af' }}>Overstocked</p>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fb923c' }}>{statusDistribution.inventory.overstock || 0}</p>
                          </div>
                          <AlertTriangle style={{ width: '32px', height: '32px', color: '#fb923c' }} />
                        </div>
                      </div>
                    </div>

                    {/* Charts */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                      <SimpleBarChart data={priceChartData} title="Price Analysis" />
                      <SimplePieChart data={categoryChartData} title="Category Distribution" />
                      <SimpleBarChart data={statusChartData} title="Pricing Status Overview" />
                      <div style={{ backgroundColor: '#1f2937', borderRadius: '12px', padding: '24px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
                        <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Inventory Analysis</h3>
                        <div style={{ color: '#d1d5db' }}>
                          <p>Average inventory ratio: {(recommendations.reduce((sum, item) => sum + parseFloat(item.inventoryRatio), 0) / recommendations.length).toFixed(2)}</p>
                          <p>Products needing attention: {recommendations.filter(item => item.priceStatus !== 'optimal' || item.stockStatus !== 'optimal').length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendationSystem;