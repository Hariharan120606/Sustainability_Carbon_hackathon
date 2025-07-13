// frontend/src/components/RouteOptimizer.js
import React, { useState, useCallback } from "react";
import {
  LoadScript,
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Navbar from "./Navbar";

const RouteOptimizer = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [error, setError] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [map, setMap] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const drawMapRoute = useCallback((origin, destination) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirectionsResponse(result);
        } else {
          console.error("Failed to render route:", status);
          setError("Failed to render route on map");
        }
      }
    );
  }, []);

  const handleOptimize = async () => {
    setError(null);
    setOptimizedRoute(null);
    setDirectionsResponse(null);
    setLoading(true);

    if (!start || !end) {
      setError("Both start and destination are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/optimize-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start, end }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setOptimizedRoute(data);
      drawMapRoute(start, end);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <Navbar
        toggleSidebar={toggleSidebar}
        sidebarOpen={sidebarOpen}
        link_av="Home"
      />

      {/* Main content area that shifts when sidebar opens */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
        style={{
          marginLeft: sidebarOpen ? "256px" : "0px",
          width: sidebarOpen ? "calc(100% - 256px)" : "100%",
        }}
      >
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
          loadingElement={
            <div className="flex justify-center items-center h-96">
              Loading Google Maps...
            </div>
          }
        >
          <div className="min-h-screen bg-gray-50 p-4 my-5">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 d-flex justify-content-center" style = {{color : "purple", alignItems: "center"}}>
                  Route Optimizer
                </h2>

                <div className="flex flex-col md:flex-row gap-2 mb-12">
                  <input
                    className="border border-gray-300 rounded-md p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Start Location (e.g., Delhi)"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  />
                  <input
                    className="border border-gray-300 rounded-md p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Destination Location (e.g., Mumbai)"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                  />
                  <button
                    onClick={handleOptimize}
                    disabled={loading}
                    className={`px-6 py-3 rounded-md font-medium transition-colors ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    } text-white min-w-[120px]`}
                  >
                    {loading ? "Optimizing..." : "Optimize"}
                  </button>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                <div className="rounded-lg overflow-hidden shadow-md">
                  <GoogleMap
                    mapContainerStyle={{
                      width: "100%",
                      height: "500px",
                    }}
                    center={{ lat: 28.6139, lng: 77.209 }}
                    zoom={7}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                  >
                    {directionsResponse && (
                      <DirectionsRenderer
                        directions={directionsResponse}
                        options={{
                          suppressMarkers: false,
                          preserveViewport: false,
                          polylineOptions: {
                            strokeColor: "#2563eb",
                            strokeWeight: 6,
                            strokeOpacity: 0.8,
                          },
                        }}
                      />
                    )}
                  </GoogleMap>
                </div>
              </div>

              {optimizedRoute && (
                <div className="bg-dark rounded-lg shadow-lg p-6 justify-content-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 justify-content-center">
                    Optimized Route Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-600 font-medium mb-1">
                        Distance
                      </p>
                      <p className="text-2xl font-bold text-blue-800">
                        {optimizedRoute.distance} km
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm text-green-600 font-medium mb-1">
                        Duration
                      </p>
                      <p className="text-2xl font-bold text-green-800">
                        {optimizedRoute.duration} mins
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-sm text-purple-600 font-medium mb-1">
                        CO₂ Saved
                      </p>
                      <p className="text-2xl font-bold text-purple-800">
                        {optimizedRoute.co2_saved} kg
                      </p>
                    </div>
                  </div>

                  {optimizedRoute.route && optimizedRoute.route.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        Route Steps:
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <ol className="list-decimal list-inside space-y-2">
                          {optimizedRoute.route.map((step, i) => (
                            <li
                              key={i}
                              className="text-gray-700 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: step }}
                            />
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </LoadScript>
      </div>
    </div>
  );
};

export default RouteOptimizer;