"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "react-bootstrap";

function Header() {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <header className="dashboard-topbar" id="header">
        <div className="container-fluid px-3 px-xl-4">
          <div className="d-flex align-items-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="dashboard-mobile-mark d-lg-none">
                <i className="bi bi-grid-1x2-fill"></i>
              </div>
              <div>
                <span className="dashboard-topbar-kicker">
                  Marble Slab admin
                </span>
                <h1 className="dashboard-topbar-title mb-0">
                  Store control center
                </h1>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2 gap-md-3">
              <span className="dashboard-system-status d-none d-md-inline-flex align-items-center gap-2">
                <i className="bi bi-circle-fill"></i>All systems operational
              </span>
              <button
                type="button"
                className="dashboard-topbar-icon"
                aria-label="Calendar"
                onClick={() => setActiveModal("calendar")}
              >
                <i className="bi bi-calendar3"></i>
              </button>
              <button
                type="button"
                className="dashboard-topbar-icon position-relative"
                aria-label="Notifications"
                onClick={() => setActiveModal("notifications")}
              >
                <i className="bi bi-bell"></i>
                <span className="dashboard-notification-dot"></span>
              </button>
              <button
                type="button"
                className="dashboard-profile d-flex align-items-center gap-2 border-0"
                aria-label="Open administrator profile"
                onClick={() => setActiveModal("admin")}
              >
                <span className="dashboard-avatar">A</span>
                <span className="d-none d-md-block text-start">
                  <strong className="d-block">Admin</strong>
                  <small>Administrator</small>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <Modal
        show={activeModal === "notifications"}
        onHide={closeModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-bell me-2 text-info"></i>Notifications
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dashboard-modal-list">
            <div className="dashboard-modal-list-item">
              <i className="bi bi-box-seam text-info"></i>
              <div>
                <strong>New order received</strong>
                <small>Order #MS-1048 needs your attention.</small>
              </div>
            </div>
            <div className="dashboard-modal-list-item">
              <i className="bi bi-check-circle text-success"></i>
              <div>
                <strong>Inventory sync completed</strong>
                <small>All product quantities are up to date.</small>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={activeModal === "calendar"} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-calendar3 me-2 text-info"></i>Calendar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <strong>September 2026</strong>
            <span className="badge text-bg-light">3 events</span>
          </div>
          <div className="dashboard-calendar-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span
                className="dashboard-calendar-day-name"
                key={`${day}-${index}`}
              >
                {day}
              </span>
            ))}
            {Array.from({ length: 30 }, (_, index) => (
              <span
                className={`dashboard-calendar-day ${[4, 11, 18].includes(index + 1) ? "has-event" : ""}`}
                key={index + 1}
              >
                {index + 1}
              </span>
            ))}
          </div>
          <div className="dashboard-calendar-events mt-3">
            <span>
              <i className="bi bi-circle-fill"></i> 11 Sep · Branch review
            </span>
            <span>
              <i className="bi bi-circle-fill"></i> 18 Sep · Team meeting
            </span>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={activeModal === "admin"} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Administrator profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dashboard-admin-profile text-center">
            <span className="dashboard-admin-avatar">A</span>
            <h5 className="mt-3 mb-1">Admin</h5>
            <p className="text-muted mb-4">Administrator</p>
            <div className="d-grid gap-2">
              <Link
                className="btn btn-outline-secondary"
                href="/dashboard"
                onClick={closeModal}
              >
                <i className="bi bi-speedometer2 me-2"></i>Dashboard
              </Link>
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={closeModal}
              >
                <i className="bi bi-box-arrow-right me-2"></i>Sign out
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
