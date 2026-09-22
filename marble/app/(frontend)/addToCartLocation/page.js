"use client";
import React, { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  Button,
  Form,
  Row,
  Col,
  Card,
  Nav,
  Badge,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import CustomTimePicker from "../../../components/dashboard/general/CustomTimePicker";
import {
  loadGoogleMapsScript,
  initializeMap,
  cleanupGoogleMaps,
} from "@/utils/googleMaps";
import Link from "next/link";
import { registerRoute } from "@/utils/apiRoutes";

const AddLocation = ({ closePopup }) => {
  const { status, update } = useSession();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const isAuthenticated = status === "authenticated" || isUnlocked;
  const shouldShowAuthModal = status === "unauthenticated" && !isUnlocked;

  useEffect(() => {
    if (status === "authenticated") {
      setIsUnlocked(true);
    }
  }, [status]);

  const [formData, setFormData] = useState({
    name_english: "Downtown Dubai",
    name_arabic: "داون تاون دبي",
    address: "MV99+2W3, Dhoke Sadumar, Islamabad, Pakistan",
    latitude: "33.6844",
    longitude: "73.0479",
    allowed_radius: "200.00",
    receiving_type: "delivery",
    send_for_someone: false,
    selected_date: "2026-03-02",
    selected_time: "02:00 PM",
  });

  const [mapType, setMapType] = useState("map");
  const [selectedCity, setSelectedCity] = useState("Jeddah");
  const [searchTerm, setSearchTerm] = useState("");
  const mapId = "fa13a61ca6c03c0b";

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const mapInitialized = useRef(false);

  const handleAuthChange = (event) => {
    const { name, value } = event.target;
    setAuthForm((current) => ({ ...current, [name]: value }));
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      if (authMode === "register") {
        await axios.post(registerRoute, {
          full_name: authForm.name,
          phone_number: authForm.phone,
          password: authForm.password,
        });
      }

      const result = await signIn("credentials", {
        phone_number: authForm.phone,
        password: authForm.password,
        redirect: false,
      });

      if (result?.error) {
        setAuthError("Phone number or password is incorrect.");
        return;
      }

      setIsUnlocked(true);
      await update();
    } catch (error) {
      setAuthError(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Unable to continue. Please check your details.",
      );
    } finally {
      setAuthLoading(false);
    }
  };

  const nearbyLocations = [
    { name: "Dahaban", distance: "2.5 km", available: true },
    { name: "Ash Shamiyya", distance: "3.8 km", available: true },
    { name: "Alif", distance: "5.2 km", available: true },
    { name: "Bahra", distance: "6.1 km", available: false },
    { name: "Khumrah", distance: "7.3 km", available: true },
    { name: "Almahamed", distance: "8.0 km", available: true },
    { name: "Alshaya", distance: "9.4 km", available: true },
    { name: "Alshayya", distance: "10.2 km", available: false },
    { name: "North Ridge", distance: "11.5 km", available: true },
    { name: "South Park", distance: "12.8 km", available: true },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLocationClick = (location) => {
    setFormData((prev) => ({
      ...prev,
      address: location.name,
      name_english: location.name,
    }));
  };

  const filteredLocations = nearbyLocations.filter((loc) =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Load Google Map
  useEffect(() => {
    if (!isAuthenticated) return undefined;

    loadGoogleMapsScript(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY).then(
      () => {
        if (!mapInitialized.current && mapRef.current) {
          const { map, marker } = initializeMap(
            mapRef,
            formData,
            setFormData,
            mapId,
          );
          markerRef.current = marker;
          mapInitialized.current = true;
        }
      },
    );
    return () => cleanupGoogleMaps(mapRef, markerRef, mapInitialized);
  }, [formData, isAuthenticated]);

  return (
    <>
      <div className="location-manager">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />

        <div
          className="header-section location-modal-header bg-white border-bottom"
          style={{ top: "134px", zIndex: 1020 }}
        >
          <div className="container-fluid px-4 py-3">
            <div className="align-items-center row">
              <div className="col">
                <h4 className="mb-0 fw-bold">
                  <i className="bi bi-geo-alt-fill text-primary me-2"></i>Add
                  New Location
                </h4>
                <p className="text-secondary mb-0 small">
                  Configure location details and delivery settings
                </p>
              </div>
              <div className="col-auto">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={closePopup}
                  className="rounded-circle"
                >
                  <i className="bi bi-x-lg"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container-fluid location-modal-body px-4 py-4"
          style={{ marginTop: "134px" }}
        >
          <div className="g-4 row">
            {/* Left Column */}
            <div className="col-lg-4">
              <div className="border-0 shadow-sm h-100">
                <div className="p-4">
                  {/* Delivery Settings */}
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                      <i className="bi bi-geo-alt text-primary"></i>
                    </div>
                    <h6 className="fw-semibold mb-0">Delivery Settings</h6>
                  </div>

                  <div className="mb-4">
                    <p className="fw-semibold form-label text-secondary small mb-2">
                      Select the receiving type
                    </p>
                    <div className="d-flex gap-3">
                      <div className="mb-3 d-flex btn-group p-0 justify-content-center gap-4 bg-outline-primary w-75 rounded-5 mx-auto">
                        <div
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              receiving_type: "delivery",
                            }))
                          }
                          className={`m-1 mx-auto rounded-5 w-100 text-center p-3 ${
                            formData.receiving_type === "delivery"
                              ? "bg-primary"
                              : "bg-light"
                          }`}
                          role="button"
                        >
                          <span
                            className={`fw-bold ${formData.receiving_type === "delivery" ? "text-white" : "text-dark"}`}
                          >
                            Delivery
                          </span>
                        </div>

                        <div
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              receiving_type: "pickup",
                            }))
                          }
                          className={`m-1 mx-auto rounded-5 w-100 text-center p-3 ${
                            formData.receiving_type === "pickup"
                              ? "bg-primary"
                              : "bg-light"
                          }`}
                          role="button"
                        >
                          <span
                            className={`fw-bold ${formData.receiving_type === "pickup" ? "text-white" : "text-dark"}`}
                          >
                            Pickup
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {formData.receiving_type === "delivery" && (
                    <>
                      <div className="mb-4 form-group">
                        <Form.Check
                          type="switch"
                          id="send-for-someone"
                          label={
                            <span className="fw-semibold">
                              Send for someone
                              <span className="text-secondary small ms-2">
                                (Gift delivery)
                              </span>
                            </span>
                          }
                          name="send_for_someone"
                          checked={formData.send_for_someone}
                          onChange={handleChange}
                        />
                      </div>

                      {formData.send_for_someone && (
                        <>
                          <div className="mb-3">
                            <input
                              type="text"
                              placeholder="Recipient Name"
                              name="receiver_name"
                              value={formData.receiver_name || ""}
                              onChange={handleChange}
                              className="mb-2 form-control form-control-lg"
                            />
                            <input
                              type="text"
                              placeholder="Recipient Phone"
                              name="receiver_phone"
                              value={formData.receiver_phone || ""}
                              onChange={handleChange}
                              className="form-control form-control-lg"
                            />
                          </div>

                          <div className="mb-4 form-group">
                            <p className="fw-semibold form-label text-secondary small">
                              Complete Address
                            </p>
                            <input
                              type="text"
                              value={formData.name_en}
                              onChange={handleChange}
                              name="name_en"
                              placeholder="Enter complete address"
                              className="form-control form-control-lg"
                            />
                          </div>
                        </>
                      )}

                      <input
                        type="text"
                        placeholder="Address Line"
                        name="address"
                        className="mb-2 form-control form-control-lg"
                      />

                      <div className="mb-4">
                        <div className="fw-semibold form-label text-secondary small mb-2">
                          Schedule Delivery
                        </div>
                        <div className="g-2 row">
                          <div className="mb-3 col-md-12">
                            <div className="bg-light border-end-0">
                              <Form.Control
                                type="date"
                                name="selected_date"
                                value={formData.selected_date}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="mb-3 col-md-12">
                            <label className="form-label text-secondary">
                              Timing
                            </label>
                            <CustomTimePicker
                              value={formData.timing}
                              onChange={(value) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  timing: value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {formData.receiving_type === "pickup" && (
                    <>
                      <div className="mb-3">
                        <label className="form-label text-secondary small fw-semibold">
                          Recipient City
                        </label>
                        <select
                          type="select"
                          placeholder="Select A City"
                          name="receiver_city"
                          value={formData.receiver_city || ""}
                          onChange={handleChange}
                          className="form-select mb-2"
                        >
                          <option value="">Select a city</option>
                          <option value="city1">City 1</option>
                          <option value="city2">City 2</option>
                          <option value="city3">City 3</option>
                        </select>

                        <label className="form-label text-secondary small fw-semibold">
                          Choose A Store
                        </label>
                        <select
                          type="select"
                          placeholder="Select a store"
                          name="receiver_store"
                          value={formData.receiver_store || ""}
                          onChange={handleChange}
                          className="form-select mb-4"
                        >
                          <option value="">Select a store</option>
                          <option value="store1">Store 1</option>
                          <option value="store2">Store 2</option>
                          <option value="store3">Store 3</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <div className="fw-semibold form-label text-secondary small mb-2">
                          Choose date and time slot
                        </div>
                        <div className="g-2 row">
                          <div className="mb-3 col-md-12">
                            <div className="bg-light border-end-0">
                              <Form.Control
                                type="date"
                                name="selected_date"
                                value={formData.selected_date}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="mb-3 col-md-12">
                            <CustomTimePicker
                              value={formData.timing}
                              onChange={(value) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  timing: value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Link
                    href="/proccedtocheckout"
                    className="w-100 mb-4 py-2 fw-semibold bg-primary text-white d-inline-flex justify-content-center align-items-center gap-2"
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Save Settings
                  </Link>

                  {/* Preview */}
                  <div className="bg-light rounded-3 p-3 mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary small">English:</span>
                      <span className="fw-semibold small">
                        {formData.name_english}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary small">Arabic:</span>
                      <span className="fw-semibold small" dir="rtl">
                        {formData.name_arabic}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-secondary small">Radius:</span>
                      <span className="fw-semibold small">
                        {formData.allowed_radius} meters
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-secondary small">Coordinates:</span>
                      <span className="fw-semibold small">
                        {formData.latitude}, {formData.longitude}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column */}
            <div className="col-lg-5">
              <div className="border-0 shadow-sm">
                <div className="bg-white border-0 p-3">
                  <div className="">
                    <Badge bg="light" text="dark" className="px-3 py-2">
                      <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                      Live Location
                    </Badge>
                  </div>
                </div>

                {/* Map Container */}
                <div style={{ height: "450px", background: "#e9ecef" }}>
                  <div
                    ref={mapRef}
                    style={{ width: "100%", height: "100%" }}
                  ></div>
                </div>

                {/* Info Bar */}
                <div className="p-3 border-top bg-white">
                  <Row className="align-items-center">
                    <Col>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                          <i className="bi bi-geo-alt text-primary"></i>
                        </div>
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <h6 className="fw-semibold mb-0">{selectedCity}</h6>
                            <span className="badge bg-light text-dark">
                              جدة
                            </span>
                          </div>
                          <p className="small text-secondary mb-0">
                            {formData.address}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col xs="auto">
                      <Button variant="outline-primary" size="sm">
                        Directions <i className="bi bi-arrow-right ms-2"></i>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-3">
              <div className="border-0 shadow-sm h-100">
                <div className="bg-white border-0 p-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-semibold mb-0">Nearby Locations</h6>
                    <Badge bg="secondary" className="rounded-pill">
                      {filteredLocations.length} available
                    </Badge>
                  </div>
                  <InputGroup size="sm">
                    <p className="position-absolute mt-3 ms-2 text-secondary">
                      <i className="bi bi-search"></i>
                    </p>
                    <Form.Control
                      placeholder="Search locations..."
                      className="form-control form-control-sm position-relative ms-2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </div>
                <div
                  style={{ maxHeight: "500px", overflowY: "auto" }}
                  className="locations-list"
                >
                  {filteredLocations.map((location, index) => (
                    <div
                      key={index}
                      className={`location-item p-3 border-bottom ${location.available ? "available" : "unavailable"}`}
                      onClick={() =>
                        location.available && handleLocationClick(location)
                      }
                      style={{
                        cursor: location.available ? "pointer" : "not-allowed",
                        opacity: location.available ? 1 : 0.6,
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="d-flex align-items-center mb-1">
                            <i className="bi bi-geo-alt text-secondary me-2"></i>
                            <span className="fw-semibold">{location.name}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <small className="text-secondary">
                              {location.distance}
                            </small>
                            {!location.available && (
                              <Badge
                                bg="warning"
                                text="dark"
                                className="ms-2 small"
                              >
                                Coming Soon
                              </Badge>
                            )}
                          </div>
                        </div>
                        {location.available ? (
                          <i className="bi bi-arrow-right text-primary"></i>
                        ) : (
                          <i className="bi bi-x-circle text-secondary"></i>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Card.Footer className="bg-white border-0 p-3">
                  <Button variant="link" className="text-decoration-none p-0">
                    <i className="bi bi-plus-circle me-2"></i>Add New Location
                  </Button>
                </Card.Footer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {shouldShowAuthModal && (
        <div
          className="modal fade show d-block"
          id="locationAuthModal"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby="locationAuthTitle"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header border-0 d-flex justify-content-center">
                <img
                  src="./assets/images/Logo-login.png"
                  className="img-fluid"
                  alt="Logo"
                  style={{ width: "150px" }}
                />
              </div>
              <p id="locationAuthTitle" className="text-center fw-bold">
                Let&apos;s get started
              </p>
              <div className="mb-3 d-flex btn-group p-0 justify-content-center gap-4 bg-outline-primary w-75 rounded-5 mx-auto">
                <button
                  type="button"
                  className={`border-0 m-1 mx-auto rounded-5 w-75 text-center p-3 ${authMode === "login" ? "bg-blue text-white" : "bg-light text-dark"}`}
                  onClick={() => {
                    setAuthMode("login");
                    setAuthError("");
                  }}
                >
                  <span className="fw-bold">Log in</span>
                </button>
                <button
                  type="button"
                  className={`border-0 m-1 mx-auto rounded-5 w-75 text-center p-3 ${authMode === "register" ? "bg-blue text-white" : "bg-light text-dark"}`}
                  onClick={() => {
                    setAuthMode("register");
                    setAuthError("");
                  }}
                >
                  <span className="fw-bold">Sign up</span>
                </button>
              </div>
              <form onSubmit={handleAuthSubmit}>
                {authMode === "register" && (
                  <input
                    type="text"
                    className="form-control form-control-lg mb-2 w-75 mx-auto fs-18 rounded-5 mt-3"
                    name="name"
                    placeholder="Enter Your Name"
                    value={authForm.name}
                    onChange={handleAuthChange}
                    required
                  />
                )}
                <input
                  type="tel"
                  className="form-control form-control-lg mb-2 w-75 mx-auto fs-18 rounded-5 mt-3"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  value={authForm.phone}
                  onChange={handleAuthChange}
                  required
                />
                <input
                  type="password"
                  className="form-control form-control-lg mb-3 w-75 mx-auto fs-18 rounded-5"
                  name="password"
                  placeholder="Enter Your Password"
                  value={authForm.password}
                  onChange={handleAuthChange}
                  required
                />
                {authError && (
                  <div className="alert alert-danger py-2 w-75 mx-auto">
                    {authError}
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-blue border-0 mt-3 mx-auto rounded-5 w-75 text-center p-3 text-white fw-bold d-block"
                  disabled={authLoading}
                >
                  {authLoading
                    ? "Loading..."
                    : authMode === "register"
                      ? "Create account"
                      : "Continue"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddLocation;
