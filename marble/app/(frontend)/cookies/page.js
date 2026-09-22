import React from "react";

function Cookies() {
  return (
    <main>
      <section className="cookies-section bg-light">
        <div className="">
          <img style={{ position: "relative", width: "100%" }} src="./assets/images/cooki-box.jpg" alt="cake banner"/>
        </div>
        <div className="d-flex justify-content-start align-items-center ms-3 mt-3">
          <span className="new-badge rounded-5 d-flex justify-content-center text-white ms-1 fs-5">
            1
          </span>
          <h5 className="fs-18 color-brown m-0 ms-1 mt-5">Select cookie type</h5>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start mb-5">
            <div className="d-flex">
              <div className="cookies-card border-0 rounded-4">
                <img className="mt-3 cookies-img" src="./assets/images/Regular-Cookie@300x.png" alt="Card image" style={{ marginInline: "50px" }}/>
                <div className="card-body align-items-center">
                  <h6 className="text-center color-brown mt-3 fs-24 fw-bold">Original</h6>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="cookies-card border-0 rounded-4">
                <img className="mt-3 cookies-img" src="./assets/images/Big-Bite-Cookie@300x.png" alt="Card image" style={{ marginInline: "50px" }} />
                <div className="card-body align-items-center">
                  <h6 className="text-center color-brown mt-3 fs-24 fw-bold">Big Bite</h6>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="cookies-card border-0 rounded-4">
                <a href="./diy">
                  <img className="mt-3 cookies-img" src="./assets/images/DIY Cookie@300x.png" alt="img-fluid" style={{ marginInline: "50px" }}/>
                </a>
                <div className="card-body align-items-center">
                  <h6 className="text-center color-brown mt-3 fs-24 fw-bold">DIY</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="" style={{ marginInlineEnd: "100px" }}>
            <div><h3 className="fw-24 fw-bold">Summary</h3></div>
            <div className="summary-box p-3 mb-0 rounded-4">
              <div className="line-row mb-4">
                <span className="fs-18 fw-bold text-secondary">Box type</span>
                <span className="dots"></span>
                <span className="text-center color-brown fs-15 fw-bold">Original</span>
              </div>
              <div className="line-row mb-4">
              <span className="fs-18 fw-bold text-secondary">Box size</span>
              <span className="dots"></span>
              </div>
              <div className="line-row mb-4">
                <span className="fs-18 fw-bold text-secondary">Subtotal</span>
                <span className="dots"></span>
                <span className="text-center color-brown fs-15 fw-bold">0 SAR</span>
              </div>
              <button className="btn btn-secondary rounded-5 mt-3 w-100 p-1 fs-15 fw-bold">Add to cart</button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center ms-3 mt-0">
          <span className="new-badge rounded-5 d-flex justify-content-center text-white ms-1 fs-5">2</span>
          <h5 className="fs-18 color-brown m-0 ms-1"> Select box size </h5>
        </div>
        <div className="d-flex justify-content-start gap-3" style={{ marginInline: "50px" }}>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/half.svg" alt="Card image" style={{ width: "60%" }}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold mb-0">Half Dozen</h4>
              <p className="text-center text-blue fs-16 fw-medium mb-0">16 pieces</p>
              <p className="text-center text-blue fs-16 fw-medium mb-0">SR 20</p>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/dozen.svg" alt="Card image" style={{ width: "60%" }}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold mb-0">Dozen</h4>
              <p className="text-center text-blue fs-16 fw-medium mb-0">16 pieces</p>
              <p className="text-center text-blue fs-16 fw-medium mb-0">SR 39</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center ms-3 mt-3">
          <span className="new-badge rounded-5 d-flex justify-content-center text-white ms-1 fs-5">3</span>
          <h5 className="fs-18 color-brown m-0 ms-1">Select up to 6 cookies</h5>
        </div>
        <div className="d-flex justify-content-start gap-3" style={{ marginInline: "50px" }}>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/mm2x.png" alt="Card image" style={{ width: "60%" }}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">M&M'S</h4>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/original.png" alt="Card image" style={{ width: "70%" }}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-15 fw-bold">Original</h4>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start mt-1" style={{ marginInline: "50px" }}>
          <h5 className="mt-5 fs-38 fw-bold">DIY Product</h5>
        </div>
        <div className="mt-1 d-flex overflow-auto pb-4 ms-3 gap-3 me-3">
          <div className="cakes-card w-100 card border-0 rounded-4 h-100 shadow-sm p-3">
            <img className="w-100 rounded-4" src="./assets/images/HB-pint-250x250.png" alt="Card image"
              style={{ objectFit: "cover", height: "250px" }}
            />
            <div className="card-body text-center">
              <h6 className="text-center color-brown fs-15 fw-bold">Happiness Box Pint</h6>
              <p className="text-center text-blue fs-16 fw-medium">SR 246</p>
              <button className="btn rounded-2 px-5 py-2 fs-14 fw-bold bg-pink text-white" type="submit">Add to Cart</button>
            </div>
          </div>

          <div className="cakes-card w-100 card border-0 rounded-4 h-100 shadow-sm p-3">
            <img className="w-100 rounded-4" src="./assets/images/HB-bigdipper-250x250.png" alt="Card image"
              style={{ objectFit: "cover", height: "250px" }}
            />
            <div className="card-body text-center">
              <h6 className="text-center color-brown fs-15 fw-bold">Happiness Box Big Dipper</h6>
              <p className="text-center text-blue fs-16 fw-medium">SR 148</p>
              <button className="btn rounded-2 px-5 py-2 fs-14 fw-bold bg-pink text-white" type="submit">Add to Cart</button>
            </div>
          </div>

          <div className="cakes-card w-100 card border-0 rounded-4 h-100 shadow-sm p-3">
            <img className="w-100 rounded-4" src="./assets/images/DIY-pr-250x250.png" alt="Card image"
              style={{ objectFit: "cover", height: "250px" }}
            />
            <div className="card-body text-center">
              <h6 className="text-center color-brown fs-15 fw-bold">DIY Cookie Cake 16 Inch</h6>
              <p className="text-center text-blue fs-16 fw-medium">SR 199</p>
              <button className="btn rounded-2 px-5 py-2 fs-14 fw-bold bg-pink text-white" type="submit">Add to Cart</button>
            </div>
          </div>

          <div className="cakes-card w-100 card border-0 rounded-4 h-100 shadow-sm p-3">
            <img className="w-100 rounded-4" src="./assets/images/DIY-pr-250x250.png" alt="Card image"
              style={{ objectFit: "cover", height: "250px" }}
            />
            <div className="card-body text-center">
              <h6 className="text-center color-brown fs-15 fw-bold">DIY Cookie Cake 12 Inch</h6>
              <p className="text-center text-blue fs-16 fw-medium">SR 149</p>
              <button className="btn rounded-2 px-5 py-2 fs-14 fw-bold bg-pink text-white" type="submit">Add to Cart</button>
            </div>
          </div>
        </div>

        <button className="btn btn-secondary rounded-5 mt-3 px-4 mb-3 py-1 fs-15 fw-bold" style={{ marginInline: "600px" }} type="submit">View More</button>
        <a href="https://wa.me/+966594064708" className="whatsapp-chat" target="_blank">
            <img style={{ width: "60px" }} src="/assets/images/whatsapp_chat.png"/>
          </a>
      </section>
    </main>
  );
}

export default Cookies;