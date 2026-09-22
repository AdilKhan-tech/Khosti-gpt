"use client";

import Link from "next/link";

export default function ProductPage() {
  const addToCart = () => {
    localStorage.setItem(
      "marbleCart",
      JSON.stringify([
        {
          id: 1,
          name: "We dream and achieve cookie cake",
          quantity: 1,
          price: 173,
          image:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
        },
      ]),
    );
  };

  const relatedProducts = [
    {
      id: 1,
      name: "HBD Sarah",
      code: "Cookie-hbd-004",
      price: "SR 270",
      image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6b1?w=400",
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

  return (
    <div style={{ background: "#f5f5f5", marginTop: "134px" }}>
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left Image */}
          <div className="col-md-6">
            <div className="p-4 bg-white rounded-4 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800"
                alt="Cookie Cake"
                className="w-100 rounded-4"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="col-md-6">
            <h1
              className="fw-bold mb-3"
              style={{ fontSize: "40px", color: "#5a4a47" }}
            >
              We dream and achieve cookie cake
            </h1>

            <p className="text-muted mb-4">
              12-inch Original Chocolate Cookie Cake.
            </p>

            <h2
              style={{ color: "#e75480", fontSize: "42px", fontWeight: "700" }}
            >
              173.00 <span style={{ fontSize: "20px" }}>SR</span>
            </h2>

            <div className="d-flex align-items-center gap-3 my-4">
              <Link
                href={`/addToCartLocation`}
                onClick={addToCart}
                className="btn px-4 rounded-pill"
                style={{ background: "#e75480", color: "#fff" }}
              >
                Add to Cart
              </Link>

              <div className="d-flex align-items-center gap-3">
                <div
                  className="border rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 45, height: 45 }}
                >
                  −
                </div>
                <span className="fs-5">1</span>
                <div
                  className="border rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 45, height: 45 }}
                >
                  +
                </div>
              </div>
            </div>

            <div className="d-flex gap-4 border-bottom pb-2 mt-4">
              <span className="fw-semibold border-bottom border-2 border-dark pb-2">
                Description
              </span>
              <span className="text-muted">Calories</span>
              <span className="text-muted">Alergens</span>
            </div>

            <p className="mt-3 text-muted">
              12-inch Original Chocolate Cookie Cake.
            </p>
          </div>
        </div>
      </div>

      {/* Related */}
      <div style={{ background: "#e9ecef" }}>
        <div className="container py-5">
          <h2 className="fw-bold mb-5" style={{ color: "#5a4a47" }}>
            You may also like
          </h2>

          <div className="row text-center">
            {relatedProducts.map((item) => (
              <div key={item.id} className="col-6 col-md-4 col-lg-2 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="img-fluid rounded-circle mb-3"
                  style={{ height: 180, objectFit: "cover" }}
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
