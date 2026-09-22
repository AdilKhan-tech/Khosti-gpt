"use client"
import React, { useEffect, useState } from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast } from "react-toastify";
import axios from "axios";
import { createCakePortionSize, updateCakePortionSizeById, getCakePortionSizeTree } from "@/utils/apiRoutes";

const flattenCategories = (cakePortionSizes, level = 0) => {
  let result = [];

  cakePortionSizes.forEach(cakePortionSize => {
    result.push({
      ...cakePortionSize,
      level,
    });

    if (cakePortionSize.children?.length) {
      result = result.concat(
        flattenCategories(cakePortionSize.children, level + 1)
      );
    }
  });

  return result;
};

const getAllDescendantIds = (items, parentId) => {
  const ids = [];

  const findChildren = (id) => {
    items.forEach((item) => {
      if (item.parent_id === id) {
        ids.push(item.id);
        findChildren(item.id);
      }
    });
  };

  findChildren(parentId);
  return ids;
};

const AddCakePortionSize = ({ closePopup, cakePortionSizeData = null, onAddCakePortionSize, onUpdateCakePortionSize }) => {
  const { token } = useAxiosConfig();
  const [parentCakePortionSizes, setParentCakePortionSizes] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name_en: "",
    name_ar: "",
    slug: "",
    parent_id: "",
  });

  useEffect(() => {
    if (cakePortionSizeData) {
      setFormData({
        id: cakePortionSizeData.id,
        name_en: cakePortionSizeData.name_en || "",
        name_ar: cakePortionSizeData.name_ar || "",
        slug: cakePortionSizeData.slug || "",
        parent_id: cakePortionSizeData.parent_id || "",
      });
    }
  }, [cakePortionSizeData]);

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

  const fetchCakePortionSizeTree = async () => {
    if (!token) return;
  
    const res = await axios.get(getCakePortionSizeTree);
    const flat = flattenCategories(res.data.data);
  
    // ✅ If Update Mode
    if (cakePortionSizeData?.id) {
      const currentId = cakePortionSizeData.id;
  
      // get all children recursively
      const descendantIds = getAllDescendantIds(flat, currentId);
  
      // remove self + children
      const filtered = flat.filter(
        (item) =>
          item.id !== currentId &&
          !descendantIds.includes(item.id)
      );
  
      setParentCakePortionSizes(filtered);
    } else {
      setParentCakePortionSizes(flat);
    }
  };

  useEffect(() => {
    fetchCakePortionSizeTree();
  }, [token]);

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
        if (value !== null && value !== "") {
          payload.append(key, value);
        }
      });

      if (selectedFiles.length > 0) {
        payload.append("image_url", selectedFiles[0]);
      }

      //------------ UPDATE 
      if (cakePortionSizeData) {
        const res = await axios.put(updateCakePortionSizeById(cakePortionSizeData.id), payload);

        if (res.status === 200) {
          toast.success("Cake Portion Size updated successfully!", {
            autoClose: 1000,
          });

          if (onUpdateCakePortionSize) {
            const updated = res.data; 
           
           if (updated.parent_id) {
              const parent = parentCakePortionSizes.find(
                p => p.id === updated.parent_id
              );

              updated.parent = parent
                ? { id: parent.id, name_en: parent.name_en }
                : null;
            }

            onUpdateCakePortionSize(updated);
          } 

          closePopup();
        }
      }

      // ------------CREATE 
      else {
        const res = await axios.post(createCakePortionSize, payload);

        if (res.status === 201 || res.status === 200) {
         toast.success("Cake Portion Size added successfully!", 
         {autoClose: 1000, onClose: closePopup, });


         if (onAddCakePortionSize) {
            const newCakePortionSize = res.data;
            
              if (newCakePortionSize.parent_id) {
              const parent = parentCakePortionSizes.find(
                p => p.id === newCakePortionSize.parent_id
              );
               newCakePortionSize.parent = parent
                ? { id: parent.id, name_en: parent.name_en }
                : null;
            }
            onAddCakePortionSize(newCakePortionSize);
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

      <div className='row mt-3'>

        <div className="form-group col-md-6">
          <label className="form-label text-secondary">Slug</label>
          <input 
            name="slug" 
            type="text" 
            className="form-control form-control-lg textarea-hover-dark text-secondary"
            value={formData.slug} 
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6">
          <label className="form-label text-secondary">Parent Portion Size</label>
          <select
            name="parent_id"
            className="form-select textarea-hover-dark text-secondary"
            value={formData.parent_id ?? ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                parent_id: e.target.value ? Number(e.target.value) : null
              })
            }
          >
            <option value="">None</option>
            
            {parentCakePortionSizes.map(cakePortionSize => (
              <option key={cakePortionSize.id} value={cakePortionSize.id}>
                {"— ".repeat(cakePortionSize.level || 0)}
                {cakePortionSize.name_en}
              </option>
            ))}
        </select>
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

export default AddCakePortionSize;
