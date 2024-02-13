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
import NoticePage from './pages/admin/Notice';
import Complaints from './pages/admin/Complaints';
import Fee from './pages/admin/Fee';
import TeacherPageAdmin from './pages/admin/TeacherPageAdmin';
import LogoutAdmin from './pages/admin/LogoutAdmin';
import TeacherDashboard from './pages/admin/teacher/TeacherDashboard';
import SideNavT from './pages/admin/teacher/SideNavT';
import Classes from './pages/admin/teacher/classes';
import ComplainSection from './pages/admin/teacher/ComplainSection';
import StudentTeacherPanel from './pages/admin/teacher/StudentTeacherPanel';
import StudentDashboard from './pages/student/StudentDashboard';
import SideNavS from './pages/student/SideNavS';
import Register from './components/Register';
import ComplainS from './pages/student/ComplainS';










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
      <Route path="/Register" element={<Register/>} />


      {/* Admin Dashboard */}

      <Route path="/AdminDashboard" element={<AdminDashboard/>} />
      <Route path="/sidenav" element={<SideNav/>} />
      <Route path="/studentdetails" element={<StuInfo/>} />
      <Route path="/notice" element={<NoticePage/>} />
      <Route path="/complaints" element={<Complaints/>} />
      <Route path="/fee" element={<Fee/>} />
      <Route path="/teacherdetails" element={<TeacherPageAdmin/>} />
      <Route path="/logoutadmin" element={<LogoutAdmin/>} />
      
      {/* Teacher Dashboard */}
      <Route path="/TeacherDashboard" element={<TeacherDashboard/>} />
      <Route path="/Sidenavteacher" element={<SideNavT/>} />
      <Route path="/classes" element={<Classes/>} />
      <Route path="/complain" element={<ComplainSection/>} />
      <Route path="/student-teacherDb" element={<StudentTeacherPanel/>} />
    
      
     {/* Student Dashboard */}
     <Route path="/Sidenavstudent" element={<SideNavS/>} />
     <Route path="/StudentDashboard" element={<StudentDashboard/>} />
     <Route path="/student-complaint-section" element={<ComplainS/>} />
      
    

     
     
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
