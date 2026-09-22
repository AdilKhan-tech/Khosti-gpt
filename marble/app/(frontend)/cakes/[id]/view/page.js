"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProductByIdRoute } from "@/utils/apiRoutes";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const relatedProducts = [
    {
      id: 1,
      name: "HBD Sarah",
      code: "Cookie-hbd-004",
      price: "SR 270",
      image: "/assets/images/cookie-cake.jpg",
    },
    {
      id: 2,
      name: "HBD teenage year",
      code: "Cookie-hbd-002",
      price: "SR 173",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    },
    {
      id: 3,
      name: "HBD Big pants",
      code: "Cookie-hbd-017",
      price: "SR 173",
      image:
        "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400",
    },
    {
      id: 4,
      name: "HBD Donkey",
      code: "Cookie-hbd-014",
      price: "SR 173",
      image:
        "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400",
    },
    {
      id: 5,
      name: "HBD Flash and boy",
      code: "Cookie-hbd-013",
      price: "SR 173",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
    },
  ];

  const fetchProduct = async () => {
    try {
      const response = await axios.get(getProductByIdRoute(id));
      setProduct(response.data.data || response.data); // depends on API
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProductToCart = (event) => {
    event.preventDefault();
    if (!product) return;

    const existingCart = JSON.parse(localStorage.getItem("marbleCart") || "[]");
    const price = Number(product.sale_price || product.regular_price || 0);
    const existingItem = existingCart.find((item) => item.id === product.id);
    const cart = existingItem
      ? existingCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [
          ...existingCart,
          {
            id: product.id,
            name: product.name_en,
            quantity: 1,
            price,
            image: product.image_url,
          },
        ];

    localStorage.setItem("marbleCart", JSON.stringify(cart));
    router.push("/addToCartLocation");
  };

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!product) return <p className="text-center mt-5">Product not found</p>;

  return (
    <div style={{ background: "#f5f5f5" }}>
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Image */}
          <div className="col-md-4 ms-5">
            <div className="p-4 bg-white rounded-4 shadow-sm">
              <img
                src={product.image_url}
                alt={product.name_en}
                className="w-100 rounded-4"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="col-md-7 mb-md-0">
            <h1
              className="fw-bold mb-3"
              style={{ fontSize: "50px", color: "#5a4a47" }}
            >
              {product.name_en}
            </h1>

            <p className="fw-normal text-muted" style={{ fontSize: "14px" }}>
              {product.description || "N/A"}
            </p>
            <div className="d-flex align-items-center gap-3">
              <h2
                style={{
                  color: "#e75480",
                  fontSize: "42px",
                  fontWeight: "700",
                }}
              >
                {product.regular_price}.00
                <span style={{ fontSize: "20px" }}> SR</span>
              </h2>
            </div>
            <div className="d-flex gap-4 mt-0">
              <div className="d-flex align-items-center gap-3 my-4">
                <Link
                  href="/addToCartLocation"
                  onClick={addProductToCart}
                  className="btn px-4 rounded-pill"
                  style={{ background: "#e75480", color: "#fff" }}
                >
                  Add to Cart
                </Link>
              </div>
              <div className="qty d-flex ms-3 align-items-center rounded-5 px-2 py-1">
                <button
                  style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                >
                  -
                </button>
                <span className="ms-4 me-4 fs-5">1</span>
                <button
                  style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-flex gap-4 border-bottom pb-2 mt-4">
              <ul className="nav nav-underline">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    Description
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Calories
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Allergens
                  </a>
                </li>
              </ul>
            </div>

            <p className="mt-3 text-dark">
              {product.description || "No description available"}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div style={{ background: "#e9ecef" }}>
        <div className="container py-5">
          <h2 className="fw-bold mb-5" style={{ color: "#5a4a47" }}>
            You may also like
          </h2>
          <div className="row d-flex justify-content-center text-center">
            {relatedProducts.map((item) => (
              <div key={item.id} className="col-6 col-md-4 col-lg-2 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid rounded-3 mb-3"
                  style={{ height: 220, objectFit: "cover" }}
                />
                <h6 className="fw-bold">{item.name}</h6>
                <p className="text-muted small">{item.code}</p>
                <p style={{ color: "#00a8b5", fontWeight: 600 }}>
                  {item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
