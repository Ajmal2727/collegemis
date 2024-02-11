import React from 'react';

const Home = () => {
  return (
    <section id="home" className="bg-dark text-light py-5">
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="display-4 fw-bolder mb-4">Welcome To Saraswati Education Society</h1>
            <p className="lead fs-5">
              We are Quantum Crafters, our main goal is to reach higher level in our profession.
            </p>
            <div className="buttons mt-4">
              <button className="btn btn-primary me-4 rounded-pill px-4 py-2 animated-button">Learn More</button>
              <button className="btn btn-outline-light rounded-pill px-4 py-2 animated-button">Contact Us</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
