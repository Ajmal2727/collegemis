import React from 'react'
import Navbar from './Navbar'


const Newsletter = () => {
  return (
    <div>
     <Navbar/>
    <section id="newsletter">
        <div className="container mt-4">
            <div className="row">
            <div className="col-12">
                            <h3 className="fs-5 text-center mb-0">SES Newsletter</h3>
                            <h1 className="display-9 text-center mb-4 mt-2">OUR <b>UPCOMING</b> EVENTS</h1>
                            <hr className="w-25 mx-auto" />

{/* First Section */}
          <div class="row align-items-center connecting-lines d-flex mt-5">
            <div class="col-2 text-center bottom d-inline-flex justify-content-center align-items-center">
              <div class="circle font-weight-bold"><i class="fa fa-check"></i></div>
            </div>
            <div class="col-6">
              <h4>27 SEPTEMBER 2023</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mollis enim eu erat lacinia pharetra a et mi. Vivamus tincidunt lorem non semper commodo.</p>
            </div>
          </div>
 {/* Path Line */}
          <div class="row timeline">
            <div class="col-2">
              <div class="corner top-right"></div>
            </div>
            <div class="col-8">
              <hr/>
            </div>
            <div class="col-2">
              <div class="corner left-bottom"></div>
            </div>
          </div>
 {/* Second Section */}
          <div class="row align-items-center justify-content-end connecting-lines d-flex">
            <div class="col-6 text-right">
              <h4>27 OCTOBER 2023</h4>
              <p>Pellentesque vehicula urna et sollicitudin tempus. Suspendisse pretium neque id scelerisque semper. Mauris sem metus, rutrum at fermentum vitae, tincidunt a mi. Vestibulum scelerisque lacinia nunc quis iaculis. Proin pellentesque odio dolor, in placerat ex vestibulum eget. Integer sit amet feugiat dolor. Proin convallis viverra erat at euismod.</p>
            </div>
            <div class="col-2 text-center full d-inline-flex justify-content-center align-items-center">
              <div class="circle font-weight-bold"><i class="fa fa-check"></i></div>
            </div>
          </div>
  {/* Path Line */}       
          <div class="row timeline">
            <div class="col-2">
              <div class="corner right-bottom"></div>
            </div>
            <div class="col-8">
              <hr/>
            </div>
            <div class="col-2">
              <div class="corner top-left"></div>
            </div>
          </div>
{/* Third Section */}
          <div class="row align-items-center connecting-lines d-flex">
            <div class="col-2 text-center top d-inline-flex justify-content-center align-items-center">
              <div class="circle font-weight-bold"><i class="fa fa-check"></i></div>
            </div>
            <div class="col-6">
              <h4>27 DECEMBER 2023</h4>
              <p>Aenean in fermentum ante. Praesent tempus lectus sed consectetur rutrum. Nulla imperdiet semper sollicitudin. Quisque consectetur nulla id magna efficitur sodales. Etiam dapibus metus diam, malesuada cursus ligula dapibus non. Duis pellentesque hendrerit orci id congue.</p>
            </div>
          </div>
            </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Newsletter