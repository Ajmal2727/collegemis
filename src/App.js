import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Colleges from './components/Colleges';
import Newsletter from './components/Newsletter';
import AdminDashboard from './pages/admin/AdminDashboard';





function App() {
  return (
    <>
      <Navbar/>
      <Home/>
      <Colleges/>
      <Newsletter/>
      <Footer />
      <AdminDashboard/>
      
    </>
  );
}

export default App;
