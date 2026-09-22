"use client";
import React from "react";
import axios from "axios";
import { getAllOcassions } from "@/utils/apiRoutes";
import { useEffect, useState } from "react";

function Occasions() {
  const [productOccasions, setProductOccasions] = useState([]);

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
    <main>
      <div className="bg-pink">
        <div className="container">
          <h1 className="text-center occassion-text py-4">By Occassions</h1>
          <div className="row mt-4 ms-3">
            {productOccasions.map((occasion) => (
              <div
                key={occasion.id}
                role="button"
                className="col-6 col-md-3 text-center mb-4"
              >
                <img
                  className="img-fluid mb-2 occassion-card-img"
                  src={occasion.image_url}
                  alt={occasion.name_en}
                  onError={(event) => {
                    event.currentTarget.src = "/assets/images/notfound.png";
                  }}
                />
                <div className="fs-18 fw-bold text-brown ">
                  {occasion.name_en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="container text-center py-5 bg-light"
        style={{
          backgroundImage: "url('./assets/images/Group.svg')",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: "12px",
          backgroundSize: "62px",
        }}
      >
        <h2 className="fw-bold fs-44">By Categories</h2>
        <div className="d-flex justify-content-center flex-wrap">
          <div className="product-card py-5 border-0 rounded-4">
            <h4 className="text-center fs-35 fw-bold">Cakes</h4>
            <a href="/cakes">
              <img
                className="mt-3"
                src="./assets/images/Mermaid-cake-1.webp"
                alt="image-fluid"
                style={{ width: "75%" }}
              />
            </a>
          </div>
          <div className="product-card py-5 border-0 rounded-4">
            <h4 className="text-center fs-35 fw-bold">Cookies</h4>
            <a href="/cookies">
              <img
                className="mt-3"
                src="./assets/images/cookiespg1.png"
                alt="image-fluid"
                style={{ width: "75%" }}
              />
            </a>
          </div>
          <div className="product-card py-5 border-0 rounded-4">
            <h4 className="text-center fs-35 fw-bold">Marble Van</h4>
            <a href="/marble-van">
              <img
                className="mt-3"
                src="./assets/images/mvan.png"
                alt="image-fluid"
                style={{ width: "75%" }}
              />
            </a>
          </div>
        </div>
      </div>
      {/* <Moregift /> */}
    </main>
  );
}

export default Occasions;
