"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Checkout() {
  // Static cart items for summary
  const cartItems = [
    {
      id: 1,
      name: "We dream and achieve cookie cake",
      quantity: 1,
      price: 173.0,
    },
  ];

  const [selectedMethod, setSelectedMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const subtotal = 173.0;
  const deliveryFee = selectedMethod === "delivery" ? 15.0 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div
      className="checkout-page"
      style={{ background: "#f8f9fc", minHeight: "100vh" }}
    >
      <div className="container py-5" style={{ marginTop: "100px" }}>
        {/* Page Header */}
        <div className="row mb-5">
          <div className="col-12">
            <h1 className="display-4 fw-bold text-dark mb-2">Checkout</h1>
            <p className="text-secondary-emphasis fs-5">
              Complete your order to enjoy our delicious treats
            </p>
          </div>
        </div>

        <div className="row g-5">
          {/* LEFT COLUMN - Form Section */}
          <div className="col-lg-7">
            {/* Progress Steps */}
            <div className="d-flex justify-content-between mb-5 px-2">
              <div className="text-center" style={{ flex: 1 }}>
                <div
                  className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-2"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-cart-check fs-5"></i>
                </div>
                <small className="text-success fw-semibold">Cart</small>
              </div>
              <div className="text-center" style={{ flex: 1 }}>
                <div
                  className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center mx-auto mb-2"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-file-text fs-5"></i>
                </div>
                <small className="text-info fw-semibold">Details</small>
              </div>
              <div className="text-center" style={{ flex: 1 }}>
                <div
                  className="rounded-circle bg-secondary bg-opacity-25 text-secondary d-flex align-items-center justify-content-center mx-auto mb-2"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-credit-fs-5"></i>
                </div>
                <small className="text-secondary">Payment</small>
              </div>
            </div>

            {/* Gift Option */}
            <div className="border-0 shadow-sm rounded-4 mb-4 border-start border-4 border-warning">
              <div className="card-body p-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="giftOption"
                    style={{
                      cursor: "pointer",
                      accentColor: "#e85d88",
                      width: "1.2rem",
                      height: "1.2rem",
                    }}
                  />
                  <label
                    className="form-check-label fw-semibold ms-2"
                    htmlFor="giftOption"
                    style={{ color: "#b85c1a" }}
                  >
                    <i className="bi bi-gift-fill me-2 text-warning"></i>
                    Do you want to gift this product? (Includes gift wrapping
                    and personalized message)
                  </label>
                </div>
              </div>
            </div>

            {/* Delivery/Pickup Toggle */}
            <div className="border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h6 className="fw-bold mb-3">
                  <i className="bi bi-truck me-2 text-info"></i>
                  Receiving Method
                </h6>
                <div className="d-flex gap-3">
                  <button
                    onClick={() => setSelectedMethod("delivery")}
                    className={`btn px-4 py-2 rounded-pill fw-semibold transition-all ${
                      selectedMethod === "delivery"
                        ? "btn-info text-white shadow-sm"
                        : "btn-outline-secondary"
                    }`}
                  >
                    <i className="bi bi-truck me-2"></i>
                    Delivery
                  </button>
                  <button
                    onClick={() => setSelectedMethod("pickup")}
                    className={`btn px-4 py-2 rounded-pill fw-semibold transition-all ${
                      selectedMethod === "pickup"
                        ? "btn-info text-white shadow-sm"
                        : "btn-outline-secondary"
                    }`}
                  >
                    <i className="bi bi-shop me-2"></i>
                    Pickup
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery/Pickup Details based on selection */}
            {selectedMethod === "pickup" ? (
              <div className="border-0 shadow-sm rounded-4 mb-4 bg-gradient-pickup">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">
                      <i className="bi bi-geo-alt-fill me-2 text-info"></i>
                      Pickup Location
                    </h6>
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3">
                      <i className="bi bi-pencil"></i> Change
                    </button>
                  </div>
                  <div className="bg-white rounded-3 p-3 mb-3">
                    <div className="d-flex gap-3 align-items-start">
                      <i className="bi bi-shop text-info fs-4"></i>
                      <div>
                        <p className="fw-semibold mb-1">Al Rawdah Branch</p>
                        <p className="text-secondary small mb-1">
                          Prince Sultan Rd, Ar Rawdah, Jeddah 23433
                        </p>
                        <p className="text-secondary small mb-0">
                          📞 +966 12 345 6789
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        className="form-control rounded-3"
                        defaultValue="2026-03-30"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-semibold">
                        Time Slot
                      </label>
                      <select
                        className="form-select rounded-3"
                        defaultValue="4-6"
                      >
                        <option value="10-12">10:00 AM - 12:00 PM</option>
                        <option value="4-6">4:00 PM - 6:00 PM</option>
                        <option value="7-9">7:00 PM - 9:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">
                      <i className="bi bi-house-door me-2 text-info"></i>
                      Delivery Address
                    </h6>
                    <button className="btn btn-sm btn-outline-danger rounded-pill px-3">
                      <i className="bi bi-plus"></i> Add New
                    </button>
                  </div>
                  <div className="border rounded-3 p-3 mb-3 bg-light">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="address"
                        id="address1"
                        defaultChecked
                        style={{ accentColor: "#e85d88" }}
                      />
                      <label
                        className="form-check-label ms-2"
                        htmlFor="address1"
                      >
                        <div>
                          <p className="fw-semibold mb-1">Zad Modern</p>
                          <p className="text-secondary small mb-1">
                            Prince Sultan Rd, Ar Rawdah, Jeddah 23433
                          </p>
                          <p className="text-secondary small mb-0">
                            📞 +966 536741445
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recipient's Data */}
            <div className="border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h6 className="fw-bold mb-3">
                  <i className="bi bi-person-circle me-2 text-info"></i>
                  Recipient's Information
                </h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2"
                      defaultValue="Zad Modern"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold small">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-3 py-2"
                      defaultValue="zad@example.com"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label fw-semibold small">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-control rounded-3 py-2"
                      defaultValue="+966 536741445"
                      placeholder="Enter phone number"
                    />
                  </div>
                  {selectedMethod === "delivery" && (
                    <div className="col-12">
                      <label className="form-label fw-semibold small">
                        Delivery Instructions (Optional)
                      </label>
                      <textarea
                        className="form-control rounded-3"
                        rows={2}
                        placeholder="Gate code, building name, special instructions..."
                      ></textarea>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Discount */}
            <div className="border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h6 className="fw-bold mb-3">
                  <i className="bi bi-ticket-perforated me-2 text-info"></i>
                  Have a Promo Code?
                </h6>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-end-0 rounded-end-0 rounded-start-3 py-2"
                    placeholder="Enter promo code"
                  />
                  <button
                    className="btn px-4 rounded-end-3 fw-semibold"
                    style={{ backgroundColor: "#2aa7b3", color: "white" }}
                  >
                    Apply
                  </button>
                </div>
                <small className="text-secondary mt-2 d-block">
                  <i className="bi bi-info-circle"></i> Enjoy 10% off on orders
                  above 200 SR
                </small>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Order Summary */}
          <div className="col-lg-5">
            <div className="position-sticky" style={{ top: "100px" }}>
              {/* Order Summary */}
              <div
                className="border-0 shadow-lg rounded-4 mb-4"
                style={{ background: "white" }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold mb-0">Order Summary</h3>
                    <span className="badge bg-info bg-opacity-10 text-info px-3 py-2 rounded-pill">
                      {cartItems.length}{" "}
                      {cartItems.length === 1 ? "Item" : "Items"}
                    </span>
                  </div>

                  {/* Cart Items */}
                  <div className="mb-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="d-flex justify-content-between align-items-center py-2"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <span className="fw-medium text-dark">
                            {item.name}
                          </span>
                          <span className="text-secondary small bg-light px-2 py-1 rounded">
                            x{item.quantity}
                          </span>
                        </div>
                        <span
                          className="fw-semibold"
                          style={{ color: "#2aa7b3" }}
                        >
                          {item.price.toFixed(2)} SR
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-top border-dashed my-3"></div>

                  {/* Totals */}
                  <div className="d-flex justify-content-between py-2">
                    <span className="text-secondary">Subtotal</span>
                    <span className="fw-medium">{subtotal.toFixed(2)} SR</span>
                  </div>
                  {deliveryFee > 0 && (
                    <div className="d-flex justify-content-between py-2">
                      <span className="text-secondary">Delivery Fee</span>
                      <span className="fw-medium">
                        {deliveryFee.toFixed(2)} SR
                      </span>
                    </div>
                  )}
                  <div className="border-top my-3"></div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="fw-bold fs-5">Total</span>
                    <span className="fw-bold fs-4" style={{ color: "#e85d88" }}>
                      {total.toFixed(2)} SR
                    </span>
                  </div>

                  <div className="bg-light rounded-3 p-3 my-3">
                    <small className="text-secondary d-flex align-items-center gap-2">
                      <i className="bi bi-clock-history"></i>
                      Estimated delivery:{" "}
                      {selectedMethod === "delivery"
                        ? "2-3 business days"
                        : "Ready for pickup in 1 hour"}
                    </small>
                  </div>

                  <div className="border-top my-3"></div>

                  {/* Payment Methods */}
                  <div className="mt-2">
                    <h6 className="fw-bold mb-3">Select Payment Method</h6>

                    <div
                      className={`border rounded-3 p-3 mb-3 ${paymentMethod === "bank" ? "border-info bg-info bg-opacity-10" : "border-secondary"}`}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="bankTransfer"
                          checked={paymentMethod === "bank"}
                          onChange={() => setPaymentMethod("bank")}
                          style={{ accentColor: "#e85d88", cursor: "pointer" }}
                        />
                        <label
                          className="form-check-label fw-semibold ms-2"
                          htmlFor="bankTransfer"
                        >
                          <i className="bi bi-bank me-2"></i>
                          Direct Bank Transfer
                        </label>
                      </div>
                      {paymentMethod === "bank" && (
                        <small className="text-secondary d-block mt-2 ms-4 ps-3">
                          Make payment to: SA 594xxxxxxxxxx •
                          Reference: Order ID
                        </small>
                      )}
                    </div>

                    <div
                      className={`border rounded-3 p-3 mb-3 ${paymentMethod === "card" ? "border-info bg-info bg-opacity-10" : "border-secondary"}`}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="cardPayment"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          style={{ accentColor: "#e85d88", cursor: "pointer" }}
                        />
                        <label
                          className="form-check-label fw-semibold ms-2"
                          htmlFor="cardPayment"
                        >
                          <i className="bi bi-credit-me-2"></i>
                          Credit / Debit Card
                        </label>
                      </div>
                      {paymentMethod === "card" && (
                        <div className="mt-2 ms-4 ps-3">
                          <div className="d-flex gap-2 mb-2">
                            <img
                              src="https://img.icons8.com/color/24/visa.png"
                              alt="visa"
                            />
                            <img
                              src="https://img.icons8.com/color/24/mastercard.png"
                              alt="mastercard"
                            />
                            <img
                              src="https://img.icons8.com/color/24/amex.png"
                              alt="amex"
                            />
                          </div>
                          <small className="text-secondary">
                            Secure payment powered by Stripe
                          </small>
                        </div>
                      )}
                    </div>

                    <div
                      className={`border rounded-3 p-3 ${paymentMethod === "cod" ? "border-info bg-info bg-opacity-10" : "border-secondary"}`}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="paymentMethod"
                          id="cashOnDelivery"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          style={{ accentColor: "#e85d88", cursor: "pointer" }}
                        />
                        <label
                          className="form-check-label fw-semibold ms-2"
                          htmlFor="cashOnDelivery"
                        >
                          <i className="bi bi-cash-stack me-2"></i>Cash on
                          Delivery
                        </label>
                      </div>
                      <small className="text-secondary d-block mt-1 ms-4 ps-3">
                        Pay when your order arrives
                      </small>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <button
                    className="btn w-100 mt-4 py-3 text-white fw-bold rounded-pill shadow-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, #e85d88 0%, #d94a6f 100%)",
                      border: "none",
                    }}
                  >
                    <i className="bi bi-lock-fill me-2"></i>Place Order •{" "}
                    {total.toFixed(2)} SR
                  </button>

                  {/* Trust Badges */}
                  <div className="d-flex justify-content-center gap-4 mt-4">
                    <small className="text-secondary">
                      <i className="bi bi-shield-check text-success"></i> Secure
                      Checkout
                    </small>
                    <small className="text-secondary">
                      <i className="bi bi-arrow-repeat text-info"></i> 30-Day
                      Returns
                    </small>
                    <small className="text-secondary">
                      <i className="bi bi-headset text-warning"></i> 24/7Support
                    </small>
                  </div>
                </div>
              </div>

              {/* Privacy Policy */}
              <div className="border-0 bg-transparent">
                <div className="card-body p-0">
                  <small className="text-secondary d-flex gap-2 align-items-start">
                    <i className="bi bi-shield-check text-info mt-1"></i>
                    <span>
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our{" "}
                      <Link href="/privacy" className="text-decoration-none">
                        privacy policy
                      </Link>
                      .
                    </span>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Custom CSS */}
      <style jsx>{`
        .border-dashed {
          border-top: 2px dashed #dee2e6 !important;
        }
        .bg-gradient-pickup {
          background: linear-gradient(135deg, #fff9f0 0%, #fff5e8 100%);
        }
        .form-control:focus,
        .form-select:focus {
          box-shadow: 0 0 0 3px rgba(42, 167, 179, 0.1);
          border-color: #2aa7b3;
        }
        .btn:focus {
          box-shadow: none;
        }
        .transition-all {
          transition: all 0.2s ease;
        }
        @media (max-width: 768px) {
          .position-sticky {
            position: relative !important;
            top: 0 !important;
            margin-top: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
