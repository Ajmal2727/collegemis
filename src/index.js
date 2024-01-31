import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SecondApp from './SecondApp';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Colleges from './components/Colleges';
import Newsletter from './components/Newsletter';
import Login from './components/login'; 
import Teacher from './components/teacher';
import Student from './components/Student';
import AdminDashboard from './pages/admin/AdminDashboard';
import SideNav from './pages/admin/SideNav';
import StuInfo from './pages/admin/StuInfo';








ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/second" element={<SecondApp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/colleges" element={<Colleges />} />
      <Route path="/newsletter" element={<Newsletter />} />
      <Route path="/login" element={<Login />} />
      <Route path="/teacher" element={<Teacher/>} />
      <Route path="/Student" element={<Student/>} />
      <Route path="/AdminDashboard" element={<AdminDashboard/>} />
      <Route path="/sidenav" element={<SideNav/>} />
      <Route path="/studentinfo" element={<StuInfo/>} />
     
      
    

     
     
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
