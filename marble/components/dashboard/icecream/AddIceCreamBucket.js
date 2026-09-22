"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {createIceCreamBucket,updateIceCreamBucketById,} from "@/utils/apiRoutes";
import React from "react";

const AddIceCreamBucket = ({closePopup,iceCreamBucketData,onAddIceCreamBucket,onUpdateIceCreamBucket}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    slug: "",
    size: "",
    price: "",
    calories: "",
    status: "active",
  });
  
  useEffect(() => {
    if (iceCreamBucketData) {
      setFormData({
        name_en: iceCreamBucketData.name_en || "",
        name_ar: iceCreamBucketData.name_ar || "",
        slug: iceCreamBucketData.slug || "",
        size: iceCreamBucketData.size || "",
        price: iceCreamBucketData.price || "",
        calories: iceCreamBucketData.calories || "",
        status: iceCreamBucketData.status || "active",
      });
    }
  }, [iceCreamBucketData]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const validateForm = () => {
    const errors = [];
  
    if (!formData.name_en) errors.push("Name English is required.");
    if (!formData.name_ar) errors.push("Name Arabic is required.");
    if (!formData.slug) errors.push("Slug is required.");
    if (!formData.size) errors.push("Size is required.");
    if (!formData.price) errors.push("Price is required.");
  
    return errors;
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "id") {
          payload.append(key, value);
        }
      });

      if (selectedFiles.length > 0) {
        payload.append("image_url", selectedFiles[0]);
      }

      //------------ UPDATE 
      if (iceCreamBucketData) {
        const res = await axios.put(updateIceCreamBucketById(iceCreamBucketData.id), payload);

        if (res.status === 200) {
          toast.success("IceCream Bucket updated successfully!");

          if (onUpdateIceCreamBucket) {
            onUpdateIceCreamBucket(res.data);
          }

          closePopup();
        }
      }

      // ------------CREATE 
      else {
        const res = await axios.post(createIceCreamBucket, payload);

        if (res.status === 201 || res.status === 200) {
          toast.success("IceCream Bucket added successfully!");

          if (onAddIceCreamBucket) {
            onAddIceCreamBucket(res.data);
          }

          closePopup();
        }
      }
    }catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0] ||
        "Something went wrong!";
    
      toast.error(backendMessage);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      setErrors([]);
    }
  }, [errors]);  
  
  return (
    <form className="mt-0" onSubmit={handleSubmit}>
      <div className="form-group mt-3">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Name English
        </label>
        <input
          name="name_en"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_en}
          onChange={(e) =>
            setFormData({ ...formData, name_en: e.target.value })
          }
        />
      </div>
      <div className="form-group mt-3">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Name Arabic
        </label>
        <input
          name="name_ar"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_ar}
          onChange={(e) =>
            setFormData({ ...formData, name_ar: e.target.value })
          }
        />
      </div>
      <div className="row">
      <div className="form-group mt-3 col-md-6">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Slug
        </label>
        <input
          name="slug"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        />
      </div>
      <div className="form-group mt-3 col-md-6">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Size
        </label>
        <input
          name="size"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
        />
      </div>
      </div>
  <div className="row">
      <div className="form-group mt-3 col-md-6">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Price
        </label>
        <input
          name="price"
          type="number"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
      </div>
      <div className="form-group mt-3 col-md-6">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Calories
        </label>
        <input
          name="calories"
          type="number"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.calories}
          onChange={(e) =>
            setFormData({ ...formData, calories: e.target.value })
          }
        />
      </div>
    </div>
      <div className="col-md-12 mt-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            style={{ width: "50px", height: "26px" }}
            type="checkbox"
            name="status"
            role="switch"
            checked={formData.status === "active"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.checked ? "active" : "inactive",
              }))
            }
          />
          <label className="form-check-label ms-2 mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "active" ? "Active" : "Inactive"}
          </label>
        </div>
      </div>
      <div className="col-md-12 px-1 mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          File Attachment
        </label>
        <div className="">
          <input
            type="file"
            className="form-control form-control-lg textarea-hover-dark text-secondary"
            id="fileInput"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <ul className="mt-2">
          {selectedFiles.map((file, index) => (
            <li className="list-unstyled text-muted" key={index}>
              <span className="fs-12 fw-bold">File Size: {file.size} KB</span>
            </li>
          ))}
        </ul>
        <div className="text-danger">
          <i className="bi bi-info-circle me-2"></i>
          <span className="fs-14 fw-normal">
            Supported files : GIF ,JPG , PNG, PDF , DOC , or DOCX
          </span>
        </div>
      </div>
      <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
        <button
          type="button"
          className="cancle-btn rounded-3 border-1 border-secondary fs-16 py-2 fw-medium w-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="org-btn py-2 d-flex justify-content-center rounded-3 fs-16 fw-normal border-0 w-100"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddIceCreamBucket;
