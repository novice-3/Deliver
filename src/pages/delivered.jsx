import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../firebase';

function Delivered() {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        const deliveredRef = collection(db, 'delivered');
        const ordersSnapshot = await getDocs(deliveredRef);

        const orders = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDeliveredOrders(orders);
      } catch (error) {
        console.error('Error fetching delivered orders:', error);
        alert('Failed to fetch delivered orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveredOrders();
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Delivered Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : deliveredOrders.length === 0 ? (
        <p>No delivered orders found.</p>
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
                <th style={thStyle}>Fragile</th>
                <th style={thStyle}>Time of Confirmation</th>
                <th style={thStyle}>Admin Pick Up Time</th>
                <th style={thStyle}>User Pick Up Time</th>
              </tr>
            </thead>
            <tbody>
              {deliveredOrders.map((order) => (
                <tr key={order.id} style={trStyle}>
                  <td style={tdStyle}>{order.id}</td>
                  <td style={tdStyle}>{order.name}</td>
                  <td style={tdStyle}>{order.phno}</td>
                  <td style={tdStyle}>{order.email}</td>
                  <td style={tdStyle}>{order.etd}</td>
                  <td style={tdStyle}>{order.fragile ? 'Yes' : 'No'}</td>
                  <td style={tdStyle}>{order.timeOfConfirmation}</td>
                  <td style={tdStyle}>{order.adminPickUpTime}</td>
                  <td style={tdStyle}>{order.userPickUpTime}</td>
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
  padding: '0 10px', // Padding for mobile screens
};

const headerStyle = {
  fontSize: '1.8rem',
  marginBottom: '20px',
};

const tableStyle = {
  width: '100%',
  maxWidth: '1200px',
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
  fontSize: '0.9rem', // Adjusted for readability
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'center',
  wordBreak: 'break-word', // Ensures long content wraps properly
  fontSize: '0.85rem', // Slightly smaller font for table content
};

const trStyle = {
  backgroundColor: '#fff',
  cursor: 'pointer',
};

export default Delivered;
