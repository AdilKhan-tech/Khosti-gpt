"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const sidebarRef = useRef(null);
  const parentActive = (paths) => paths.some((p) => pathname.startsWith(p));

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setActiveDropdown(null);
  };

  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add("sidebar-collapsed");
      document.body.classList.remove("sidebar-open");
    } else {
      document.body.classList.add("sidebar-open");
      document.body.classList.remove("sidebar-collapsed");
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setActiveDropdown(null); // saare dropdowns close ho jayenge
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Floating Toggle Button when collapsed */}
      {isCollapsed && (
        <button
          onClick={toggleCollapse}
          className="sidebar-toggle-btn border-none d-flex align-items-center position-fixed justify-content-center text-dark org-btn"
          aria-label="Expand sidebar"
        >
          <i className="bi bi-list fs-4"></i>
        </button>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className="dashboard-sidebar position-fixed bg-white"
      >
        <div className="sidebar-header bg-white position-sticky d-flex align-items-center justify-content-between mt-0 p-4">
          <Link href="/dashboard" className="logo-link text-decoration-none">
            {isCollapsed ? (
              <div className="text-dark org-btn w-100">
                <i className="bi bi-list fs-3"></i>
              </div>
            ) : (
              <div className="d-flex text-dark gap-1 fs-24">
                <i className="bi bi-grid text-orange"></i>
                Dashboard
              </div>
            )}
          </Link>

          {!isCollapsed && (
            <button
              onClick={toggleCollapse}
              className="bg-light border-none p-2 btn"
              aria-label="Collapse sidebar"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul className="list-unstyled m-0 p-2">
            {/* Dashboard */}
            <li className="mb-2 position-relative">
              <Link
                href="/dashboard"
                className={`d-flex align-items-center ${isActive("/dashboard") ? "active" : ""}`}
              >
                <i className="bi bi-speedometer text-center fs-5"></i>
                {!isCollapsed && <span className="ms-2">Dashboard</span>}
              </Link>
            </li>

            {/* Product */}
            <li>
              <Link
                href="/dashboard/product"
                className={`d-flex align-items-center ${isActive("/dashboard/product") ? "active" : ""}`}
              >
                <i className="bi bi-box fs-5"></i>
                {!isCollapsed && <span className="ms-2">Product</span>}
              </Link>
            </li>

            {/* Orders */}
            <li>
              <Link
                href="/dashboard/orders"
                className={`d-flex align-items-center ${isActive("/dashboard/orders") ? "active" : ""}`}
              >
                <i className="bi bi-receipt fs-5"></i>
                {!isCollapsed && <span className="ms-2">Orders</span>}
              </Link>
            </li>

            {/* Cakes */}
            <li className="mb-2 position-relative">
              <button
                className={`dropdown-toggle ${parentActive(["/dashboard/cake"]) ? "active" : ""}`}
                onClick={() =>
                  setActiveDropdown(activeDropdown === "Cakes" ? null : "Cakes")
                }
                aria-expanded={activeDropdown === "Cakes"}
              >
                <i className="bi bi-cake2 fs-4"></i>
                {!isCollapsed && (
                  <>
                    <span className="ms-2">Cakes</span>
                    <i
                      className={`bi bi-chevron-${activeDropdown === "Cakes" ? "up" : "down"} ms-auto`}
                    ></i>
                  </>
                )}
              </button>

              {/* submenu position-relative*/}
              {!isCollapsed && activeDropdown === "Cakes" && (
                <div className="submenu position-relative mt-2 d-flex align-items-center fs-14 text-decoration-none flex-column">
                  <Link
                    href="/dashboard/cake/cakeSize"
                    className={`d-block align-items-center ${isActive("/dashboard/cake/cakeSize") ? "active" : ""}`}
                  >
                    <i className="bi bi-box-seam me-2 fs-5"></i>
                    Cake Sizes
                  </Link>
                  <Link
                    href="/dashboard/cake/cakeFlavour"
                    className={`d-block align-items-center ${isActive("/dashboard/cake/cakeFlavour") ? "active" : ""}`}
                  >
                    <i className="bi bi-heart me-2 fs-5"></i>
                    Cake Flavors
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeSize"
                    className={`d-block align-items-center ${isActive("/dashboard/cake/customCakeSize") ? "active" : ""}`}
                  >
                    <i className="bi bi-pencil-square me-2 fs-5"></i>
                    Custom Cake Sizes
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeFlavor"
                    className={`d-block align-items-center ${isActive("/dashboard/cake/customCakeFlavor") ? "active" : ""}`}
                  >
                    <i className="bi bi-stars me-2 fs-5"></i>
                    Custom Cake Flavors
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeType"
                    className={`d-block align-items-center ${isActive("/dashboard/cake/customCakeType") ? "active" : ""}`}
                  >
                    <i className="bi bi-list-ul me-2 fs-5"></i>
                    Custom Cake Types
                  </Link>
                  <Link
                    href="/dashboard/cake/cakePortionSize"
                    className={`d-block align-items-center ${isActive("/dashboard/cake/cakePortionSize") ? "active" : ""}`}
                  >
                    <i className="bi bi-stopwatch me-2 fs-5"></i>
                    Cake Portion Sizes
                  </Link>
                </div>
              )}

              {/* Collapsed dropdown */}
              {isCollapsed && activeDropdown === "Cakes" && (
                <div className="collapse-dropdown bg-white rounded-4 p-3 position-fixed fs-14">
                  <div className="dropdown-header fnt-color p-2">Cakes</div>
                  <Link
                    href="/dashboard/cake/cakeSize"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-box-seam me-2 fs-5"></i>
                    Cake Sizes
                  </Link>
                  <Link
                    href="/dashboard/cake/cakeFlavour"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-heart me-2 fs-5"></i>
                    Cake Flavors
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeSize"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-pencil-square me-2 fs-5"></i>
                    Custom Cake Sizes
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeFlavor"
                    className="dropdown-link nowrap d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-stars me-2 fs-5"></i>
                    Custom Cake Flavors
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeType"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-list-ul me-2 fs-5"></i>
                    Custom Cake Types
                  </Link>
                  <Link
                    href="/dashboard/cake/cakePortionSize"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-stopwatch me-2 fs-5"></i>
                    Cake Portion Sizes
                  </Link>
                </div>
              )}
            </li>

            {/* Ice Cream */}
            <li className="mb-2 position-relative">
              <button
                className={`dropdown-toggle ${parentActive(["/dashboard/icecream"]) ? "active" : ""}`}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "IceCream" ? null : "IceCream",
                  )
                }
                aria-expanded={activeDropdown === "IceCream"}
              >
                <i className="bi bi-cone fs-4"></i>
                {!isCollapsed && (
                  <>
                    <span className="ms-2">Ice Cream</span>
                    <i
                      className={`bi bi-chevron-${activeDropdown === "IceCream" ? "up" : "down"} ms-auto`}
                    ></i>
                  </>
                )}
              </button>

              {!isCollapsed && activeDropdown === "IceCream" && (
                <div className="submenu position-relative mt-2 d-flex align-items-center fs-14 text-decoration-none flex-column">
                  <Link
                    href="/dashboard/icecream/iceCreamAddon"
                    className={`d-block align-items-center ${isActive("/dashboard/icecream/iceCreamAddon") ? "active" : ""}`}
                  >
                    <i className="bi bi-plus-circle me-2 fs-5"></i>
                    Ice Cream Add-Ons
                  </Link>
                  <Link
                    href="/dashboard/icecream/iceCreamBucket"
                    className={`d-block align-items-center ${isActive("/dashboard/icecream/iceCreamBucket") ? "active" : ""}`}
                  >
                    <i className="bi bi-bucket me-2 fs-5"></i>
                    Ice Cream Buckets
                  </Link>
                  <Link
                    href="/dashboard/icecream/iceCreamPortionSize"
                    className={`d-block align-items-center ${isActive("/dashboard/icecream/iceCreamPortionSize") ? "active" : ""}`}
                  >
                    <i className="bi bi-stopwatch me-2 fs-5"></i>
                    Ice Cream Portion Sizes
                  </Link>
                </div>
              )}

              {isCollapsed && activeDropdown === "IceCream" && (
                <div className="collapse-dropdown bg-white rounded-4 p-3 position-fixed fs-14">
                  <div className="dropdown-header fnt-color p-2">Ice Cream</div>
                  <Link
                    href="/dashboard/icecream/iceCreamAddon"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-plus-circle me-2 fs-5"></i>
                    Ice Cream Add-Ons
                  </Link>
                  <Link
                    href="/dashboard/icecream/iceCreamBucket"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-bucket me-2 fs-5"></i>
                    Ice Cream Buckets
                  </Link>
                  <Link
                    href="/dashboard/icecream/iceCreamPortionSize"
                    className="dropdown-link nowrap d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-stopwatch me-2 fs-5"></i>
                    Ice Cream Portion Sizes
                  </Link>
                </div>
              )}
            </li>

            {/* Cookies */}
            <li className="mb-2 position-relative">
              <button
                className={`dropdown-toggle ${parentActive(["/dashboard/cookie"]) ? "active" : ""}`}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "Cookies" ? null : "Cookies",
                  )
                }
                aria-expanded={activeDropdown === "Cookies"}
              >
                <i className="bi bi-cookie fs-4"></i>
                {!isCollapsed && (
                  <>
                    <span className="ms-2">Cookies</span>
                    <i
                      className={`bi bi-chevron-${activeDropdown === "Cookies" ? "up" : "down"} ms-auto`}
                    ></i>
                  </>
                )}
              </button>

              {!isCollapsed && activeDropdown === "Cookies" && (
                <div className="submenu position-relative mt-2 d-flex align-items-center fs-14 text-decoration-none flex-column">
                  <Link
                    href="/dashboard/cookie/boxSize"
                    className={`d-block align-items-center ${isActive("/dashboard/cookie/boxSize") ? "active" : ""}`}
                  >
                    <i className="bi bi-box me-2 fs-5"></i>
                    Cookie Box Sizes
                  </Link>
                  <Link
                    href="/dashboard/cookie/boxType"
                    className={`d-block align-items-center ${isActive("/dashboard/cookie/boxType") ? "active" : ""}`}
                  >
                    <i className="bi bi-list-ul me-2 fs-5"></i>
                    Cookie Box Types
                  </Link>
                  <Link
                    href="/dashboard/cookie"
                    className={`d-block align-items-center ${isActive("/dashboard/cookie") ? "active" : ""}`}
                  >
                    <i className="bi bi-gift me-2 fs-5"></i>
                    Cookies
                  </Link>
                </div>
              )}

              {isCollapsed && activeDropdown === "Cookies" && (
                <div className="collapse-dropdown bg-white rounded-4 p-3 position-fixed fs-14">
                  <div className="dropdown-header fnt-color p-2">Cookies</div>
                  <Link
                    href="/dashboard/cookie/boxSize"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-box me-2 fs-5"></i>
                    Cookie Box Sizes
                  </Link>
                  <Link
                    href="/dashboard/cookie/boxType"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-list-ul me-2 fs-5"></i>
                    Cookie Box Types
                  </Link>
                  <Link
                    href="/dashboard/cookie"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-gift me-2 fs-5"></i>
                    Cookies
                  </Link>
                </div>
              )}
            </li>

            {/* Settings */}
            <li className="mb-2 position-relative">
              <button
                className={`dropdown-toggle ${parentActive(["/dashboard/setting"]) ? "active" : ""}`}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "Settings" ? null : "Settings",
                  )
                }
                aria-expanded={activeDropdown === "Settings"}
              >
                <i className="bi bi-gear fs-4"></i>
                {!isCollapsed && (
                  <>
                    <span className="ms-2">Settings</span>
                    <i
                      className={`bi bi-chevron-${activeDropdown === "Settings" ? "up" : "down"} ms-auto`}
                    ></i>
                  </>
                )}
              </button>

              {!isCollapsed && activeDropdown === "Settings" && (
                <div className="submenu position-relative mt-2 d-flex align-items-center fs-14 text-decoration-none flex-column">
                  <Link
                    href="/dashboard/setting/branches"
                    className={`d-block align-items-center ${isActive("/dashboard/setting/branches") ? "active" : ""}`}
                  >
                    <i className="bi bi-building-fill me-2 fs-5"></i>
                    Branches
                  </Link>
                  <Link
                    href="/dashboard/setting/category"
                    className={`d-block align-items-center ${isActive("/dashboard/setting/category") ? "active" : ""}`}
                  >
                    <i className="bi bi-tags-fill me-2 fs-5"></i>
                    Categories
                  </Link>
                  <Link
                    href="/dashboard/setting/gender"
                    className={`d-block align-items-center ${isActive("/dashboard/setting/gender") ? "active" : ""}`}
                  >
                    <i className="bi bi-gender-ambiguous me-2 fs-5"></i>
                    Gender
                  </Link>
                  <Link
                    href="/dashboard/setting/occasion"
                    className={`d-block align-items-center ${isActive("/dashboard/setting/occasion") ? "active" : ""}`}
                  >
                    <i className="bi bi-calendar-event-fill me-2 fs-5"></i>
                    Occasions
                  </Link>
                  <Link
                    href="/dashboard/setting/productTags"
                    className={`d-block align-items-center ${isActive("/dashboard/setting/productTags") ? "active" : ""}`}
                  >
                    <i className="bi bi-bookmarks-fill me-2 fs-5"></i>
                    Product Tags
                  </Link>
                  <Link
                    href="/dashboard/setting/coupons"
                    className={`d-block align-items-center ${isActive("/dashboard/setting/coupons") ? "active" : ""}`}
                  >
                    <i className="bi bi-ticket-perforated me-2 fs-5"></i>
                    Coupons
                  </Link>
                  <Link
                    href="/dashboard/setting/customers"
                    className={`d-block align-items-center ${isActive("/dashboard/setting/customers") ? "active" : ""}`}
                  >
                    <i className="bi bi-people-fill me-2 fs-5"></i>
                    Customers
                  </Link>
                </div>
              )}

              {isCollapsed && activeDropdown === "Settings" && (
                <div className="collapse-dropdown bg-white rounded-4 p-3 position-fixed fs-14">
                  <div className="dropdown-header fnt-color p-2">Settings</div>
                  <Link
                    href="/dashboard/setting/branches"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-building-fill me-2 fs-5"></i>
                    Branches
                  </Link>
                  <Link
                    href="/dashboard/setting/category"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-tags-fill me-2 fs-5"></i>
                    Categories
                  </Link>
                  <Link
                    href="/dashboard/setting/gender"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-gender-ambiguous me-2 fs-5"></i>
                    Gender
                  </Link>
                  <Link
                    href="/dashboard/setting/occasion"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-calendar-event-fill me-2 fs-5"></i>
                    Occasions
                  </Link>
                  <Link
                    href="/dashboard/setting/productTags"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-bookmarks-fill me-2 fs-5"></i>
                    Product Tags
                  </Link>
                  <Link
                    href="/dashboard/setting/coupons"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-ticket-perforated me-2 fs-5"></i>
                    Coupons
                  </Link>
                  <Link
                    href="/dashboard/setting/customers"
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <i className="bi bi-people-fill me-2 fs-5"></i>
                    Customers
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
