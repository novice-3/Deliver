import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Today from './pages/today';
import Pending from './pages/pending';
import Delivered from './pages/delivered';
import Navbar from './components/NavBar';
import HistoryPage from './pages/history'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/today" element={<div><Navbar /><Today /></div>} />
        <Route path="/pending" element={<div><Navbar /><Pending /></div>} />
        <Route path="/delivered" element={<div><Navbar /><Delivered /></div>} />
        <Route path="/history" element={<div><Navbar /><HistoryPage /></div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
