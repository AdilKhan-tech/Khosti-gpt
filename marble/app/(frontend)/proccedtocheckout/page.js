"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  createOrderRoute,
  getAllCouponsRoute,
  validateCouponRoute,
} from "@/utils/apiRoutes";

export default function Cart() {
  const router = useRouter();
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [discount, setDiscount] = useState(0);
  const [customer, setCustomer] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("marbleCart") || "[]");
      setCartItems(Array.isArray(storedCart) ? storedCart : []);
    } catch {
      localStorage.removeItem("marbleCart");
      setCartItems([]);
    }
    axios.get(getAllCouponsRoute).catch(() => {});
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * item.quantity,
        0,
      ),
    [cartItems],
  );
  const total = Math.max(0, subtotal - discount);

  const updateQuantity = (id, change) =>
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  const removeItem = (id) =>
    setCartItems((items) => items.filter((item) => item.id !== id));
  const updateCustomer = (event) =>
    setCustomer((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

  const applyCoupon = async () => {
    try {
      const response = await axios.post(validateCouponRoute, {
        code: couponCode,
        subtotal,
      });
      setDiscount(Number(response.data.discount || 0));
      setCouponMessage(`Coupon applied: -${response.data.discount} SAR`);
    } catch (error) {
      setDiscount(0);
      setCouponMessage(error.response?.data?.message || "Invalid coupon");
    }
  };

  const placeOrder = async () => {
    if (!customer.name || !customer.phone || !cartItems.length) {
      setCouponMessage("Add your name, phone and at least one item first.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await axios.post(createOrderRoute, {
        user_id: session?.user?.id || null,
        customer_name: customer.name,
        customer_phone: customer.phone,
        customer_email: customer.email || null,
        fulfillment_type: "delivery",
        subtotal,
        delivery_fee: 0,
        total,
        payment_method: "pending",
        payment_status: "pending",
      });
      localStorage.removeItem("marbleCart");
      setCartItems([]);
      const orderNumber = response.data.data?.order_number || "your order";
      router.push(`/thankyou?order=${encodeURIComponent(orderNumber)}`);
    } catch (error) {
      setCouponMessage(
        error.response?.data?.message || "Order could not be created.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="top-alert border border-secondary rounded-3 bg-light d-flex justify-content-between px-3 py-2 mb-4">
        <span>
          {cartItems.length ? "Your cart is ready." : "Your cart is empty."}
        </span>
        <span>{cartItems.length} item(s)</span>
      </div>
      <h1 className="fw-bold mb-4 color-brown">My Cart</h1>

      <div className="d-flex gap-2 mb-4 flex-wrap">
        <input
          className="form-control"
          value={couponCode}
          onChange={(event) => setCouponCode(event.target.value)}
          placeholder="Coupon code"
          style={{ width: "270px" }}
        />
        <button
          className="btn rounded-5 text-white fw-bold"
          style={{ background: "#e85d88" }}
          onClick={applyCoupon}
        >
          Apply coupon
        </button>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          {cartItems.length === 0 && (
            <div className="cart-box p-5 text-center bg-white rounded-5 border">
              Your cart is empty.
            </div>
          )}
          {cartItems.map((item) => (
            <div
              className="cart-box p-3 mb-3 bg-white rounded-5 border"
              key={item.id}
            >
              <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cake-img"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                  <div>
                    <strong>{item.name}</strong>
                    <div className="text-muted">
                      {Number(item.price).toFixed(2)} SAR
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <button
                    className="btn btn-light rounded-circle"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-light rounded-circle"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="btn text-danger"
                    onClick={() => removeItem(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="summary rounded-5 p-4">
            <h6 className="mb-3 fw-bold">Summary</h6>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} SAR</span>
            </div>
            <div className="d-flex justify-content-between mb-2 text-danger">
              <span>Discount</span>
              <span>-{discount.toFixed(2)} SAR</span>
            </div>
            <div className="line"></div>
            <div className="d-flex justify-content-between mt-2 fw-bold">
              <span>Total</span>
              <b>{total.toFixed(2)} SAR</b>
            </div>
            <input
              className="form-control mt-4"
              name="name"
              placeholder="Full name"
              value={customer.name}
              onChange={updateCustomer}
            />
            <input
              className="form-control mt-2"
              name="phone"
              placeholder="Phone number"
              value={customer.phone}
              onChange={updateCustomer}
            />
            <input
              className="form-control mt-2"
              name="email"
              placeholder="Email (optional)"
              value={customer.email}
              onChange={updateCustomer}
            />
            {couponMessage && (
              <small className="d-block mt-3 text-secondary">
                {couponMessage}
              </small>
            )}
            <button
              className="btn rounded-5 text-white fw-bold w-100 mt-4"
              style={{ background: "#e85d88" }}
              onClick={placeOrder}
              disabled={isSubmitting || !cartItems.length}
            >
              {isSubmitting ? "Placing order..." : "Place order"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-box {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }
        .summary {
          background: #f3e8e6;
        }
        .line {
          border-bottom: 2px dashed #bdaaa3;
        }
      `}</style>
    </div>
  );
}
