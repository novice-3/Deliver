import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../firebase';

function Pending() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const ordersRef = collection(db, 'not delivered');
        const ordersSnapshot = await getDocs(ordersRef);

        const today = new Date().toISOString().split('T')[0]; // Format current date as YYYY-MM-DD

        const orders = ordersSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((order) => order.edt !== today); // Filter orders where edt !== today's date

        setPendingOrders(orders);
      } catch (error) {
        console.error('Error fetching pending orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingOrders();
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Pending Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : pendingOrders.length === 0 ? (
        <p>No pending orders found.</p>
      ) : (
        <div style={{ overflowX: 'auto', margin: '20px 0' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Order Number</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Phone Number</th>
                <th style={thStyle}>Email ID</th>
                <th style={thStyle}>Expected Date of Arrival</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order) => (
                <tr key={order.id} style={trStyle}>
                  <td style={tdStyle}>{order.id}</td>
                  <td style={tdStyle}>{order.name}</td>
                  <td style={tdStyle}>{order.phno}</td>
                  <td style={tdStyle}>{order.email}</td>
                  <td style={tdStyle}>{order.etd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Responsive styles
const containerStyle = {
  textAlign: 'center',
  margin: '20px auto',
  padding: '0 10px', // Small padding for mobile screens
};

const headerStyle = {
  fontSize: '1.8rem', // Larger text for headings
  marginBottom: '20px',
};

const tableStyle = {
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  fontWeight: 'bold',
  fontSize: '1rem',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'center',
  wordBreak: 'break-word', // Ensure long content wraps properly
  fontSize: '0.9rem', // Slightly smaller font for table content
};

const trStyle = {
  backgroundColor: '#fff',
  cursor: 'pointer',
};

// Responsive table wrapper for scroll on smaller screens
const tableWrapper = {
  overflowX: 'auto',
};

export default Pending;
