"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllProductsRoute, getAllOcassions } from "@/utils/apiRoutes";
import { useRouter } from "next/navigation";

export default function IceCreams() {
  const [products, setProducts] = useState([]);
  const [productOccasions, setProductOccasions] = useState([]);
  const router = useRouter();

  const fetchProductOccasions = async () => {
    try {
      const res = await axios.get(getAllOcassions);
      setProductOccasions(res.data.data);
    } catch (err) {
      console.error("Error fetching product Occasions", err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(getAllProductsRoute);

        const cakeProducts = res.data.data.filter((product) =>
          product.categories?.some(
            (cat) => cat.name_en.toLowerCase() === "cakes",
          ),
        );

        setProducts(cakeProducts);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    const loadPageData = async () => {
      await Promise.all([fetchProducts(), fetchProductOccasions()]);
    };

    loadPageData();
  }, []);

  return (
    <section>
      <img
        style={{ width: "100%" }}
        src="/assets/images/ice-cak-bnner.jpg"
        alt="ice cream banner"
      />
      <hr />
      <div className="tabs-wrapper px-2 mt-4 all-filters-slider d-flex align-items-center position-reative mb-0">
        <button className="cat_left me-3">‹</button>

        <div
          className="tabs d-flex"
          style={{
            scrollBehavior: "smooth",
            overflowX: "auto",
            flex: "1",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {productOccasions.map((occasion) => (
            <div key={occasion.id} className="tab ms-2">
              <img
                className="img-fluid rounded-circle border-image"
                src={occasion.image_url}
                alt={occasion.name_en}
              />
              <span className="fs-13 fw-normal">{occasion.name_en}</span>
            </div>
          ))}
        </div>

        <button className="cat_right ms-3">›</button>
        <button
          className="rounded-5 border px-4 mb-2 py-1 text-brown fs-20 bg-transparent d-flex align-items-center gap-1 ms-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight-2"
          aria-controls="offcanvasRight-2"
        >
          <i className="bi bi-funnel"></i>
        </button>
      </div>

      <div className="container-fluid px-5 py-1">
        <div className="row g-4 mt-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="col-xl-3 col-lg-3 col-md-6 col-sm-12"
            >
              <div className="cakes-card w-100 card border-0 rounded-4 h-100 shadow-sm p-3">
                <img
                  className="w-100 rounded-4"
                  src={product.image_url}
                  alt={product.name_en}
                  style={{ objectFit: "cover", height: "250px" }}
                />
                <div className="card-body text-center">
                  <h6 className="text-center color-brown fs-15 fw-bold">
                    {product.name_en}
                  </h6>
                  <p className="fs-14 text-muted">{product.sku || "N/A"}</p>
                  <p className="text-center text-blue fs-16 fw-medium">
                    SR {product.regular_price}
                  </p>
                  <button
                    onClick={() => router.push(`/cakes/${product.id}/view`)}
                    className="btn rounded-2 px-5 py-2 fs-14 fw-bold bg-pink text-white"
                    type="submit"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          <a
            href="https://wa.me/+923335838514"
            className="whatsapp-chat"
            target="_blank"
          >
            <img
              style={{ width: "60px" }}
              src="/assets/images/whatsapp_chat.png"
            />
          </a>
        </div>

        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="offcanvasRight-2"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header bg-secondary">
            <h5
              className="offcanvas-title text-center"
              id="offcanvasRightLabel"
            >
              Filters
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

        <div className="d-flex justify-content-center mt-4">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className="page-item">
                <a
                  className="page-link ms-1 me-1 rounded-2 text-secondary"
                  href="#"
                >
                  1
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link ms-1 me-1 rounded-2 text-secondary"
                  href="#"
                >
                  2
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link ms-1 me-1 rounded-2 text-secondary"
                  href="#"
                >
                  3
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link ms-1 me-1 rounded-2 text-secondary"
                  href="#"
                >
                  4
                </a>
              </li>
              <li className="page-item">
                <a
                  className="page-link ms-1 me-2 rounded-2 text-secondary"
                  href="#"
                >
                  Next ››
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
