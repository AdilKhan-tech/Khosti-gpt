"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  createCouponRoute,
  deleteCouponRoute,
  getAllCouponsRoute,
} from "@/utils/apiRoutes";

const emptyForm = {
  code: "",
  discount_type: "percent",
  amount: "",
  min_spend: 0,
  usage_limit: "",
  expires_at: "",
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [keywords, setKeywords] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const loadCoupons = async () => {
    const response = await axios.get(getAllCouponsRoute);
    setCoupons(response.data.data || []);
  };
  useEffect(() => {
    let active = true;
    axios
      .get(getAllCouponsRoute)
      .then((response) => {
        if (active) setCoupons(response.data.data || []);
      })
      .catch(() => {
        if (active) setMessage("Could not load coupons");
      });
    return () => {
      active = false;
    };
  }, []);
  const updateForm = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const createCoupon = async (event) => {
    event.preventDefault();
    try {
      await axios.post(createCouponRoute, {
        ...form,
        code: form.code.toUpperCase(),
        amount: Number(form.amount),
        min_spend: Number(form.min_spend || 0),
        usage_limit: form.usage_limit ? Number(form.usage_limit) : null,
        expires_at: form.expires_at || null,
      });
      setForm(emptyForm);
      setMessage("Coupon created");
      await loadCoupons();
      setShowCreate(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not create coupon");
    }
  };
  const removeCoupon = async (id) => {
    await axios.delete(deleteCouponRoute(id));
    await loadCoupons();
  };

  const filteredCoupons = coupons.filter((coupon) =>
    [coupon.code, coupon.discount_type, coupon.status]
      .join(" ")
      .toLowerCase()
      .includes(keywords.toLowerCase()),
  );

  return (
    <section className="mt-5">
      <div className="d-flex justify-content-between mb-3">
        <p className="pagetitle mb-0 fnt-color">Coupons</p>
        <div className="d-flex align-items-center gap-2">
          <span className="badge rounded-pill bg-light text-secondary border">
            {coupons.length} Coupons
          </span>
          <button
            className="btn-orange text-white fs-16 text-center border-0"
            type="button"
            onClick={() => setShowCreate(true)}
          >
            <i className="bi bi-plus-circle me-1"></i>
            Create
          </button>
        </div>
      </div>
      <div className="d-flex mb-3">
        <i className="bi bi-search fs-20 px-3 py-1 text-secondary position-absolute"></i>
        <input
          type="search"
          className="form-control px-5 text-dark-custom"
          style={{ height: "44px", width: "300px" }}
          placeholder="Search coupons..."
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
        />
      </div>
      <div className="row g-4">
        <div className="col-12">
          <div className="data-table table-responsive">
            <table className="table datatable-wrapper align-middle">
              <thead>
                <tr>
                  <th className="fw-medium fs-14 fnt-color nowrap">Code</th>
                  <th className="fw-medium fs-14 fnt-color nowrap">Discount</th>
                  <th className="fw-medium fs-14 fnt-color nowrap">Minimum</th>
                  <th className="fw-medium fs-14 fnt-color nowrap">Usage</th>
                  <th className="fw-medium fs-14 fnt-color nowrap">Expires</th>
                  <th className="fw-medium fs-14 fnt-color nowrap">Status</th>
                  <th className="fw-medium fs-14 fnt-color nowrap">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <td className="fw-semibold fnt-color">
                      <i className="bi bi-ticket-perforated text-info me-2"></i>
                      {coupon.code}
                    </td>
                    <td>
                      <span className="badge rounded-pill bg-info-subtle text-info">
                        {coupon.discount_type === "percent"
                          ? `${coupon.amount}%`
                          : `${coupon.amount} SAR`}
                      </span>
                    </td>
                    <td className="fnt-color">{coupon.min_spend} SAR</td>
                    <td>
                      {coupon.usage_count || 0}
                      {coupon.usage_limit ? ` / ${coupon.usage_limit}` : ""}
                    </td>
                    <td>
                      {coupon.expires_at
                        ? new Date(coupon.expires_at).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill ${coupon.status === "active" ? "bg-success-subtle text-success" : "bg-secondary-subtle text-secondary"}`}
                      >
                        {coupon.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn text-danger"
                        onClick={() => removeCoupon(coupon.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filteredCoupons.length && (
              <p className="text-center text-muted py-4">No coupons yet.</p>
            )}
          </div>
        </div>
        <Offcanvas
          show={showCreate}
          onHide={() => setShowCreate(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <span className="fs-24 fnt-color">Create Coupon</span>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <hr className="mt-0" />
          <Offcanvas.Body>
            <form onSubmit={createCoupon}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <span className="dashboard-icon dashboard-icon-primary">
                  <i className="bi bi-ticket-perforated"></i>
                </span>
                <div>
                  <h5 className="mb-1 fw-bold">Create coupon</h5>
                  <small className="text-secondary">
                    Add a store promotion
                  </small>
                </div>
              </div>
              <input
                className="form-control mb-2"
                name="code"
                placeholder="Code e.g. WELCOME10"
                value={form.code}
                onChange={updateForm}
                required
              />
              <select
                className="form-select mb-2"
                name="discount_type"
                value={form.discount_type}
                onChange={updateForm}
              >
                <option value="percent">Percentage</option>
                <option value="fixed_cart">Fixed amount</option>
              </select>
              <input
                className="form-control mb-2"
                name="amount"
                type="number"
                min="0"
                placeholder="Discount value"
                value={form.amount}
                onChange={updateForm}
                required
              />
              <input
                className="form-control mb-2"
                name="min_spend"
                type="number"
                min="0"
                placeholder="Minimum order"
                value={form.min_spend}
                onChange={updateForm}
              />
              <input
                className="form-control mb-2"
                name="usage_limit"
                type="number"
                min="1"
                placeholder="Usage limit (optional)"
                value={form.usage_limit}
                onChange={updateForm}
              />
              <input
                className="form-control mb-3"
                name="expires_at"
                type="date"
                value={form.expires_at}
                onChange={updateForm}
              />
              <button
                className="btn-orange text-white border-0 w-100"
                type="submit"
              >
                Create coupon
              </button>
              {message && (
                <small className="d-block mt-3 text-secondary">{message}</small>
              )}
            </form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </section>
  );
}
