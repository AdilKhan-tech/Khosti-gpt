"use client"
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import axios from "axios";
import { createCustomCakeType, updateCustomCakeTypeById } from "@/utils/apiRoutes";

const AddCustomCakeType = ({ closePopup, customCakeTypeData = null, onAddCustomCakeType, onUpdateCustomCakeType }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name_en: "",
    name_ar: "",
    slug: "",
    status: "active"
  });

  useEffect(() => {
    if (customCakeTypeData) {
      setFormData({
        id: customCakeTypeData.id,
        name_en: customCakeTypeData.name_en || "",
        name_ar: customCakeTypeData.name_ar || "",
        slug: customCakeTypeData.slug || "",
        status: customCakeTypeData.status || "active",
      });
    }
  }, [customCakeTypeData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const validateForm = () => {
    const errors = [];
  
    if (!formData.name_en) errors.push("Name English is required.");
    if (!formData.name_ar) errors.push("Name Arabic is required.");
    if (!formData.slug) errors.push("Slug is required.");
  
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
      if (customCakeTypeData) {
        const res = await axios.put(
          updateCustomCakeTypeById(customCakeTypeData.id),
          payload
        );

        if (res.status === 200) {
          toast.success("Custom Cake Type updated successfully!");

          if (onUpdateCustomCakeType) {
            onUpdateCustomCakeType(res.data);
          }

          closePopup();
        }
      }

      // ------------CREATE 
      else {
        const res = await axios.post(createCustomCakeType, payload);

        if (res.status === 201 || res.status === 200) {
          toast.success("Custom Cake Type added successfully!");

          if (onAddCustomCakeType) {
            onAddCustomCakeType(res.data);
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
      <div className="form-group">
        <label className="form-label text-secondary">Name English</label>
        <input 
          name="name_en" 
          type="text" 
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_en} 
          onChange={handleChange}
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Name Arabic</label>
        <input 
          name="name_ar" 
          type="text" 
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_ar} 
          onChange={handleChange}
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Slug</label>
        <input 
          name="slug" 
          type="text" 
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.slug} 
          onChange={handleChange}
        />
      </div>

      <div className="col-md-12 mt-3">
      <label className="form-label text-secondary">Status</label>
        <div className="form-check form-switch m-2">
          <input 
            className="form-check-input fs-5" 
            type="checkbox"
            role="switch" 
            checked={formData.status === "active"} 
            onChange={(e) => setFormData((prev) => ({
              ...prev,
              status: e.target.checked ? "active" : "inactive",
            }))
            }
          />
          <label className="form-check-label ms-2 mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "active"? "Active": "Inactive"}
          </label>
        </div>
      </div>
      
      <div className="col-md-12 px-1 mt-3">
        <label className="form-label text-secondary">File Attachment</label>
        <div className="">
          <input 
            type="file" 
            className="form-control form-control-lg textarea-hover-dark text-secondary" 
            id="fileInput"
            multiple onChange={handleFileChange}
          />
        </div>
        <ul className="mt-2">
          {selectedFiles.map((file, index) => (
            <li className="list-unstyled text-muted" key={index}><span className="fs-12 fw-bold">File Size: {file.size} KB</span></li>
          ))}
        </ul>
        <div className="text-danger">
          <i className="bi bi-info-circle me-2"></i>
          <span className="fs-14 fw-normal">Supported files : GIF ,JPG , PNG, PDF , DOC , or DOCX</span>
        </div>
      </div>

      <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
        <button type="button" className="cancle-btn rounded-3 border-1 border-secondary fs-16 py-2 fw-medium w-100" onClick={closePopup}>Cancel</button>
        <button type="submit" className="org-btn py-2 d-flex justify-content-center rounded-3 fs-16 fw-normal border-0 w-100">Save</button>
       </div>

    </form>
  );
};

export default AddCustomCakeType;
