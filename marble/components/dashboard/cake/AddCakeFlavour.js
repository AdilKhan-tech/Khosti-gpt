"use client";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import axios from "axios";
import { createCakeFlavor, updateCakeFlavorById, getCakeCategoryChildrens } from "@/utils/apiRoutes";

const AddCakeFlavour = ({ closePopup, cakeFlavorData = null, onAddCakeFlavor, onUpdateCakeFlavor }) => {
  const {token} = useAxiosConfig();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [cakeCategories, setCakeCategories] = useState([]);

  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    cake_category_id: "",
    slug: "",
    additional_price: "",
    symbol: "",
    status: "active",
  });

  useEffect(() => {
    if (cakeFlavorData) {
      setFormData({
        name_en: cakeFlavorData.name_en || "",
        name_ar: cakeFlavorData.name_ar || "",
        cake_category_id: cakeFlavorData.cake_category_id || "",
        slug: cakeFlavorData.slug || "",
        additional_price: cakeFlavorData.additional_price || "",
        symbol: cakeFlavorData.symbol || "",
        status: cakeFlavorData.status || "active",
      });
    }
  }, [cakeFlavorData]);

    const fetchCakeCategories = async () => {
    try {
      const response = await axios.get(getCakeCategoryChildrens);
      setCakeCategories(response.data);
    } catch (error) {
      console.error("Error fetching cake categories", error);
    }
    };
  
  const findCategoryById = (categories, id) => {
    for (const cat of categories) {
      if (String(cat.id) === String(id)) return cat;

      if (cat.children?.length) {
        const found = findCategoryById(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
      if (!token) return;
      fetchCakeCategories();
  }, [token]);

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
    if (!formData.cake_category_id) errors.push("Cake type is required.");
    if (!formData.slug) errors.push("Slug is required.");
    if (!formData.status) errors.push("Status is required.");
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
      if (cakeFlavorData) {
        const res = await axios.put(
          updateCakeFlavorById(cakeFlavorData.id),
          payload
        );

        if (res.status === 200) {
          toast.success("Cake Flavour updated successfully!", {
            autoClose: 1000,
          });

          const selectedType = findCategoryById(
            cakeCategories,
            formData.cake_category_id
          );

          const updatedCakeFlavor = {
            ...res.data,
            cakeCategory: selectedType || null,
          };

          if (onUpdateCakeFlavor) {
            onUpdateCakeFlavor(updatedCakeFlavor);
          }

          closePopup();
        }
      }

      // ================= CREATE =================
      else {
        const res = await axios.post(createCakeFlavor, payload);
      
        if (res.status === 201 || res.status === 200) {
          const selectedType = findCategoryById(
            cakeCategories,
            formData.cake_category_id
          );
      
          const createdCakeFlavor = {
            ...res.data,
            cakeCategory: selectedType || null,
          };
      
          toast.success("Cake Flavour added successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
      
          if (onAddCakeFlavor) onAddCakeFlavor(createdCakeFlavor);
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
    <form className="component-form" onSubmit={handleSubmit}>
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
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Cake Type
        </label>
        <select
          name="cake_category_id"
          className="form-select textarea-hover-dark text-secondary"
          value={formData.cake_category_id}
          onChange={handleChange}
        >
          <option value="">Select Cake Type</option>

          {cakeCategories.map((parent) => (
            <React.Fragment key={parent.id}>
              {/* Parent category */}
              <option value={parent.id}>
                {parent.name_en}
              </option>

              {/* Children categories */}
              {parent.children?.map((child) => (
                <option key={child.id} value={child.id}>
                  {"— "}{child.name_en}
                </option>
              ))}
            </React.Fragment>
          ))}
        </select>
      </div>

      <div className="row">
      <div className="form-group mt-3 col-md-6">
        <label className="form-label text-secondary">Slug</label>
        <input 
          name="slug" 
          type="text" 
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.slug} 
          onChange={handleChange}
        />
      </div>

      <div className="form-group mt-3 col-md-6">
        <label className="form-label text-secondary">Price</label>
        <input 
          name="additional_price" 
          type="number" 
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.additional_price} 
          onChange={handleChange}
        />
      </div>
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Symbol</label>
        <input 
          name="symbol" 
          type="text" 
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.symbol} 
          onChange={handleChange}
        />
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
            }
          />
          <label className="form-check-label mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "active"? "Active": "Inactive"}
          </label>
        </div>
      </div>

      <div className="col-md-12 px-1 mt-3">
        <label className="form-label text-secondary">File Attachment</label>
        <div className="">
          <input 
            type="file" 
            className="form-control form-control-lg textarea-hover-dark text-secondary bg-light" 
            id="fileInput"
            multiple 
            onChange={handleFileChange}
          />
        </div>

        <ul className="mt-2">
          {selectedFiles.map((file, index) => (
            <li className="list-unstyled text-muted  mt-2 fnt-color opacity-50 fs-16 fw-normal" key={index}>File flavour: {file.size} KB</li>
          ))}
        </ul>
        <div className="text-danger">
        <i className="bi bi-info-circle me-2"></i>
        <span className="fs-12 fw-bold">Supported files : GIF ,JPG , PNG, PDF , DOC , or DOCX</span>
        </div>
      </div>

      <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
        <button type="button" className="cancle-btn rounded-3 w-100" onClick={closePopup}>Cancel</button>
        <button type="submit" className="org-btn w-100">Save</button>
      </div>
    </form>
  );
};

export default AddCakeFlavour;
