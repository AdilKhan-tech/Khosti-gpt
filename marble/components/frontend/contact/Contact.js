"use client";
import React from "react";

function Page() {
  return (
    <section>

      {/* TOP CONTACT BAR */}
      <div
        className="p-4"
        style={{ backgroundColor: "#6d5794" }}
      >
        <div className="container">
          <div className="row mt-2">

            <div className="col-md-4">
              <div className="d-flex align-items-center gap-3">
                <img src="/assets/images/call-contact.png" width="40" />
                <div>
                  <p className="m-0 fs-5 fw-bold text-white">Customer hotline</p>
                  <p className="m-0 text-white">920011480</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-center gap-3">
                <img src="/assets/images/whatsapp-contact.png" width="40" />
                <div>
                  <p className="m-0 fs-5 fw-bold text-white">WhatsApp</p>
                  <p className="m-0 text-white">+966594064708</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="d-flex align-items-center gap-3">
                <img src="/assets/images/email-contact.png" width="40" />
                <div>
                  <p className="m-0 fs-5 fw-bold text-white">E-mail</p>
                  <p className="m-0 text-white">info@marblestore.com</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* VISIT US SECTION */}
      <div className="py-5" style={{ background: "#e9ecef" }}>
        <div className="container">

          <h1 className="fw-bold mb-3">Visit us 💛</h1>

          <h5>
            Our Stores in <span style={{ color: "#2bb3b1" }}>Jeddah</span>
          </h5>

          {/* MAP PLACEHOLDER */}
          <div
            style={{
              height: "300px",
              background: "#d9dde1",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          ></div>

        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="py-5" style={{ background: "#d7cfc6" }}>
        <div className="container">

          <h1 className="text-center fw-bold">FAQ</h1>
          <p className="text-center mb-5">Frequently Ask Questions</p>

          <div className="accordion" id="faqAccordion">

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq1"
                >
                  How to place an order?
                </button>
              </h2>

              <div
                id="faq1"
                className="accordion-collapse collapse show"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">

                  <p><b>Step 1:</b> Browse cakes and pick your favourite.</p>
                  <p><b>Step 2:</b> Add message and notes then click Add to Cart.</p>
                  <p><b>Step 3:</b> Go to cart and proceed to checkout.</p>
                  <p><b>Step 4:</b> Enter shipping details and payment method.</p>
                  <p><b>Step 5:</b> Relax while we deliver your cake.</p>

                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq2"
                >
                  How do I check for allergens?
                </button>
              </h2>

              <div
                id="faq2"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Please contact our support team to confirm allergen details.
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq3"
                >
                  Delivery information / modification
                </button>
              </h2>

              <div
                id="faq3"
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  Delivery timing can be changed before order dispatch.
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}

export default Page;