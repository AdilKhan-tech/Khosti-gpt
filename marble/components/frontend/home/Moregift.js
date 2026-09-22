import React from "react";

function Moregift() {
  return (
    <section>
      <div>
        <div
          className="row w-100 mx-auto align-items-center"
          style={{ backgroundColor: "#e05b8b" }}
        >
          <div className="col-md-5 ">
            <div className="px-5">
              <h2
                className="fs-55 fw-bold text-white"
                style={{ fontFamily: "brandone" }}
              >
                {" "}
                Make your own <br /> cookies box!{" "}
              </h2>
              <p className="fs-5 fw-medium lh-2 text-white py-4">
                {" "}
                Fresh, high-quality ingredients and baked to perfection.
                Assemble your own box of cookies to create the perfect mix of
                flavors for you or your friends and family.u
              </p>
              <a href="#">
                <button
                  className="btn hero-btn rounded-5 px-4 py-1 pt-2 bg-warning text-brown"
                  type="submit"
                >
                  MAKE YOUR OWN BOX
                </button>
              </a>
            </div>
          </div>
          <div className="col-md-7 p-0">
            <img
              src="./assets/images/cookbox1.png"
              className="w-100"
              alt="cookies box"
            />
          </div>
        </div>
        <div
          className="row w-100 mx-auto align-items-center px-5"
          style={{ backgroundColor: "#fa5ac518" }}
        >
          <div className="col-md-7 p-0">
            <img
              src="./assets/images/visitus.webp"
              className="w-100 im"
              alt="visit us"
            />
          </div>
          <div className="col-md-5">
            <div>
              <h2
                className="fs-55 fw-bold text-brown mb-0"
                style={{ fontFamily: "brandon" }}
              >
                Come visit us
              </h2>
              <p className="fs-20 fw-medium mb-0 fw-medium lh-2 text-brown py-4">
                Find Marble Slab store near you.{" "}
              </p>
              <a href="#">
                <button
                  className="btn hero-btn rounded-5 px-5 py-2 pt-2 bg-sky text-white fw-bold"
                  type="submit"
                >
                  VIEW LOCATIONS
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Moregift;
