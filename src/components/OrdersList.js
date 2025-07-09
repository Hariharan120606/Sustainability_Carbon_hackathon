import React, { useEffect, useState } from "react";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define the fetchOrders function
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/shopify/orders");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setOrders(data); // Save data to state
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchOrders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} - Total: ${order.total_price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
