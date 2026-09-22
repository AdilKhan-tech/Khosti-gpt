"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { deleteCustomerRoute, getAllCustomersRoute } from "@/utils/apiRoutes";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [keywords, setKeywords] = useState("");

  const loadCustomers = async () => {
    const response = await axios.get(getAllCustomersRoute);
    setCustomers(response.data.data || []);
  };

  useEffect(() => {
    let active = true;
    axios.get(getAllCustomersRoute).then((response) => {
      if (active) setCustomers(response.data.data || []);
    });
    return () => {
      active = false;
    };
  }, []);

  const removeCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    await axios.delete(deleteCustomerRoute(id));
    await loadCustomers();
  };

  const filteredCustomers = customers.filter((customer) =>
    [customer.full_name, customer.email, customer.phone_number]
      .join(" ")
      .toLowerCase()
      .includes(keywords.toLowerCase()),
  );

  return (
    <section className="mt-5">
      <div className="d-flex justify-content-between mb-3">
        <p className="pagetitle mb-0 fnt-color">Customers</p>
        <span className="badge rounded-pill bg-light text-secondary border">
          {customers.length} Customers
        </span>
      </div>
      <div className="d-flex mb-3">
        <i className="bi bi-search fs-20 px-3 py-1 text-secondary position-absolute"></i>
        <input
          className="form-control px-5 text-dark-custom"
          style={{ height: "44px", width: "300px" }}
          placeholder="Search customers..."
          value={keywords}
          onChange={(event) => setKeywords(event.target.value)}
        />
      </div>
      <div className="data-table table-responsive">
        <table className="table datatable-wrapper align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Total spent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td className="fw-semibold">
                  <i className="bi bi-person-circle text-info me-2"></i>
                  {customer.full_name}
                </td>
                <td>{customer.phone_number}</td>
                <td>{customer.email || "N/A"}</td>
                <td>
                  <span className="badge rounded-pill bg-info-subtle text-info">
                    {customer.total_orders}
                  </span>
                </td>
                <td>{customer.total_spent} SAR</td>
                <td>
                  <button
                    className="btn text-danger"
                    onClick={() => removeCustomer(customer.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filteredCustomers.length && (
          <p className="text-center text-muted py-4">No customers yet.</p>
        )}
      </div>
    </section>
  );
}
