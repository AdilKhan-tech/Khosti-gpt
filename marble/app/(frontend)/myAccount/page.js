"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { getAllOrdersRoute } from "@/utils/apiRoutes";

function MyAccount() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  // ── User Data ───────────────────────────────────────
  const [userData, setUserData] = useState({
    name: "Muhammad Adil",
    email: "adil.ce2007@gmail.com",
    phone: "+92 333 5838514",
    joinDate: "January 15, 2024",
    totalOrders: 24,
    totalSpent: "₨ 45,230",
    avatar: null,
  });
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "House #123, Street 4, Bahria Town Phase 8, Rawalpindi",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      address:
        "Office #07, 2nd Floor, Silicon Valley Plaza, Blue Area, Islamabad",
      isDefault: false,
    },
  ]);
  const [liveOrders, setLiveOrders] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    try {
      const storedWishlist = JSON.parse(
        localStorage.getItem("marbleWishlist") || "[]",
      );
      Promise.resolve().then(() =>
        setWishlistItems(Array.isArray(storedWishlist) ? storedWishlist : []),
      );
    } catch {
      localStorage.removeItem("marbleWishlist");
    }
  }, []);

  useEffect(() => {
    const sessionUser = session?.user;
    if (!sessionUser) return;

    const phone = sessionUser.phone_number || "";
    const storedAddresses = localStorage.getItem(`marbleAddresses:${phone}`);
    Promise.resolve().then(() => {
      setUserData((current) => ({
        ...current,
        name: sessionUser.name || current.name,
        phone: phone || current.phone,
        email: sessionUser.email || current.email,
      }));
      if (storedAddresses) setAddresses(JSON.parse(storedAddresses));
    });

    axios
      .get(getAllOrdersRoute)
      .then((response) => {
        const userOrders = (response.data.data || []).filter(
          (order) =>
            order.user_id === sessionUser.id ||
            order.customer_phone === phone ||
            order.customer_email === sessionUser.email ||
            order.customer_name === sessionUser.name,
        );
        setUserData((current) => ({
          ...current,
          totalOrders: userOrders.length,
          totalSpent: `SAR ${userOrders.reduce((sum, order) => sum + Number(order.total || 0), 0).toFixed(2)}`,
        }));
        setLiveOrders(userOrders);
      })
      .catch((error) => console.error("Error fetching account orders", error));
  }, [session]);

  useEffect(() => {
    const phone = session?.user?.phone_number;
    if (phone)
      localStorage.setItem(
        `marbleAddresses:${phone}`,
        JSON.stringify(addresses),
      );
  }, [addresses, session]);

  // ── Mock Data ────────────────────────────────────────
  const fallbackOrders = [
    {
      id: "#ORD-7890",
      date: "15 Mar 2024",
      items: 2,
      total: "₨ 4,250",
      status: "Delivered",
      statusClass: "bg-success-subtle text-success",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200",
      productName: "Chocolate Truffle Cake",
      category: "Cakes",
    },
    {
      id: "#ORD-7889",
      date: "14 Mar 2024",
      items: 1,
      total: "₨ 1,890",
      status: "Processing",
      statusClass: "bg-warning-subtle text-warning",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200",
      productName: "Butter Cookies (500g)",
      category: "Cookies",
    },
    {
      id: "#ORD-7888",
      date: "12 Mar 2024",
      items: 3,
      total: "₨ 3,550",
      status: "Shipped",
      statusClass: "bg-primary-subtle text-primary",
      image:
        "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?w=200",
      productName: "Assorted Biscuits Pack",
      category: "Biscuits",
    },
    {
      id: "#ORD-7887",
      date: "10 Mar 2024",
      items: 5,
      total: "₨ 6,750",
      status: "Delivered",
      statusClass: "bg-success-subtle text-success",
      image:
        "https://images.unsplash.com/photo-1606318801954-d46d46d3360a?w=200",
      productName: "Red Velvet Cake",
      category: "Cakes",
    },
    {
      id: "#ORD-7886",
      date: "08 Mar 2024",
      items: 2,
      total: "₨ 2,250",
      status: "Delivered",
      statusClass: "bg-success-subtle text-success",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200",
      productName: "Chocolate Chip Cookies",
      category: "Cookies",
    },
    {
      id: "#ORD-7885",
      date: "05 Mar 2024",
      items: 1,
      total: "₨ 890",
      status: "Cancelled",
      statusClass: "bg-danger-subtle text-danger",
      image:
        "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?w=200",
      productName: "Glucose Biscuits",
      category: "Biscuits",
    },
    {
      id: "#ORD-7884",
      date: "03 Mar 2024",
      items: 4,
      total: "₨ 5,990",
      status: "Processing",
      statusClass: "bg-warning-subtle text-warning",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200",
      productName: "Fresh Fruit Cake",
      category: "Cakes",
    },
    {
      id: "#ORD-7883",
      date: "01 Mar 2024",
      items: 3,
      total: "₨ 3,890",
      status: "Shipped",
      statusClass: "bg-primary-subtle text-primary",
      image:
        "https://images.unsplash.com/photo-1606318801954-d46d46d3360a?w=200",
      productName: "Black Forest Cake",
      category: "Cakes",
    },
    {
      id: "#ORD-7882",
      date: "28 Feb 2024",
      items: 2,
      total: "₨ 2,990",
      status: "Delivered",
      statusClass: "bg-success-subtle text-success",
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200",
      productName: "Shortbread Cookies",
      category: "Cookies",
    },
    {
      id: "#ORD-7881",
      date: "25 Feb 2024",
      items: 6,
      total: "₨ 7,890",
      status: "Delivered",
      statusClass: "bg-success-subtle text-success",
      image:
        "https://images.unsplash.com/photo-1587248720327-8eb72564be1e?w=200",
      productName: "Marie Biscuits Pack",
      category: "Biscuits",
    },
    {
      id: "#ORD-7880",
      date: "22 Feb 2024",
      items: 1,
      total: "₨ 2,450",
      status: "Processing",
      statusClass: "bg-warning-subtle text-warning",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200",
      productName: "Pineapple Cake",
      category: "Cakes",
    },
    {
      id: "#ORD-7879",
      date: "20 Feb 2024",
      items: 3,
      total: "₨ 4,550",
      status: "Shipped",
      statusClass: "bg-primary-subtle text-primary",
      image:
        "https://images.unsplash.com/photo-1606318801954-d46d46d3360a?w=200",
      productName: "Wedding Cake Slice",
      category: "Cakes",
    },
  ];
  const orders = liveOrders.map((order) => ({
    id: order.order_number,
    date: new Date(order.created_at).toLocaleDateString(),
    items: 1,
    total: `${order.total} SAR`,
    status: order.status,
    statusClass:
      order.status === "cancelled"
        ? "bg-danger-subtle text-danger"
        : "bg-success-subtle text-success",
    image: "/assets/images/graduation-prod-250x250.png",
    productName: "Marble Slab order",
    category: order.fulfillment_type,
  }));

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="container-fluid py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row g-4">
          {/* ── LEFT SIDEBAR ── */}
          <div className="col-lg-3">
            <div
              className="border-0 shadow-sm sticky-top"
              style={{ marginTop: "100px", zIndex: 10 }}
            >
              <div className="card-body text-center p-4">
                <div
                  className="avatar-circle bg-primary bg-gradient text-white mx-auto mb-3 d-flex align-items-center justify-content-center shadow"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    fontSize: "2rem",
                    fontWeight: 700,
                  }}
                >
                  {userData.name.charAt(0)}
                </div>
                <h6 className="fw-bold mb-1">{userData.name}</h6>
                <p className="text-muted small mb-0">{userData.email}</p>
              </div>

              <div className="list-group list-group-flush pb-2">
                {[
                  { id: "profile", icon: "bi-person", label: "Profile" },
                  { id: "orders", icon: "bi-bag-check", label: "My Orders" },
                  { id: "wishlist", icon: "bi-heart", label: "Wishlist" },
                  { id: "addresses", icon: "bi-geo-alt", label: "Addresses" },
                  { id: "settings", icon: "bi-gear", label: "Settings" },
                ].map((item) => (
                  <button
                    key={item.id}
                    className={`list-group-item list-group-item-action border-0 d-flex align-items-center gap-3 px-4 py-3 transition-all ${
                      activeTab === item.id
                        ? "bg-primary text-white shadow-sm"
                        : "text-secondary"
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <i className={`bi ${item.icon}`}></i>
                    <span className="fw-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="col-lg-9">
            <div
              className="border-0 shadow-sm p-4 p-md-5 bg-white rounded-4"
              style={{ marginTop: "100px" }}
            >
              {/* PROFILE SECTION */}
              {activeTab === "profile" && (
                <div className="animate-in">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold mb-0">My Profile</h4>
                    <button
                      className={`btn btn-sm px-4 rounded-pill ${isEditing ? "btn-secondary" : "btn-outline-primary"}`}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleProfileUpdate} className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-3"
                          value={userData.name}
                          onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control rounded-3"
                          value={userData.email}
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-bold">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="form-control rounded-3"
                          value={userData.phone}
                          onChange={(e) =>
                            setUserData({ ...userData, phone: e.target.value })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control rounded-3"
                          value={userData.address}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-12 mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary px-5 rounded-pill"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="text-muted small d-block mb-1">
                          Full Name
                        </label>
                        <p className="fw-bold fs-5">{userData.name}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small d-block mb-1">
                          Email Address
                        </label>
                        <p className="fw-bold fs-5">{userData.email}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small d-block mb-1">
                          Phone Number
                        </label>
                        <p className="fw-bold fs-5">{userData.phone}</p>
                      </div>
                      <div className="col-md-6">
                        <label className="text-muted small d-block mb-1">
                          Address
                        </label>
                        <p className="fw-bold fs-5">{userData.address}</p>
                      </div>
                      <div className="col-12 border-top pt-4 mt-4">
                        <div className="row text-center">
                          <div className="col-4">
                            <h4 className="text-primary fw-bold mb-0">
                              {userData.totalOrders}
                            </h4>
                            <small className="text-muted">Orders</small>
                          </div>
                          <div className="col-4 border-start border-end">
                            <h4 className="text-primary fw-bold mb-0">Gold</h4>
                            <small className="text-muted">Tier</small>
                          </div>
                          <div className="col-4">
                            <h4 className="text-primary fw-bold mb-0">₨ 45k</h4>
                            <small className="text-muted">Spent</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ORDERS SECTION */}
              {activeTab === "orders" && (
                <div className="animate-in">
                  <h4 className="fw-bold mb-4">Order History</h4>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle border-top">
                      <thead className="small text-muted">
                        <tr>
                          <th className="py-3">Order</th>
                          <th className="py-3">Preview</th>
                          <th className="py-3">Total</th>
                          <th className="py-3">Status</th>
                          <th className="py-3 text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, i) => (
                          <tr key={i}>
                            <td className="fw-bold">
                              {order.id}
                              <br />
                              <small className="text-muted fw-normal">
                                {order.date}
                              </small>
                            </td>
                            <td>
                              <img
                                src={order.image}
                                className="rounded"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  objectFit: "cover",
                                }}
                                alt="img"
                              />
                            </td>
                            <td className="fw-medium">{order.total}</td>
                            <td>
                              <span
                                className={`badge rounded-pill px-3 py-2 ${order.statusClass}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="text-end">
                              <button className="btn btn-sm btn-light border rounded-pill px-3">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* WISHLIST SECTION */}
              {activeTab === "wishlist" && (
                <div className="animate-in">
                  <h4 className="fw-bold mb-4">My Wishlist</h4>
                  <div className="row g-3">
                    {wishlistItems.map((item, i) => (
                      <div className="col-md-6 col-xl-4" key={i}>
                        <div className="card h-100 border rounded-4 overflow-hidden hover-lift shadow-sm">
                          <img
                            src={item.image}
                            className="card-img-top"
                            style={{ height: "150px", objectFit: "cover" }}
                            alt={item.name}
                          />
                          <div className="card-body p-3">
                            <h6 className="fw-bold small mb-1 text-truncate text-center align-items-center">
                              {item.name}
                            </h6>
                            <p className="text-primary fw-bold mb-3 text-center align-items-center">
                              {item.price}
                            </p>
                            <div className="d-flex gap-2">
                              <button className="btn btn-primary btn-sm w-100 rounded-pill">
                                Add to Cart
                              </button>
                              <button className="btn btn-outline-danger btn-sm rounded-circle">
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ADDRESSES SECTION */}
              {activeTab === "addresses" && (
                <div className="border-0 shadow-sm">
                  <div className="card-header bg-white border-0 px-4 py-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-semibold">My Addresses</h5>
                    <button
                      className="btn btn-primary btn-sm px-4"
                      data-bs-toggle="modal"
                      data-bs-target="#addressModal"
                      onClick={() => {
                        setIsAddMode(true);
                        setEditingAddress({
                          type: "Home",
                          address: "",
                          isDefault: false,
                        });
                      }}
                    >
                      <i className="bi bi-plus-lg me-1"></i> Add New
                    </button>
                  </div>

                  <div className="card-body p-4">
                    {addresses.length > 0 ? (
                      addresses.map((addr, index) => (
                        <div
                          key={addr.id}
                          className={` rounded-5 mb-3 border ${
                            addr.isDefault ? "border-primary shadow-sm" : ""
                          } hover-shadow transition-all`}
                        >
                          <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start">
                              <div className="d-flex align-items-start gap-3">
                                <div
                                  className={`p-3 rounded-circle d-flex align-items-center justify-content-center fs-4 ${
                                    addr.isDefault
                                      ? "bg-primary text-white"
                                      : "bg-light text-primary"
                                  }`}
                                >
                                  <i className="bi bi-geo-alt"></i>
                                </div>

                                <div>
                                  <div className="d-flex align-items-center gap-2 mb-2">
                                    <span
                                      className={`badge rounded-pill px-3 py-1 ${
                                        addr.isDefault
                                          ? "bg-primary"
                                          : "bg-secondary"
                                      }`}
                                    >
                                      {addr.type}
                                      {addr.isDefault && " • Default"}
                                    </span>
                                  </div>
                                  <p className="mb-0 text-muted small lh-base">
                                    {addr.address}
                                  </p>
                                </div>
                              </div>

                              <div className="dropdown">
                                <button
                                  className="btn btn-link text-dark p-0"
                                  data-bs-toggle="dropdown"
                                >
                                  <i className="bi bi-three-dots-vertical fs-5"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end shadow">
                                  <li>
                                    <button
                                      className="dropdown-item d-flex align-items-center gap-2"
                                      data-bs-toggle="modal"
                                      data-bs-target="#addressModal"
                                      onClick={() => {
                                        setIsAddMode(false);
                                        setEditingAddress({ ...addr, index });
                                      }}
                                    >
                                      <i className="bi bi-pencil text-primary"></i>{" "}
                                      Edit
                                    </button>
                                  </li>

                                  {!addr.isDefault && (
                                    <li>
                                      <button
                                        className="dropdown-item d-flex align-items-center gap-2"
                                        onClick={() => {
                                          const updated = addresses.map(
                                            (a, i) => ({
                                              ...a,
                                              isDefault: i === index,
                                            }),
                                          );
                                          setAddresses(updated);
                                          alert(
                                            `"${addr.type}" is now your default address`,
                                          );
                                        }}
                                      >
                                        <i className="bi bi-check-circle text-success"></i>{" "}
                                        Set as Default
                                      </button>
                                    </li>
                                  )}

                                  <li>
                                    <hr className="dropdown-divider" />
                                  </li>

                                  <li>
                                    <button
                                      className="dropdown-item text-danger d-flex align-items-center gap-2"
                                      onClick={() => {
                                        if (
                                          window.confirm("Delete this address?")
                                        ) {
                                          const updated = addresses.filter(
                                            (_, i) => i !== index,
                                          );
                                          setAddresses(updated);
                                        }
                                      }}
                                    >
                                      <i className="bi bi-trash"></i> Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-5 text-muted">
                        <i className="bi bi-geo-alt display-4 mb-3"></i>
                        <h5>No addresses added yet</h5>
                        <p className="small mb-4">
                          Add addresses for faster checkout
                        </p>
                        <button
                          className="btn btn-outline-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#addressModal"
                          onClick={() => {
                            setIsAddMode(true);
                            setEditingAddress({
                              type: "Home",
                              address: "",
                              isDefault: false,
                            });
                          }}
                        >
                          + Add First Address
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Address Modal (Add / Edit) ─────────────────────────────────────── */}
              <div
                className="modal fade"
                id="addressModal"
                tabIndex="-1"
                aria-labelledby="addressModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content rounded-4 border-0 shadow">
                    <div className="modal-header border-0 pb-0 px-4 pt-4">
                      <h5
                        className="modal-title fw-semibold"
                        id="addressModalLabel"
                      >
                        {isAddMode ? "Add New Address" : "Edit Address"}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>

                    <div className="modal-body px-4 pb-4">
                      {editingAddress && (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();

                            if (isAddMode) {
                              // Add new
                              const newAddr = {
                                id: Date.now(),
                                ...editingAddress,
                              };
                              setAddresses([...addresses, newAddr]);
                              alert("New address added!");
                            } else {
                              // Edit existing
                              const updated = addresses.map((a, i) =>
                                i === editingAddress.index ? editingAddress : a,
                              );
                              setAddresses(updated);
                              alert("Address updated!");
                            }

                            // Modal close
                            const modalEl =
                              document.getElementById("addressModal");
                            const modal = bootstrap.Modal.getInstance(modalEl);
                            modal.hide();

                            // Reset form
                            setEditingAddress(null);
                            setIsAddMode(false);
                          }}
                        >
                          <div className="row g-3">
                            <div className="col-md-6">
                              <label className="form-label fw-medium">
                                Address Type
                              </label>
                              <select
                                className="form-select"
                                value={editingAddress.type}
                                onChange={(e) =>
                                  setEditingAddress({
                                    ...editingAddress,
                                    type: e.target.value,
                                  })
                                }
                              >
                                <option value="Homev6">Home</option>
                                <option value="Office">Office</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>

                            <div className="col-12">
                              <label className="form-label fw-medium">
                                Full Address
                              </label>
                              <textarea
                                className="form-control"
                                rows="4"
                                placeholder="House #, Street, Area, City"
                                value={editingAddress.address}
                                onChange={(e) =>
                                  setEditingAddress({
                                    ...editingAddress,
                                    address: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>

                            <div className="col-12">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="setDefault"
                                  checked={editingAddress.isDefault}
                                  onChange={(e) =>
                                    setEditingAddress({
                                      ...editingAddress,
                                      isDefault: e.target.checked,
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="setDefault"
                                >
                                  Make this my default address
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 d-flex gap-3 justify-content-end">
                            <button
                              type="button"
                              className="btn btn-outline-secondary px-4"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary px-5"
                            >
                              {isAddMode ? "Add Address" : "Save Changes"}
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SETTINGS SECTION */}
              {activeTab === "settings" && (
                <div className="border-0 shadow-sm animate__animated animate__fadeIn">
                  <div className="card-header bg-white border-0 px-4 py-3">
                    <h5 className="mb-0 fw-semibold">Account Settings</h5>
                  </div>

                  <div className="card-body p-4">
                    {/* Notifications Section */}
                    <h6 className="fw-bold mb-3 text-uppercase small text-muted">
                      Notifications
                    </h6>
                    <div className="list-group list-group-flush border rounded-3 mb-5">
                      <div className="list-group-item d-flex justify-content-between align-items-center px-4 py-3">
                        <div>
                          <h6 className="mb-1 fw-medium">
                            Order & Delivery Updates
                          </h6>
                          <small className="text-muted">
                            Get notified about order status changes
                          </small>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="orderNotif"
                            defaultChecked
                          />
                        </div>
                      </div>

                      <div className="list-group-item d-flex justify-content-between align-items-center px-4 py-3">
                        <div>
                          <h6 className="mb-1 fw-medium">
                            Promotions & Offers
                          </h6>
                          <small className="text-muted">
                            Receive exclusive deals and discounts
                          </small>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="promoNotif"
                            defaultChecked
                          />
                        </div>
                      </div>

                      <div className="list-group-item d-flex justify-content-between align-items-center px-4 py-3">
                        <div>
                          <h6 className="mb-1 fw-medium">SMS Notifications</h6>
                          <small className="text-muted">
                            Instant updates via text message
                          </small>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="smsNotif"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Security Section */}
                    <h6 className="fw-bold mb-3 text-uppercase small text-muted">
                      Security
                    </h6>
                    <div className="list-group list-group-flush border rounded-3 mb-5">
                      <div className="list-group-item px-4 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1 fw-medium">Change Password</h6>
                            <small className="text-muted">
                              Update your password regularly
                            </small>
                          </div>
                          <button className="btn btn-outline-primary btn-sm px-4">
                            Change Password
                          </button>
                        </div>
                      </div>

                      <div className="list-group-item px-4 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1 fw-medium">
                              Two-Factor Authentication
                            </h6>
                            <small className="text-muted">
                              Add extra security to your account
                            </small>
                          </div>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="2fa"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="list-group-item px-4 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1 fw-medium">
                              Logout from All Devices
                            </h6>
                            <small className="text-muted">
                              Sign out everywhere except this device
                            </small>
                          </div>
                          <button className="btn btn-outline-danger btn-sm px-4">
                            Logout All
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Privacy Section */}
                    <h6 className="fw-bold mb-3 text-uppercase small text-muted">
                      Privacy
                    </h6>
                    <div className="list-group list-group-flush border rounded-3 mb-5">
                      <div className="list-group-item d-flex justify-content-between align-items-center px-4 py-3">
                        <div>
                          <h6 className="mb-1 fw-medium">Profile Visibility</h6>
                          <small className="text-muted">
                            Allow others to see your profile
                          </small>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="profileVisible"
                            defaultChecked
                          />
                        </div>
                      </div>

                      <div className="list-group-item d-flex justify-content-between align-items-center px-4 py-3">
                        <div>
                          <h6 className="mb-1 fw-medium">
                            Share Order History
                          </h6>
                          <small className="text-muted">
                            Show your orders to friends (coming soon)
                          </small>
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="shareOrders"
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <h6 className="fw-bold mb-3 text-uppercase small text-danger">
                      Danger Zone
                    </h6>
                    <div className="border border-danger rounded-3 p-4 bg-danger-subtle">
                      <h6 className="text-danger mb-2">Delete Account</h6>
                      <p className="text-muted small mb-3">
                        Permanently delete your account and all associated data.
                        This action cannot be undone.
                      </p>
                      <button className="btn btn-danger btn-sm px-4">
                        <i className="bi bi-trash me-1"></i> Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .transition-all {
          transition: all 0.2s ease-in-out;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08) !important;
        }
        .hover-light:hover {
          background-color: #f8f9fa;
        }
        .animate-in {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default MyAccount;
