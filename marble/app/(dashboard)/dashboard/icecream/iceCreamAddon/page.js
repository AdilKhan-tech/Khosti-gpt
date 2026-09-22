"use client";
import React from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AddIceCreamAddon from "@/components/dashboard/icecream/AddIceCreamAddon";
import { useEffect, useState } from "react";
import {
  deleteIceCreamAddonById,
  getAllIcecreamAddOns,
} from "@/utils/apiRoutes";
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";
import Offcanvas from "react-bootstrap/Offcanvas";
import Common from "@/utils/Common";

export default function IceCreamAddonPage() {
  const { token } = useAxiosConfig();
  const [iceCreamAddons, setIceCreamAddons] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [IceCreamAddonData, setIceCreamAddonData] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC");

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchIceCreamAddon = async () => {
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
        sortOrder,
        sortField,
      };
      const response = await axios.get(getAllIcecreamAddOns, { params });
      setIceCreamAddons(response.data.data);
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching icecream Addon", error);
    }
  };

  useEffect(() => {
    if (keywords != "") {
      if (keywords.trim() == "") return;
      const delay = setTimeout(() => {
        fetchIceCreamAddon();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchIceCreamAddon();
    }
  }, [currentPage, pageLimit, keywords, sortOrder, sortField, token]);

  const showOffcanvasOnAddIceCreamAddon = () => {
    setIceCreamAddonData(null);
    setShowOffcanvas(true);
  };

  const showOffcanvasOnEditIceCreamAddon = (iceCreamAddon) => {
    setIceCreamAddonData(iceCreamAddon);
    setShowOffcanvas(true);
  };

  const closePopup = () => {
    setShowOffcanvas(false);
  };

  const handleLimitChange = (newLimit) => {
    setPageLimit(newLimit);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (iceCreamAddonId) => {
    try {
      const response = await axios.delete(
        deleteIceCreamAddonById(iceCreamAddonId),
      );
      if (response.status === 200) {
        toast.success("Icecream Addon deleted successfully!", {
          autoClose: 1000,
        });
        setIceCreamAddons((prev) =>
          prev.filter((iceCreamAddon) => iceCreamAddon.id !== iceCreamAddonId),
        );
      }
    } catch (error) {
      console.error("Error deleting icecream Addon:", error);
      toast.error("Failed to delete icecream Addon.");
    }
  };

  const showDeleteConfirmation = (iceCreamAddonId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this icecream Addon?",
    );
    if (confirmed) {
      handleDelete(iceCreamAddonId);
    }
  };

  const addIceCreamAddon = (newIceCreamAddon) => {
    setIceCreamAddons((prev) => [newIceCreamAddon, ...prev]);
    setShowOffcanvas(false);
  };

  const updateIceCreamAddon = (updatedIceCreamAddon) => {
    setIceCreamAddons((prev) =>
      prev.map((iceCreamAddon) =>
        iceCreamAddon.id === updatedIceCreamAddon.id
          ? updatedIceCreamAddon
          : iceCreamAddon,
      ),
    );
    setShowOffcanvas(false);
  };

  const handleSortChange = (field) =>
    Common.handleSortingChange(field, setSortField, setSortOrder);

  return (
    <>
      <section>
        <div className="mt-3">
          <div className="d-flex justify-content-between mb-3">
            <p className="pagetitle mb-0 fnt-color">Ice Cream Add-Ons</p>
            <div>
              <div
                className="btn-orange text-white fs-16 text-center"
                onClick={showOffcanvasOnAddIceCreamAddon}
                role="button"
              >
                <i className="bi bi-plus-circle me-2"></i>Create
              </div>
            </div>
          </div>
          <div className="d-flex">
            <i className="bi bi-search fs-20 px-3 py-1 text-secondary position-absolute"></i>
            <input
              type="text"
              className="form-control px-5 text-dark-custom"
              style={{ height: "44px", width: "300px" }}
              placeholder="Search here..."
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
        </div>
        <div className="px-0 pt-0 rounded-2 p-0 mt-3">
          <div className="datatable-wrapper">
            <div className="data-table p-2 rounded-4">
              <table className="table datatable datatable-table">
                <thead className="">
                  <tr className="">
                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("id")}
                    >
                      ID
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "id" &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>

                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("name_en")}
                    >
                      Name
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "name_en" &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>

                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("slug")}
                    >
                      Slug
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "slug" &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>

                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("type")}
                    >
                      Type
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "type" &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>

                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("image_url")}
                    >
                      Image
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "image_url" &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>

                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("status")}
                    >
                      Status
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "status" &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>

                    <th className="fw-medium fs-14 fnt-color">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {iceCreamAddons.map((iceCreamAddon, index) => (
                    <tr key={`${iceCreamAddon.id}-${index}`}>
                      <td>{iceCreamAddon.id}</td>
                      <td>{iceCreamAddon.name_en}</td>
                      <td>{iceCreamAddon.slug}</td>
                      <td>{iceCreamAddon.type}</td>
                      <td className="fw-normal fs-14 fnt-color">
                        <img
                          src={iceCreamAddon.image_url}
                          className="image-fluid rounded-5"
                        />
                      </td>
                      <td>
                        <div
                          className={
                            iceCreamAddon?.status === "Active"
                              ? "blue-status"
                              : "red-status"
                          }
                        >
                          {iceCreamAddon?.status === "Active"
                            ? "Active"
                            : "Inactive"}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                            onClick={() =>
                              showOffcanvasOnEditIceCreamAddon(iceCreamAddon)
                            }
                          >
                            <i className="bi bi-pencil-square text-primary"></i>
                          </button>
                          <button
                            className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                            onClick={() =>
                              showDeleteConfirmation(iceCreamAddon.id)
                            }
                          >
                            <i className="bi bi-trash3 text-danger"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <div className="fs-24 fnt-color">
                  {IceCreamAddonData ? "Update Addon" : "Add Addon"}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr className="mt-0" />
            <Offcanvas.Body>
              <AddIceCreamAddon
                IceCreamAddonData={IceCreamAddonData}
                closePopup={closePopup}
                onAddIceCreamAddon={addIceCreamAddon}
                onUpdateIceCreamAddon={updateIceCreamAddon}
              />
            </Offcanvas.Body>
          </Offcanvas>
          <ToastContainer />
        </div>
      </section>
      <div className="d-flex align-items-center justify-content-between mt-0">
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          pageLimit={pageLimit}
          totalEntries={totalEntries}
        />
        <EntriesPerPageSelector
          pageLimit={pageLimit}
          onPageLimitChange={handleLimitChange}
        />
      </div>
    </>
  );
}
