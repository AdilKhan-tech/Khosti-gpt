"use client";
import React from "react";
import { useState, useEffect } from "react";
import AddOccasion from "@/components/dashboard/setting/AddOccasion";
import { getAllOcassions, deleteOccasionById } from "@/utils/apiRoutes";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Common from "@/utils/Common";
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";

function Occasions() {
  const { token } = useAxiosConfig();
  const [occasions, setOccasions] = useState([]);
  const [occasionData, setOccasionData] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC");

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchOccasions = async () => {
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
        sortOrder,
        sortField,
      };
      const response = await axios.get(getAllOcassions, { params });
      setOccasions(response.data.data);
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching occasion", error);
    }
  };

  useEffect(() => {
    if (keywords != "") {
      if (keywords.trim() == "") return;
      const delay = setTimeout(() => {
        fetchOccasions();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchOccasions();
    }
  }, [currentPage, pageLimit, keywords, sortOrder, sortField, token]);

  const showOffcanvasOnAddOcassion = () => {
    setOccasionData(null);
    setShowOffcanvas(true);
  };

  const showOffcanvasOnEditOcassion = (occasion) => {
    setOccasionData(occasion);
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

  const handleDelete = async (occasionId) => {
    try {
      const response = await axios.delete(deleteOccasionById(occasionId));
      if (response.status === 200) {
        toast.success("Ocassion deleted successfully!", { autoClose: 1000 });
        setOccasions((prev) =>
          prev.filter((occasion) => occasion.id !== occasionId),
        );
      }
    } catch (error) {
      console.error("Error deleting Ocassion.", error);
      toast.error("Failed to delete Ocassion.");
    }
  };

  const showDeleteConfirmation = (occasionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Ocassion?",
    );
    if (confirmed) {
      handleDelete(occasionId);
    }
  };

  const addOccasion = (newOccasion) => {
    setOccasions((prev) => [newOccasion, ...prev]);
    setShowOffcanvas(false);
  };

  const updateOcassion = (updateOcassion) => {
    setOccasions((prev) =>
      prev.map((item) =>
        item.id === updateOcassion.id ? updateOcassion : item,
      ),
    );
    setShowOffcanvas(false);
  };

  const handleSortChange = (field) =>
    Common.handleSortingChange(field, setSortField, setSortOrder);

  return (
    <>
      <section className="mt-3">
        <div className="">
          <div className="d-flex justify-content-between mb-3">
            <p className="pagetitle mb-0 fnt-color">Occasions</p>
            <button
              className="btn-orange text-white fs-16"
              onClick={showOffcanvasOnAddOcassion}
            >
              <i className="bi bi-plus-circle me-2"></i>Create
            </button>
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
              <table className="datatable table datatable-table">
                <thead>
                  <tr>
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
                      onClick={() => handleSortChange("image_url")}
                    >
                      Image
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "image_url" &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>
                    <th className="fw-medium fs-14 fnt-color">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {occasions.map((occasion, index) => (
                    <tr key={`${occasion.id}-${index}`}>
                      <td className="fw-normal fs-14 fnt-color">
                        {occasion.id}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {occasion.name_en}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {occasion.slug}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        <img
                          src={occasion.image_url}
                          alt={occasion.name_en}
                          className="image-fluid"
                        />
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                            onClick={() =>
                              showOffcanvasOnEditOcassion(occasion)
                            }
                          >
                            <i className="bi bi-pencil-square text-primary"></i>
                          </button>
                          <button
                            className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                            onClick={() => showDeleteConfirmation(occasion.id)}
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
                  {occasionData ? "Update Occasion" : "Add Occasion"}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr className="mt-0" />
            <Offcanvas.Body>
              <AddOccasion
                closePopup={closePopup}
                onAddOccasion={addOccasion}
                occasionData={occasionData}
                onUpdateOcassion={updateOcassion}
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

export default Occasions;
