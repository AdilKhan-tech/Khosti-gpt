"use client";
import React from "react";
import { useState,  useEffect } from "react";
import { toast } from "react-toastify";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import axios from "axios";
import {updateCustomCakeFlavorById , createCustomCakeFlavor, getAllCustomCakeTypes} from "@/utils/apiRoutes"

function AddCustomCakeFlavor({ closePopup, customCakeFlavorData = null, onUpdateCustomCakeFlavor , onAddCustomCakeFlavor }) {
  const {token} = useAxiosConfig();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [customCakeTypes , setCustomCakeTypes] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    slug: "",
    custom_cake_type_id: "",
    status: "active",
  });

  useEffect(() => {
    if (customCakeFlavorData) {
      setFormData({
        name_en: customCakeFlavorData.name_en || "",
        name_ar: customCakeFlavorData.name_ar || "",
        slug: customCakeFlavorData.slug || "",
        custom_cake_type_id: customCakeFlavorData.custom_cake_type_id || "",
        status: customCakeFlavorData.status || "active",
      });
    }
  }, [customCakeFlavorData]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };
  
  const validateForm = () => {
    const errors = [];
  
    if (!formData.name_en) errors.push("Name English is required.");
    if (!formData.name_ar) errors.push("Name Arabic is required.");
    if (!formData.slug) errors.push("Slug is required.");
    if (!formData.custom_cake_type_id)
      errors.push("Cake type is required.");
  
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
        payload.append(key, value);
      });
  
      if (selectedFiles && selectedFiles.length > 0) {
        payload.append("image_url", selectedFiles[0]);
      }
  
      // ================= UPDATE =================
      if (customCakeFlavorData) {
        const res = await axios.put(
          updateCustomCakeFlavorById(customCakeFlavorData.id),
          payload
        );
  
        if (res.status === 200) {
          toast.success("Custom Cake Flavor updated successfully!", {
            autoClose: 1000,
          });
  
          const selectedType = customCakeTypes.find((t) =>
              String(t.id) === String(formData.custom_cake_type_id)
          );
  
          if (onUpdateCustomCakeFlavor) {
            onUpdateCustomCakeFlavor({
              ...res.data,
              customCakeTypes: selectedType || null,
            });
          }
  
          closePopup();
        }
      }
      // ================= CREATE =================
      else {
        const res = await axios.post(createCustomCakeFlavor, payload);
  
        if (res.status === 201 || res.status === 200) {
          const selectedType = customCakeTypes.find(
            (t) =>
              String(t.id) === String(formData.custom_cake_type_id)
          );
  
          const createdCustomCakeFlavor = {
            ...res.data,
            customCakeTypes: selectedType || null,
          };
          toast.success("Custom Cake Flavor added successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
          if (onAddCustomCakeFlavor)
            onAddCustomCakeFlavor(createdCustomCakeFlavor);
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

  const fetchAllCustomCakeTypes = async () => {
    try {
      const response = await axios.get(getAllCustomCakeTypes);
      setCustomCakeTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching custom cake types", error);
    }
  }

  useEffect (() =>{
    if (!token) return;
    fetchAllCustomCakeTypes();
  },[token]);

  return (
    <form className="mt-0" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label text-secondary">
          Name English
        </label>
        <input
          name="name_en"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_en} 
          onChange={(e)=>setFormData({...formData,name_en:e.target.value})}
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">
          Name Arabic
        </label>
        <input
          name="name_ar"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_ar} 
          onChange={(e)=>setFormData({...formData,name_ar:e.target.value})}
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">
          Slug
        </label>
        <input
          name="slug"
          type="text"
          className="form-control text-secondary"
          value={formData.slug} 
          onChange={(e)=>setFormData({...formData,slug:e.target.value})}
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">
          Custom Cake Type
        </label>
        <select
          name="custom_cake_type_id"
          type="select"
          className="form-select textarea-hove-dark text-secondary"
          value={formData.custom_cake_type_id} onChange={(e)=>setFormData({...formData,custom_cake_type_id:e.target.value})}>
          <option>Select Custom Cake Type</option>
            {customCakeTypes.map((customCakeType) => (
            <option key={customCakeType?.id} value={customCakeType?.id}>
              {customCakeType?.name_en}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-12 mt-3">
        <div className="form-check form-switch m-2">
          <input 
            className="form-check-input fs-5" 
            type="checkbox"
            role="switch" 
            checked={formData.status === "active"} 
            onChange={(e) => setFormData((prev) => ({
              ...prev,status: e.target.checked ? "active" : "inactive"
            }))
            }/>
          <label className="form-check-label mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "active"? "active": "inactive"}
          </label>
        </div>
      </div>

      <div className="col-md-12 px-1 mt-3">
        <label className="form-label text-secondary">
          File Attachment
        </label>
        <div className="">
          <input
            type="file"
            className="form-control form-control-lg textarea-hover-dark text-secondary"
            id="fileInput"
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
          className="cancle-btn rounded-3 w-100" onClick={closePopup}>
          Cancel
        </button>
        <button
          type="submit"
          className="org-btn w-100"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default AddCustomCakeFlavor;
