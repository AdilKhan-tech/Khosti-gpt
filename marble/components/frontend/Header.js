"use client";
import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import getApiKeyByDomain from "@/configs/getApiKey";
import axios from "axios";
import { getAllOcassions } from "@/utils/apiRoutes";

function Header() {
  const searchParams = useSearchParams();
  const apiKey = getApiKeyByDomain();

  const [phoneNnumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [productOccasions, setProductOccasions] = useState([]);
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    if (!phoneNnumber || !password) {
      setErrors(["Please fill in all fields"]);
      return;
    }

    try {
      const result = await signIn("credentials", {
        phone_number: phoneNnumber,
        password,
        apiKey,
        redirect: false,
      });

      if (result?.error) {
        setErrors("Invalid phone number or password");
      } else {
        window.location.href = callbackUrl;
      }
    } catch {
      setErrors("Error occurred");
    }
  };

  const fetchProductOccasions = async () => {
    try {
      const res = await axios.get(getAllOcassions);
      setProductOccasions(res.data.data);
    } catch (err) {
      console.error("Error fetching product Occasions", err);
    }
  };

  useEffect(() => {
    const loadOccasions = async () => {
      await fetchProductOccasions();
    };

    loadOccasions();
  }, []);

  return (
    <header>
      {/* 🔥 UPDATED HEADER */}
      <section className="bg-sky py-1 header stickness-header font-brandon">
        <div className="container pb-2" style={{ paddingInline: "12px" }}>
          <div className="row d-flex align-items-center mt-1 logodivMB ">
            {/* Logo */}
            <div className="col-md-2 col-4 moblogo">
              <img
                src="./assets/images/marble_slab_logo_en.svg"
                className="img-fluid pb-1 ms-1"
              />
            </div>

            {/* Nav */}
            <div className="col-md-5 col-2 text-center mobhamburger">
              <ul
                className="d-none d-lg-flex list-unstyled gap-4 mb-3 nav-custom"
                style={{ marginInlineStart: "27px" }}
              >
                <li className="active">
                  <a
                    className="nav-link mt-3 fw-bold fs-18"
                    href="./Landing"
                    role="button"
                  >
                    HOME
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link mt-3 fw-bold fs-18 ms-2"
                    data-bs-toggle="modal"
                    data-bs-target="#occassionModal"
                    role="button"
                  >
                    OCCASIONS
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link mt-3 fw-bold fs-18 ms-2"
                    href="./cakes"
                    role="button"
                  >
                    CAKES
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link mt-3 fw-bold fs-18 ms-2"
                    href="./cookies"
                    role="button"
                  >
                    COOKIES
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link mt-3 fw-bold fs-18 ms-2"
                    href="./diy"
                    role="button"
                  >
                    DIY
                  </a>
                </li>
              </ul>
            </div>

            {/* Search */}
            <div className="col-md-3 col-4 d-flex text-end mt-1">
              <input
                type="text"
                className="form-control bg-white rounded-5 border px-4 py-0 border-light-brown text-brown rounded-end-0 border-end-0"
                placeholder="Search"
              />

              <button className="bg-white btn-outline-success border border-light-brown border-end-0 border-start-0 rounded-start-0 rounded-end-0  px-0 py-1 font-brandon-bold text-brown fs-20 pe-1">
                <i className="bi bi-x"></i>
              </button>

              <button className="rounded-5 border-0 px-3 py-1 text-white fs-20 bg-purple rounded-start-0">
                <i className="bi bi-search"></i>
              </button>
            </div>

            {/* Right */}
            <div className="col-md-2 col-4 text-end">
              <div className="d-flex justify-content-end align-items-center gap-2">
                <span className="d-none d-md-block text-white">AR</span>

                <div
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                  className="cursor d-flex align-items-center"
                >
                  <img
                    className=""
                    src="./assets/images/useri.svg"
                    alt="Logo"
                  />
                </div>

                <div className="cursor d-flex align-items-center">
                  <img
                    className=""
                    src="./assets/images/carti.svg"
                    alt="Logo"
                  />
                  <span
                    className="position-absolute translate-middle badge rounded-pill bg-danger"
                    style={{ top: "35px", right: "45px" }}
                  >
                    3
                  </span>
                </div>
                <div className="cursor ms-4">
                  <i
                    className="bi bi-list text-white fs-3"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight"
                    aria-controls="offcanvasRight"
                  ></i>
                </div>
              </div>
            </div>
            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">
                  Quick Links
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body mt-5">
                <div className="d-flex flex-column">
                  <a
                    href="./about"
                    className="text-decoration-none text-dark fs-18 mb-3"
                  >
                    <i className="bi bi-info-circle mx-2"></i>About Us
                  </a>
                  <a
                    href="./contact"
                    className="text-decoration-none text-dark fs-18 mb-3"
                  >
                    <i className="bi bi-envelope mx-2"></i>Contact
                  </a>
                  <a
                    href="./contact"
                    className="text-decoration-none text-dark fs-18 mb-3"
                  >
                    <i className="bi bi-question-circle mx-2"></i>FAQ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ ALL MODALS SAME (UNCHANGED BELOW) */}

      {/* LOGIN MODAL */}
      <section>
        <div className="modal" id="myModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 d-flex justify-content-center">
                <img
                  src="./assets/images/Logo-login.png"
                  className="img-fluid"
                  alt="Logo"
                  style={{ width: "150px", marginInlineStart: "160px" }}
                />
                <button
                  type="button"
                  className="btn-close end-0 me-3 mb-5"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <p className="text-center fw-bold">Let's get started</p>
              <div className="mb-3 d-flex btn-group p-0 justify-content-center gap-4 bg-outline-primary w-75 rounded-5 mx-auto">
                <div
                  className="bg-blue m-1 mx-auto rounded-5 w-75 text-center p-3"
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  <span className="text-white fw-bold">Log in</span>
                </div>
                <div
                  className="bg-blue m-1 mx-auto rounded-5 w-75 text-center p-3"
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target="#signinModal"
                >
                  <span className="text-white fw-bold">Sign up</span>
                </div>
              </div>
              <div className="d-flex justify-content-between gap-0 mt-3">
                <input
                  type="tel"
                  className="form-control form-control-lg mb-2 w-75 mx-auto fs-18 rounded-5"
                  placeholder="Enter Your Phone Number"
                  value={phoneNnumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <input
                type="password"
                className="form-control form-control-lg mb-3 w-75 mx-auto fs-18 rounded-5"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                role="button"
                className="bg-blue mt-3 mx-auto rounded-5 w-75 text-center p-3 text-white fw-bold"
                onClick={handleSubmit}
              >
                {loading ? "Loading..." : "Continue"}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="modal" id="signinModal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="occassion-content modal-content">
              <div className="modal-header border-0 d-flex justify-content-center">
                <img
                  src="./assets/images/Logo-login.png"
                  className="img-fluid"
                  alt="Logo"
                  style={{ width: "150px", marginInlineStart: "160px" }}
                />
                <button
                  type="button"
                  className="btn-close end-0 me-3 mb-5"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <p className="text-center fw-bold">Let's get started</p>
              <div className="mb-3 d-flex btn-group p-0 justify-content-center gap-4 bg-outline-primary w-75 rounded-5 mx-auto">
                <div
                  className="bg-blue m-1 mx-auto rounded-5 w-75 text-center p-3"
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  <span className="text-white fw-bold">Log in</span>
                </div>
                <div
                  className="bg-blue m-1 mx-auto rounded-5 w-75 text-center p-3"
                  role="button"
                  data-bs-toggle="modal"
                  data-bs-target="#signinModal"
                >
                  <span className="text-white fw-bold">Sign up</span>
                </div>
              </div>
              <input
                type="text"
                className="form-control form-control-lg w-75 mx-auto fs-18 rounded-5 mt-3"
                placeholder="Enter Your Name"
              />
              <div className="d-flex justify-content-between gap-0 mt-2">
                <input
                  type="tel"
                  className="form-control form-control-lg mb-2 w-75 mx-auto fs-18 rounded-5"
                  placeholder="Enter Your Phone Number"
                />
              </div>
              <input
                type="password"
                className="form-control form-control-lg mb-3 w-75 mx-auto fs-18 rounded-5"
                placeholder="Enter Your Password"
              />
              <div
                role="button"
                className="bg-blue mt-3 mx-auto rounded-5 w-75 text-center p-3 text-white fw-bold"
              >
                Continue
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="modal" id="occassionModal">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content p-1">
              <div className="modal-header border-0 d-flex justify-content-center">
                <h1
                  className="color-brown fw-bold mt-4"
                  style={{ marginInlineStart: "290px" }}
                >
                  Occasions
                </h1>
                <button
                  type="button"
                  className="btn-close end-0 me-3 mb-3"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <p className="text-center fw-bold color-brown">
                Choose your special case
              </p>
              <div className="d-flex justify-content-between gap-0">
                <div className="d-flex">
                  <div className="occassion-card border-0 rounded-4">
                    <img
                      className="mt-3 occassion-img"
                      src="./assets/images/anniv.png"
                      alt="Card image"
                      style={{ marginInline: "40px" }}
                    />
                    <div className="card-body align-items-center">
                      <h6 className="text-center color-brown mt-2 fs-24 fw-bold">
                        Achievement
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="occassion-card border-0 rounded-4">
                    <img
                      className="mt-3 occassion-img"
                      src="./assets/images/birthday.png"
                      alt="Card image"
                      style={{ marginInline: "40px" }}
                    />
                    <div className="card-body align-items-center">
                      <h6 className="text-center color-brown mt-2 fs-24 fw-bold">
                        Birthday
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="occassion-card border-0 rounded-4">
                    <img
                      className="mt-3 occassion-img"
                      src="./assets/images/eidM.png"
                      alt="Card image"
                      style={{ marginInline: "40px" }}
                    />
                    <div className="card-body align-items-center">
                      <h6 className="text-center color-brown mt-2 fs-24 fw-bold">
                        Congratulation
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="occassion-card border-0 rounded-4">
                    <img
                      className="mt-3 occassion-img"
                      src="./assets/images/getwell.png"
                      alt="Card image"
                      style={{ marginInline: "40px" }}
                    />
                    <div className="card-body align-items-center">
                      <h6 className="text-center color-brown mt-2 fs-24 fw-bold">
                        Get well Soon
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="occassion-card border-0 rounded-4">
                    <img
                      className="mt-3 occassion-img"
                      src="./assets/images/gradu.png"
                      alt="Card image"
                      style={{ marginInline: "40px" }}
                    />
                    <div className="card-body align-items-center">
                      <h6 className="text-center color-brown mt-2 fs-24 fw-bold">
                        Graduation
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="occassion-card border-0 rounded-4">
                    <img
                      className="mt-3 occassion-img"
                      src="./assets/images/welcome.png"
                      alt="Card image"
                      style={{ marginInline: "40px" }}
                    />
                    <div className="card-body align-items-center">
                      <h6 className="text-center color-brown mt-2 fs-24 fw-bold">
                        Holidays
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex mt-4 gap-3">
                <div className="d-flex">
                  <div className="occassion-card border-0 rounded-4">
                    <img
                      className="mt-3 occassion-img"
                      src="./assets/images/welcome.png"
                      alt="Card image"
                      style={{ marginInline: "40px" }}
                    />
                    <div className="card-body align-items-center">
                      <h6 className="text-center color-brown mt-2 fs-24 fw-bold">
                        Holidays
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="occassion-card border-0 rounded-4">
                    <img
                      className="mt-3 occassion-img"
                      src="./assets/images/welcome.png"
                      alt="Card image"
                      style={{ marginInline: "40px" }}
                    />
                    <div className="card-body align-items-center">
                      <h6 className="text-center color-brown mt-2 fs-24 fw-bold">
                        Holidays
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="occassion-card border-0 rounded-4">
                    <img
                      className="mt-3 occassion-img"
                      src="./assets/images/welcome.png"
                      alt="Card image"
                      style={{ marginInline: "40px" }}
                    />
                    <div className="card-body align-items-center">
                      <h6 className="text-center color-brown mt-2 fs-24 fw-bold">
                        Holidays
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <div
                    role="button"
                    className="mx-2 p-2 rounded-3 bg-purple-two fw-bold text-dark"
                  >
                    Clear Section
                  </div>
                  <div
                    role="button"
                    className="mx-2 p-2 rounded-5 bg-blue fw-bold bg-purple-two text-white"
                  >
                    Apply
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎨 CSS */}
      <style jsx>{`
        {/* .header { background:#36aeb3; } */}
        .logo { height:45px; width:200px; }

        .nav-custom li {
          color:white;
          font-weight:600;
          cursor:pointer;
        }
        .nav-custom .active { color:#ffe600; }

        {/* .search-box {
          background:white;
          border-radius:25px;
          padding:3px 10px;
        }
        .search-box input {
          border:none;
          height:10px;
          width:200px;
          outline:none;
        }
        .search-box button {
          background:#ff4d7e;
          border:none;
          color:white;
          border-radius:50%;
          width:32px;
          height:32px;
        } */}

        .cursor { cursor:pointer; }
      `}</style>
    </header>
  );
}

export default Header;
