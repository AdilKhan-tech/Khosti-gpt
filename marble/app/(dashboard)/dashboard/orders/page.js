"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { getAllOrdersRoute } from "@/utils/apiRoutes";
import Common from "@/utils/Common";
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";

const statusClass = {
  pending: "blue-status",
  confirmed: "blue-status",
  preparing: "blue-status",
  ready: "blue-status",
  completed: "blue-status",
  cancelled: "red-status",
};

const sortableColumns = [
  ["id", "Id"],
  ["order_number", "Order"],
  ["customer_name", "Customer"],
  ["fulfillment_type", "Type"],
  ["status", "Status"],
  ["payment_status", "Payment"],
  ["total", "Total"],
  ["created_at", "Date"],
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [sortField, setSortField] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(getAllOrdersRoute);
        setOrders(response.data.data || []);
      } catch (requestError) {
        console.error("Error fetching orders", requestError);
        setError("Orders could not be loaded. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const search = keywords.trim().toLowerCase();
    const filtered = search
      ? orders.filter((order) =>
          [
            order.order_number,
            order.customer_name,
            order.customer_phone,
            order.status,
            order.fulfillment_type,
            order.payment_status,
          ].some((value) =>
            String(value || "")
              .toLowerCase()
              .includes(search),
          ),
        )
      : orders;

    return [...filtered].sort((first, second) => {
      const firstValue = first[sortField] || "";
      const secondValue = second[sortField] || "";
      const result = String(firstValue).localeCompare(
        String(secondValue),
        undefined,
        { numeric: true, sensitivity: "base" },
      );
      return sortOrder === "asc" ? result : -result;
    });
  }, [keywords, orders, sortField, sortOrder]);

  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / pageLimit));
  const visibleOrders = filteredOrders.slice(
    (currentPage - 1) * pageLimit,
    currentPage * pageLimit,
  );

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleSearch = (event) => {
    setKeywords(event.target.value);
    setCurrentPage(1);
  };

  const handleLimitChange = (newLimit) => {
    setPageLimit(newLimit);
    setCurrentPage(1);
  };

  return (
    <>
      <section className="mt-5">
        <div>
          <div className="d-flex justify-content-between mb-3">
            <p className="pagetitle mb-0 fnt-color">Orders</p>
            <div
              className="btn-orange text-white fs-16 text-center"
              role="status"
            >
              <i className="bi bi-receipt me-1"></i>
              <span>{orders.length} Orders</span>
            </div>
          </div>
          <div className="d-flex">
            <i className="bi bi-search fs-20 px-3 py-1 text-secondary position-absolute"></i>
            <input
              type="text"
              className="form-control px-5 text-dark-custom"
              style={{ height: "44px", width: "300px" }}
              placeholder="Search orders..."
              value={keywords}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="px-0 pt-0 rounded-2 p-0 mt-3">
          <div className="data-table">
            <table className="table datatable-wrapper">
              <thead>
                <tr>
                  {sortableColumns.map(([field, label]) => (
                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      key={field}
                      onClick={() => handleSortChange(field)}
                    >
                      {label}
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === field &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan="8" className="text-center text-secondary py-5">
                      Loading orders...
                    </td>
                  </tr>
                )}
                {!isLoading && error && (
                  <tr>
                    <td colSpan="8" className="text-center text-danger py-5">
                      {error}
                    </td>
                  </tr>
                )}
                {!isLoading && !error && visibleOrders.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-secondary py-5">
                      No orders found.
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  !error &&
                  visibleOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="fw-normal fs-14 fnt-color">{order.id}</td>
                      <td className="fw-normal fs-14 fnt-color fw-semibold">
                        {order.order_number}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        <span className="d-block">{order.customer_name}</span>
                        <small className="text-secondary">
                          {order.customer_phone}
                        </small>
                      </td>
                      <td className="fw-normal fs-14 fnt-color text-capitalize">
                        {order.fulfillment_type}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        <span
                          className={statusClass[order.status] || "blue-status"}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="fw-normal fs-14 fnt-color text-capitalize">
                        {order.payment_status}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {order.total} SAR
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {Common.dateFormat(order.created_at)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div className="d-flex align-items-center justify-content-between mt-0">
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={setCurrentPage}
          pageLimit={pageLimit}
          totalEntries={filteredOrders.length}
        />
        <EntriesPerPageSelector
          pageLimit={pageLimit}
          onPageLimitChange={handleLimitChange}
        />
      </div>
    </>
  );
}
