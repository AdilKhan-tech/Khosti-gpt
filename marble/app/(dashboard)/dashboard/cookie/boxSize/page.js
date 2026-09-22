"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  getAllCookieBoxSizes,
  deleteCookieBoxSizeById,
} from "@/utils/apiRoutes";
import { ToastContainer, toast } from "react-toastify";
import AddCookieBoxSize from "@/components/dashboard/cookies/AddCookieBoxSize";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import Offcanvas from "react-bootstrap/Offcanvas";
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";
import Common from "@/utils/Common";

export default function CookieBoxSizePage() {
  const [cookieBoxSizes, setCookieBoxSizes] = useState([]);
  const { token } = useAxiosConfig();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cookieBoxSizeData, setCookieBoxSizeData] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC");

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchCookieBoxSizes = async () => {
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
        sortOrder,
        sortField,
      };
      const response = await axios.get(getAllCookieBoxSizes, { params });
      setCookieBoxSizes(response.data.data);
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching Cookie box sizes", error);
    }
  };

  useEffect(() => {
    if (keywords != "") {
      if (keywords.trim() == "") return;
      const delay = setTimeout(() => {
        fetchCookieBoxSizes();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchCookieBoxSizes();
    }
  }, [currentPage, pageLimit, keywords, sortOrder, sortField, token]);

  const showOffcanvasOnEditCookieBoxSize = (boxSize) => {
    setCookieBoxSizeData(boxSize);
    setShowOffcanvas(true);
  };

  const showOffcanvasOnAddCookieBoxSize = () => {
    setCookieBoxSizeData();
    setShowOffcanvas(true);
  };

  const closePopup = () => {
    setShowOffcanvas(false);
  };

  const addCookieBoxSize = (newCookieSize) => {
    setCookieBoxSizes((prev) => [newCookieSize, ...prev]);
    setShowOffcanvas(false);
  };

  const updateCookieBoxSize = (updatedCookieSize) => {
    setCookieBoxSizes((prev) =>
      prev.map((cookieSize) =>
        cookieSize.id === updatedCookieSize.id
          ? { ...cookieSize, ...updatedCookieSize }
          : cookieSize,
      ),
    );
    setShowOffcanvas(false);
  };

  const showDeleteConfirmation = (boxSizeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this cookie box size?",
    );
    if (confirmed) {
      handleDelete(boxSizeId);
    }
  };

  const handleLimitChange = (newLimit) => {
    setPageLimit(newLimit);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (boxSizeId) => {
    try {
      const response = await axios.delete(deleteCookieBoxSizeById(boxSizeId));
      if (response.status === 200) {
        toast.success("Cookie box Size deleted successfully!", {
          autoClose: 1000,
        });
        setCookieBoxSizes((prev) =>
          prev.filter((boxSize) => boxSize.id !== boxSizeId),
        );
      }
    } catch (error) {
      toast.error("Failed to delete Cookie Box Size.");
    }
  };

  const handleSortChange = (field) =>
    Common.handleSortingChange(field, setSortField, setSortOrder);

  return (
    <>
      <section>
        <div className="mt-3">
          <div className="d-flex justify-content-between mb-3">
            <p className="pagetitle fnt-color">Cookie Box Sizes</p>
            <div>
              <button
                className="btn-orange text-white fs-16"
                onClick={showOffcanvasOnAddCookieBoxSize}
                role="button"
              >
                <i className="bi bi-plus-circle me-2"></i>
                Create
              </button>
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
                      onClick={() => handleSortChange("cookie_type_id")}
                    >
                      Cookies Type
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "cookie_type_id" &&
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
                    <th className="fw-medium fs-14 fnt-color nowrap">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {cookieBoxSizes.map((boxSize, index) => (
                    <tr key={`${boxSize.id}-${index}`}>
                      <td className="fw-normal fs-14 fnt-color">
                        {boxSize.id}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {boxSize?.name_en?.length
                          ? Common.truncateText(boxSize.name_en, 15)
                          : "N/A"}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {boxSize?.type?.name_en}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {boxSize?.slug?.length
                          ? Common.truncateText(boxSize.slug, 15)
                          : "N/A"}
                      </td>

                      <td className="fw-normal fs-14 fnt-color">
                        <img
                          src={boxSize.image_url}
                          className="image-fluid rounded-5"
                        />
                      </td>
                      <td>
                        <div
                          className={
                            boxSize.status === "active"
                              ? "blue-status"
                              : "red-status"
                          }
                        >
                          {boxSize.status === "active" ? "Active" : "Inactive"}
                        </div>
                      </td>

                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                            onClick={() =>
                              showOffcanvasOnEditCookieBoxSize(boxSize)
                            }
                          >
                            <i className="bi bi-pencil-square text-primary"></i>
                          </button>
                          <button
                            className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                            onClick={() => showDeleteConfirmation(boxSize.id)}
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
                  {cookieBoxSizeData ? "Add Box Size" : "Update Box Size"}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr className="mt-0" />
            <Offcanvas.Body>
              <AddCookieBoxSize
                cookieBoxSizeData={cookieBoxSizeData}
                closePopup={closePopup}
                onAddCookieBoxSize={addCookieBoxSize}
                onUpdateCookieBoxSize={updateCookieBoxSize}
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
