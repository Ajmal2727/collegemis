import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

const Login = () => {
  return (
    <div>
      <Navbar/>
      <section id="login">
      <div className="container">
        <div className="row">
          <h3 className="fs-5 text-center mb-0">Saraswati Education Society</h3>
          <h1 className="display-9 text-center mb-4 mt-2">
            MIS DATA <b>HUB</b>
          </h1>
          <hr className="w-25 mx-auto" />
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card p-3 card-hover">
              <div className="card-body text-center">
                <i className="fa fa-user-plus fa-4x mb-4 text-primary"></i>
                <h5 className="card-title">ADMIN</h5>
                <p className="card-text">Login as an Admin</p>
                <NavLink to="/AdminDashboard" className="btn btn-primary">
                  DASHBOARD
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 card-hover">
              <div className="card-body text-center">
                <i className="fa fa-user fa-4x mb-4 text-primary"></i>
                <h5 className="card-title">TEACHER</h5>
                <p className="card-text">Login as a Teacher</p>
                <NavLink to="/TeacherDashboard" className="btn btn-primary">
                  DASHBOARD
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3 card-hover">
              <div className="card-body text-center">
                <i className="fa fa-graduation-cap fa-4x mb-4 text-primary"></i>
                <h5 className="card-title">STUDENT</h5>
                <p className="card-text">Login as a Student</p>
                <NavLink to="/StudentDashboard" className="btn btn-primary">
                  DASHBOARD
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
};

export default Login;
