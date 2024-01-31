import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow fixed-top">
        <div className="container">
          <NavLink to="/" className="navbar-brand">MIS HUB</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" activeClassName="active-link">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/colleges" className="nav-link" activeClassName="active-link">Colleges</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/newsletter" className="nav-link" activeClassName="active-link">Newsletter</NavLink>
              </li>
            </ul>
            <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" href="/">SES MIS HUB</NavLink>
            <NavLink to="/login" className="btn btn-outline-primary ms-auto px-4 rounded-pill">
              <i className="fa fa-sign-in me-2"></i> Login
            </NavLink>
            <NavLink to="/" className="btn btn-outline-primary ms-2 px-4 rounded-pill">
              <i className="fa fa-user-plus me-2"></i> Register
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
