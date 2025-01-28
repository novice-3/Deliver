import React, { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

function HistoryPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!phoneNumber) {
      alert('Please enter a phone number');
      return;
    }
    // ... (Existing search logic remains unchanged)
  };

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
        margin: '0 auto',
        maxWidth: '800px',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Order History</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{
            width: '90%',
            maxWidth: '400px',
            height: '40px',
            fontSize: '16px',
            padding: '5px 10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            textAlign: 'center',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            width: '150px',
            height: '40px',
            fontSize: '16px',
            backgroundColor: '#F67280',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#8B0000')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#F67280')}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        {orders.length === 0 ? (
          !error && <p>No orders found</p>
        ) : (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '600px',
              backgroundColor: '#fff',
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Order ID</th>
                <th style={thStyle}>Timestamp</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Order Details</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td style={tdStyle}>{order.orderId}</td>
                  <td style={tdStyle}>{order.timestamp}</td>
                  <td style={tdStyle}>{order.name}</td>
                  <td style={tdStyle}>{order.phno}</td>
                  <td style={tdStyle}>{order.email}</td>
                  <td style={tdStyle}>{order.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Styles for table headers and cells
const thStyle = {
  borderBottom: '2px solid #ddd',
  padding: '8px',
  textAlign: 'left',
  fontSize: '0.9rem',
  backgroundColor: '#f8f9fa',
};

const tdStyle = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
  fontSize: '0.85rem',
  wordBreak: 'break-word', // Ensures content wraps within the cell
};

export default HistoryPage;
