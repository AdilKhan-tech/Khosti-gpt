"use client";
import React from "react";
import { useEffect, useState } from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast } from "react-toastify";
import axios from "axios";
import { createCookie, updateCookieById, getAllCookieBoxTypes } from "@/utils/apiRoutes";

const AddCookie = ({ closePopup, cookieData = null, onAddCookie, onUpdateCookie }) => {
  const { token } = useAxiosConfig();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [cookieBoxTypes, setCookieBoxTypes] = useState([]);

  const [formData, setFormData] = useState({
      name_en:"",
      name_ar:"",
      cookie_type_id :"",
      slug:"",
      sort:"",
      status:"active",
      image_url:"",
  })

  useEffect(() => {
    if (cookieData) {
      setFormData({
        name_en: cookieData.name_en || "",
        name_ar: cookieData.name_ar || "",
        cookie_type_id:cookieData.cookie_type_id || "",
        slug: cookieData.slug || "",
        sort: cookieData.sort || "",
        status: cookieData.status || "active",
        image_url: cookieData.image_url || "",
      });
    }
  }, [cookieData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchCookieBoxTypes = async () => {
    try {
      const response = await axios.get(getAllCookieBoxTypes);
      setCookieBoxTypes(response?.data?.data);
    }catch(error){
      console.error("Error fetching cookie", error)
    }
  }

  useEffect (() =>{
    if(!token) return;
    fetchCookieBoxTypes();
  }, [token])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.name_en) errors.push("Name English is required.");
    if (!formData.name_ar) errors.push("Name Arabic is required.");
    if (!formData.cookie_type_id) errors.push("Cookie type is required.");
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
        payload.append(key, value);
      });
  
      if (selectedFiles && selectedFiles.length > 0) {
        payload.append("image_url", selectedFiles[0]);
      }
      

      if (cookieData) {
        const res = await axios.put(updateCookieById(cookieData.id), payload);
      
        if (res.status === 200) {
          toast.success("Cookie updated successfully!", {
            autoClose: 1000,
          });

          const selectedType = cookieBoxTypes.find(
            (t) => String(t.id) === String(formData.cookie_type_id)
          );
      
          if (onUpdateCookie) {
            onUpdateCookie({
              ...res.data,        // 🔥 backend ka fresh response
              type: selectedType || null,
            });
          }
      
          closePopup();
        }
      }
      
      //  CREATE
      else {
        const res = await axios.post(createCookie, payload);

        if (res.status === 201 || res.status === 200) {
          const selectedType = cookieBoxTypes.find(
            (t) => String(t.id) === String(formData.cookie_type_id)
          );
  
          const createdCookie = {
            ...res.data,
            type: selectedType || null,
          };
  
          toast.success("Cookie added successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
          if (onAddCookie) onAddCookie(createdCookie);
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
    if (errors.length) {
      errors.forEach((err) => toast.error(err));
      setErrors([]);
    }
  }, [errors]);

  return (
    <form className="mt-0" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label text-secondary">Name English</label>
        <input
          name="name_en" type="text"
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
        <label className="form-label text-secondary">Cookie Type</label>
        <select
          name="cookie_type_id"
          className="form-select text-secondary"
          value={formData.cookie_type_id}
          onChange={(e)=>setFormData({...formData,cookie_type_id:e.target.value})}
        >
          <option value="">Select Cookie Type</option>

          {cookieBoxTypes.map((cookieBoxType) => (
            <option key={cookieBoxType?.id} value={cookieBoxType?.id}>
              {cookieBoxType?.name_en}
            </option>
          ))}
        </select>
      </div>

      <div className="row mt-3">
      <div className="form-group col-md-6">
        <label className="form-label text-dark-custom text-secondary">Slug</label>
        <input
          name="slug" type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.slug} 
          onChange={handleChange}
        />
      </div>

      <div className="form-group col-md-6">
        <label className="form-label text-dark-custom text-secondary">Sort</label>
        <input
          name="sort" 
          type="number"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.sort} 
          onChange={handleChange}
        />
      </div>
      </div>

      <div className="col-md-12 mt-3">
      <label className="form-label text-dark-custom text-secondary">Status</label>
        <div className="form-check form-switch m-3">
          <input 
            className="form-check-input fs-4" 
            type="checkbox"
            role="switch" 
            checked={formData.status === "active"} 
            onChange={(e) => setFormData((prev) => ({
              ...prev,
              status: e.target.checked ? "active" : "inactive",
            }))}
          />
          <label className="form-check-label ms-2 mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "active"? "Active": "Inactive"}
          </label>
        </div>
      </div>
      
      <div className="col-md-12 px-1 mt-3">
        <label className="form-label text-dark-custom text-secondary">File Attachment</label>
        <div className="">
          <input 
            type="file" 
            name="image_url"
            className="form-control form-control-lg textarea-hover-dark text-secondary" 
            id="fileInput"
            onChange={handleFileChange}
          />
        </div>
        <ul className="mt-3">
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

export default AddCookie;
