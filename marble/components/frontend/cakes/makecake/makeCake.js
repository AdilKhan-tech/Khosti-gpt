import React from "react";

function makecake() {
  return (
    <section>
      <div>
        <img src="./assets/images/MB_Design Your Cake_1920 x 450 english.jpg" style={{ marginTop: "134px", position: "relative", width: "100%" }}/>
      </div>
      <div className="d-flex justify-content-start align-items-center ms-3 mt-3">
      <img src="./assets/images/brown-arrow.png" alt="arrow image" className="me-1"/>
          <h1 className="fs-38 fw-bold color-brown m-0 ms-1">Customise your own Cake</h1>
        </div>
        <div className="d-flex justify-content-start align-items-center ms-3 mt-3">
          <span className="new-badge rounded-5 d-flex justify-content-center text-white ms-1 fs-5">
            1
          </span>
          <h5 className="fs-18 color-brown m-0 ms-1">Select cookie type</h5>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start mb-5">
            <div className="d-flex">
              <div className="cake-card border-0 rounded-4">
                <img className="mt-3 cake-img" src="./assets/images/Cake-16.png" alt="Card image" style={{ marginInline: "35px" }}/>
                <div className="card-body align-items-center">
                  <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Cookie Cake</h6>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="cake-card border-0 rounded-4">
                <img className="mt-3 cake-img" src="./assets/images/Cute-Cake.png" alt="Card image" style={{ marginInline: "35px" }} />
                <div className="card-body align-items-center">
                  <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Cute Cake</h6>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="cake-card border-0 rounded-4">
                  <img className="mt-3 cake-img" src="./assets/images/Ice-Cream-Cake.png" alt="img-fluid" style={{ marginInline: "35px" }}/>
                <div className="card-body align-items-center">
                  <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Ice cream Cake</h6>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="cake-card border-0 rounded-4">
                  <img className="mt-3 cake-img" src="./assets/images/Regular-Cookie@300x.png" alt="img-fluid" style={{ marginInline: "35px" }}/>
                <div className="card-body align-items-center">
                  <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Other</h6>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="cake-card border-0 rounded-4">
                  <img className="mt-3 cake-img" src="./assets/images/spongeCake.png" alt="img-fluid" style={{ marginInline: "35px" }}/>
                <div className="card-body align-items-center">
                  <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Sponge Cake</h6>
                </div>
              </div>
            </div>
            
          </div>
          <div className="mb-5" style={{ marginInlineEnd: "100px" }}>
            <p className="fw-24 fw-bold text-secondary">Summary</p>
            <div className="cake-box p-3 mb-3 rounded-4">
              <div className="line-row mb-3">
                <span className="fs-14 text-secondary fw-bold">Cake type</span><span className="dots"></span><span className="color-brown">Cookie Cake</span>
              </div>
              <div className="line-row mb-3">
              <span className="fs-14 text-secondary fw-bold">Size</span><span className="dots"></span>
              </div>
              <div className="line-row mb-3">
                <span className="fs-14 text-secondary fw-bold">Product Cake Text</span><span className="dots"></span>
              </div>
              <div className="line-row mb-3">
                <span className="fs-14 text-secondary fw-bold">Product Cake Color</span><span className="dots"></span>
              </div>
              <div className="line-row mb-3">
                <span className="fs-14 text-secondary fw-bold">Product Text Border</span><span className="dots"></span>
              </div>
              <div className="line-row mb-3">
                <span className="fs-14 text-secondary fw-bold">Product Cake Note</span><span className="dots"></span>
              </div>
              <button className="btn btn-primary rounded-5 mt-3 w-100 p-1 fs-5 fs-18">Get a Quote</button>
            </div>
          </div>
        </div>

        <div>
          
        </div>
    </section>
  );
}

export default makecake;
