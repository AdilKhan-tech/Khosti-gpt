import React from "react";

function Page() {
  return (
    <section>
      <div className="px-5" style={{position: "relative",backgroundColor: "#ffc10727",}}>
        <div className="row w-100 mx-auto align-items-center px-5">
          <div className="col-md-7">
            <div><h2 className="fs-60 fw-bold text-brown">Our Story</h2>
              <p className="fs-18 fw-medium text-brown py-4 color-brown">
                marble slab creamery has been serving fresh homemade<br />ice cream since 1983. Our name 
                refers to the magical<br />frozen marble slab where all the mixins and fun happens.<br />Today
                 we're known as one of the best sweet shops serving<br /> fresh customizable ice creams, 
                 cookies and cakes. Our<br /> mission is spreading love by making everyday a fun<br /> 
                 celebration for ourselves and others.</p></div>
          </div>
          <div className="col-md-5 p-0">
            <img src="./assets/images/about-us-banner.png" className="img-fluid" alt="cookies box"/>
          </div>
        </div>
      </div>
      <h1 className="text-center mt-5 mb-5 fs-70 fw-bold color-purple">Why are we different?</h1>
      <div className="row w-100 mx-auto align-items-center px-5">
        <div className="col-md-5 p-0">
          <img src="./assets/images/create-custom.png" className="img-fluid h-50 w-75" alt="cookies box"/>
        </div>
        <div className="col-md-7">
          <div>
            <h1 className="color-brown fs-38 fw-bold">Creativity and Customization</h1>
            <p className="fs-25 fw-medium text-blue-light">"Creativity is intelligence having fun"</p>
          </div>
        </div>
      </div>
      <div className="row w-100 mx-auto align-items-center px-5">
        <div className="col-md-7">
          <div><h1 className="color-brown fs-38 fw-bold">Fun Experience</h1>
            <p className="fs-25 fw-medium text-blue-light">"Life is all about having fun"</p>
          </div>
        </div>
        <div className="col-md-5 p-0">
          <img src="./assets/images/gifts.png" className="img-fluid h-50 w-75" alt="cookies box"/>
        </div>
      </div>
      <div className="row w-100 mx-auto align-items-center px-5">
        <div className="col-md-7 p-0">
          <img src="./assets/images/funfairs.png" className="img-fluid h-50 w-50" alt="cookies box"/>
        </div>
        <div className="col-md-5">
          <div>
            <h1 className="color-brown fs-38 fw-bold">Fun Experience</h1>
            <p className="fs-25 fw-medium text-blue-light">"Life is all about having fun"</p>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#07c5ff27" }}>
        <div>
          <h1 className="fs-38 fw-bold text-center mb-5">Our partners</h1>
          <div className="d-flex">
            <div className="align-items-center text-center mx-5">
              <img src="./assets/images/marble-slab-about.png" alt="Marble Slab"/>
              <h1 className="fs-25 fw-bold">Marble Slab Creamery</h1>
              <p>A leading purveyor of chef created super-premium hand-mixed ice cream and<br /> the innovator
               of the frozen slab technique, well known inthe United States.</p>
              <h1 className="fs-20 fw-bold color-purple">marbleslab.com</h1>
              <img src="./assets/images/insta.png" className="" alt="img" />
              <span className="fs-20 fw-bold">@marbleslabksa</span>
            </div>
            <div className="align-items-center text-center mx-5">
              <img src="./assets/images/American-slab-about.png" alt="Marble Slab"/>
              <h1 className="fs-25 fw-bold">Great American Cookies</h1>
              <p>At Great American Cookies, you may indulge in freshly bakedsweets that blend<br />classic
               flavors with inventive creations. Ideal as a wonderfultreat or for any<br /> occasion!</p>
              <h1 className="fs-20 fw-bold color-purple">greatamericancookies.com</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;