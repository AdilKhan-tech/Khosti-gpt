"use client";
import React from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AddIceCreamBucket from "@/components/dashboard/icecream/AddIceCreamBucket";
import { useEffect, useState } from "react";
import {
  getAllIceCreamBuckets,
  deleteIceCreamBucketById,
} from "@/utils/apiRoutes";
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";
import Offcanvas from "react-bootstrap/Offcanvas";
import Common from "@/utils/Common";

export default function IceCreamBucketPage() {
  const { token } = useAxiosConfig();
  const [iceCreamBuckets, setIceCreamBuckets] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [iceCreamBucketData, setIceCreamBucketData] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC");

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchAllIceCreamBucket = async () => {
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
        sortOrder,
        sortField,
      };
      const response = await axios.get(getAllIceCreamBuckets, { params });
      setIceCreamBuckets(response.data.data);
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching Ice Cream Buckets", error);
    }
  };

  useEffect(() => {
    if (keywords != "") {
      if (keywords.trim() == "") return;
      const delay = setTimeout(() => {
        fetchAllIceCreamBucket();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchAllIceCreamBucket();
    }
  }, [currentPage, pageLimit, keywords, sortOrder, sortField, token]);

  const showOffcanvasOnAddIceCreamBucket = () => {
    setIceCreamBucketData(null);
    setShowOffcanvas(true);
  };

  const showOffcanvasOnEditIceCreamBucket = (iceCreamBucket) => {
    setIceCreamBucketData(iceCreamBucket);
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

  const handleDelete = async (iceCreamId) => {
    try {
      const response = await axios.delete(deleteIceCreamBucketById(iceCreamId));
      if (response.status === 200) {
        toast.success("Ice Cream Bucket deleted successfully!", {
          autoClose: 1000,
        });
        setIceCreamBuckets((prev) =>
          prev.filter((iceCreamBucket) => iceCreamBucket.id !== iceCreamId),
        );
      }
    } catch (error) {
      console.error("Error deleting Ice Cream Bucket:", error);
      toast.error("Failed to delete Ice Cream Bucket.");
    }
  };

  const showDeleteConfirmation = (iceCreamId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this Ice Cream Bucket?",
    );
    if (confirm) {
      handleDelete(iceCreamId);
    }
  };

  const addIceCreamBucket = (newIceCream) => {
    setIceCreamBuckets((prev) => [newIceCream, ...prev]);
    setShowOffcanvas(false);
  };

  const updateIceCreamBucket = (updatedIceCream) => {
    setIceCreamBuckets((prev) =>
      prev.map((item) =>
        item.id === updatedIceCream.id ? updatedIceCream : item,
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
          <div className="d-flex justify-content-between mt-4">
            <p className="pagetitle mb-0 fnt-color">Ice Cream Bucket</p>
            <div>
              <div
                className="btn-orange text-white fs-16 text-center"
                onClick={showOffcanvasOnAddIceCreamBucket}
                role="button"
              >
                <i className="bi bi-plus-circle me-2"></i>
                <span>Create</span>
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
                      onClick={() => handleSortChange("size")}
                    >
                      Size
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "size" &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>
                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("price")}
                    >
                      Price
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "price" &&
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
                  {iceCreamBuckets.map((iceCreamBucket, index) => (
                    <tr key={`${iceCreamBucket.id}-${index}`}>
                      <td className="fw-normal fs-14 fnt-color">
                        {iceCreamBucket.id}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {iceCreamBucket.name_en}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {iceCreamBucket.slug}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {iceCreamBucket.size}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {iceCreamBucket.price}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        <img
                          src={iceCreamBucket.image_url}
                          className="image-fluid"
                        />
                      </td>
                      <td>
                        <div
                          className={
                            iceCreamBucket?.status === "active"
                              ? "blue-status"
                              : "red-status"
                          }
                        >
                          {iceCreamBucket?.status === "active"
                            ? "Active"
                            : "Inactive"}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                            onClick={() =>
                              showOffcanvasOnEditIceCreamBucket(iceCreamBucket)
                            }
                          >
                            <i className="bi bi-pencil-square text-primary"></i>
                          </button>
                          <button
                            className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                            onClick={() =>
                              showDeleteConfirmation(iceCreamBucket.id)
                            }
                          >
                            <i className="bi bi-trash text-danger"></i>
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
                  {iceCreamBucketData
                    ? "Update Ice Cream Bucket"
                    : "Add Ice Cream Bucket"}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr className="mt-0" />
            <Offcanvas.Body>
              <AddIceCreamBucket
                closePopup={closePopup}
                iceCreamBucketData={iceCreamBucketData}
                onAddIceCreamBucket={addIceCreamBucket}
                onUpdateIceCreamBucket={updateIceCreamBucket}
              ></AddIceCreamBucket>
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
