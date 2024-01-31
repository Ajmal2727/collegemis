import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';


const Colleges = () => {
  return (
    <div>
<Navbar/>
      <section id="colleges">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Saraswati Education Society</h3>
              <h1 className="display-9 text-center mb-4 mt-2">OUR <b>COLLEGES</b></h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div class="card p-3">
                {/* <img src="..." class="card-img-top" alt="..." /> */}
                <div class="card-body text-center">
                  <i className="fa fa-university fa-4x mb-4 text-primary"></i>
                  <h5 class="card-title">Health Care</h5>
                  <p class="card-text">Some quick example text to build good look.</p>
                  <NavLink to="/login" className="btn btn-primary">DASHBOARD</NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div class="card p-3">
                {/* <img src="..." class="card-img-top" alt="..." /> */}
                <div class="card-body text-center">
                  <i className="fa fa-university fa-4x mb-4 text-primary"></i>
                  <h5 class="card-title">YTIET</h5>
                  <p class="card-text">Some quick example text to build good look.</p>
                  <NavLink to="/login" className="btn btn-primary">DASHBOARD</NavLink>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div class="card p-3">
                {/* <img src="..." class="card-img-top" alt="..." /> */}
                <div class="card-body text-center">
                  <i className="fa fa-university fa-4x mb-4 text-primary"></i>
                  <h5 class="card-title">YTCEM</h5>
                  <p class="card-text">Some quick example text to build good look.</p>
                  <NavLink to="/login" className="btn btn-primary">DASHBOARD</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Colleges;
