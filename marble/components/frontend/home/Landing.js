import React from "react";

function Landing() {
  return (
    <section className="section bg-light">
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="./assets/images/en-home-banner.jpg" className="d-block w-100" alt="..."/>
          </div>
          <div className="carousel-item">
            <div className="position-relative">
              <img src="./assets/images/en-Download-App-Banner.png" className="d-block w-100" alt="..."/>
              <a href="https://play.google.com/store/apps/details?id=sa.marbleslab.android" target="blank">
              <img 
                src="./assets/images/android_btn.svg" 
                className="position-absolute"
                style={{ bottom: "67px", left: "75px", width: "180px" }}
                alt="..."
              />
              </a>
              <a href="https://play.google.com/store/apps/details?id=sa.marbleslab.android" target="blank">
              <img 
                src="./assets/images/ios_app_btn.svg" 
                className="position-absolute"
                style={{ bottom: "67px", left: "265px", width: "180px" }}
                alt="..."
              />
              </a>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="ms-auto py-0 text-center bg-green">
        <div className="">
        <p className="fs-3 fw-bold color-purple pt-3">Why You Should Order Online With Us?</p>
        <div className="row">
          <div className="col-md-4">
                <div className="d-flex align-items-center">
                    <img className="order-img" src="./assets/images/order-cake.webp" alt="Order Cake"/>
                    <div className="">
                        <p className="m-0 fs-25 fw-bold color-brown">Personalized Cake</p>
                        <p className="m-0 text-start fw-medium color-brown">(Over 100 Designs)</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="d-flex align-items-center">
                    <img className="order-img" src="./assets/images/order-hand.png" alt="Order Cake"/>
                    <div className="">
                        <p className="m-0 fs-25 fw-bold color-brown">Easy Ordering</p>
                        <p className="m-0 text-start fw-medium color-brown">(Within 2 Minutes)</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="d-flex align-items-center">
                    <img className="order-img" src="./assets/images/order-box.png" alt="Order Cake"/>
                    <div className="">
                        <p className="m-0 fs-25 fw-bold color-brown">Fast Delivery</p>
                        <p className="m-0 text-start fw-medium color-brown">(Within 2 hours)</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
      <div className="bg-light py-5">
        <h1 className="color-brown text-center mb-3 fs-38 fw-bold">Eid Special</h1>
        <div className="mt-3 d-flex container overflow-auto pb-4 ms-3">
          <div className="card border-0 rounded-4 align-items-center mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/eid-last-250x250.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">Eid Cake</h4>
              <p className="text-center fs-15">EID-2026-1-4</p>
              <p className="text-center text-blue fs-16 fw-medium">189.00 SR</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn">Add to cart</button>
            </div>
          </div>

          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/WhatsApp-Image-2026-03-19-at-4.50.58-PM-250x250.jpeg" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">Happy EID</h4>
              <p className="text-center fs-15">EID-2026-1-4</p>
              <p className="text-center text-blue fs-16 fw-medium">189.00 SR</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/Kids-EID-CAKE-250x250.jpg" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">Kids EID CAKE</h4>
              <p className="text-center fs-15">EID-2026-1-2</p>
              <p className="text-center text-blue fs-16 fw-medium">149.00 SR</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn ms-4" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-4 rounded-4" src="./assets/images/Eid-Cake-Challenges-250x250.jpg" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">Eid Cake Challenges</h4>
              <p className="text-center fs-15">EID-2026-1-3</p>
              <p className="text-center text-blue fs-16 fw-medium">19.00 SR</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn ms-2" type="submit"> Add to cart </button>
            </div>
          </div>
           <div className="card border-0 rounded-4 align-items-center mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/EID-COOKIE-DIY-BOX-250x250.jpg" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-15 fw-bold"> EID COOKIE DIY BOX</h4>
              <p className="text-center fs-15">EID-2026-1-3</p>
              <p className="text-center text-blue fs-16 fw-medium">19.00 SR</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn ms-3" type="submit"> Add to cart </button>
            </div>
          </div>
      </div>
      </div>
      {/* <div className="bg-light py-2">
        <h1 className="color-brown text-center mb-3 fs-38 fw-bold"> Mother's Day </h1>
        <div className="mt-3 d-flex container overflow-auto pb-4 ms-3">
          <div className="card border-0 rounded-4 align-items-center mx-1" role="button">
            <img className="mt-3" src="./assets/images/salah.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">HBD 7th Salah</h4>
              <p className="text-center fs-15">Cookie-hbd-022</p>
              <p className="text-center text-blue fs-16 fw-medium">SR 173.8999</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn">Add to cart</button>
            </div>
          </div>

          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/turtle.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">Turtle Cake</h4>
              <p className="text-center fs-15">ICC14-1</p>
              <p className="text-center text-blue fs-16 fw-medium">SR 235</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/cookie-cake.jpg" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">We dream and achieve cookie cake</h4>
              <p className="text-center fs-15">ND-001</p>
              <p className="text-center text-blue fs-16 fw-medium">SR 173</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn ms-4" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3" src="./assets/images/HBD-pink-white.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">HBD pink white</h4>
              <p className="text-center fs-15">Cookie-hbd-099</p>
              <p className="text-center text-blue fs-16 fw-medium">SR-173.00</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn ms-2" type="submit"> Add to cart </button>
            </div>
          </div>
           <div className="card border-0 rounded-4 align-items-center mx-1" role="button">
            <img className="mt-3" src="./assets/images/Bye-bye-single-life-Tarfa-1.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-15 fw-bold">Congratulations</h4>
              <p className="text-center fs-15">Cookie-gen-011</p>
              <p className="text-center text-blue fs-16 fw-medium">SR 173</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn ms-3" type="submit"> Add to cart </button>
            </div>
          </div>
      </div>
      </div>
      <div className="bg-light py-2">
        <h1 className="color-brown text-center mb-3 fs-38 fw-bold"> Best-Sellers </h1>
        <div className="mt-3 d-flex container overflow-auto pb-4 ms-3">
          <div className="card border-0 rounded-4 align-items-center mx-1" role="button">
            <img className="mt-3" src="./assets/images/salah.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">HBD 7th Salah</h4>
              <p className="text-center fs-15">Cookie-hbd-022</p>
              <p className="text-center text-blue fs-16 fw-medium">SR 173.8999</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn">Add to cart</button>
            </div>
          </div>

          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/turtle.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">Turtle Cake</h4>
              <p className="text-center fs-15">ICC14-1</p>
              <p className="text-center text-blue fs-16 fw-medium">SR 235</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/cookie-cake.jpg" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">We dream and achieve cookie cake</h4>
              <p className="text-center fs-15">ND-001</p>
              <p className="text-center text-blue fs-16 fw-medium">SR 173</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn ms-4" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3" src="./assets/images/HBD-pink-white.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">HBD pink white</h4>
              <p className="text-center fs-15">Cookie-hbd-099</p>
              <p className="text-center text-blue fs-16 fw-medium">SR-173.00</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn ms-2" type="submit"> Add to cart </button>
            </div>
          </div>
           <div className="card border-0 rounded-4 align-items-center mx-1" role="button">
            <img className="mt-3" src="./assets/images/Bye-bye-single-life-Tarfa-1.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-15 fw-bold">Congratulations</h4>
              <p className="text-center fs-15">Cookie-gen-011</p>
              <p className="text-center text-blue fs-16 fw-medium">SR 173</p>
              <button className="btn hero-btn bg-pink rounded-2 px-5 py-2 mt-3 fs-14 fw-bold addToCart-btn ms-3" type="submit"> Add to cart </button>
            </div>
          </div>
      </div>
      </div> */}
    </section>
  );
}

export default Landing;
