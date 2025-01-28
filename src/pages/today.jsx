import React, { useEffect, useState } from 'react';
import { db, collection, getDocs, doc, updateDoc } from '../firebase';

function Today() {
  const [todayOrders, setTodayOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayOrders = async () => {
      try {
        const arrivingRef = collection(db, 'arriving');
        const ordersSnapshot = await getDocs(arrivingRef);

        const orders = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTodayOrders(orders);
      } catch (error) {
        console.error("Error fetching today's orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayOrders();
  }, []);

  const handleConfirmPickup = async (order) => {
    const confirmed = window.confirm(
      `Are you sure you want to confirm the pickup for Order #${order.id}?`
    );

    if (confirmed) {
      try {
        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        });

        // Update the order in the "arriving" collection
        const orderDocRef = doc(db, 'arriving', order.id);
        await updateDoc(orderDocRef, {
          adminPickUpTime: formattedTime,
        });

        // Update the UI to reflect the confirmation
        setTodayOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.id === order.id ? { ...o, adminPickUpTime: formattedTime } : o
          )
        );
        alert(`Pickup for Order #${order.id} has been confirmed.`);
      } catch (error) {
        console.error('Error confirming pickup:', error);
        alert('Failed to confirm pickup. Please try again.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Today's Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : todayOrders.length === 0 ? (
        <p>No orders scheduled for today.</p>
      ) : (
        <div style={{ overflowX: 'auto', margin: '20px 0' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Order Number</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Phone Number</th>
                <th style={thStyle}>Email ID</th>
                <th style={thStyle}>Time of Confirmation</th>
                <th style={thStyle}>Admin Pick Up</th>
              </tr>
            </thead>
            <tbody>
              {todayOrders.map((order) => (
                <tr key={order.id} style={trStyle}>
                  <td style={tdStyle}>{order.id}</td>
                  <td style={tdStyle}>{order.name}</td>
                  <td style={tdStyle}>{order.phno}</td>
                  <td style={tdStyle}>{order.email}</td>
                  <td style={tdStyle}>{order.timeOfConfirmation}</td>
                  <td style={tdStyle}>
                    {order.adminPickUpTime ? (
                      <span>{order.adminPickUpTime}</span>
                    ) : (
                      <input
                        type="checkbox"
                        onChange={() => handleConfirmPickup(order)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const tableStyle = {
  width: '100%',
  maxWidth: '800px',
  borderCollapse: 'collapse',
  margin: '0 auto',
  backgroundColor: '#fff',
};

const thStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  fontWeight: 'bold',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'center',
  wordBreak: 'break-word',
};

const trStyle = {
  backgroundColor: '#fff',
};

export default Today;
