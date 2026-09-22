"use client";
import { useEffect, useState } from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast } from "react-toastify";
import axios from "axios";
import { UpdateCategoryById, createCategory, getCategoryTree } from "@/utils/apiRoutes";

const flattenCategories = (categories, level = 0) => {
  let result = [];

  categories.forEach(cat => {
    result.push({
      ...cat,
      level,
    });

    if (cat.children?.length) {
      result = result.concat(
        flattenCategories(cat.children, level + 1)
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

const AddCategory = ({closePopup,categoryData = null,onAddCategory,onUpdateCategory,}) => {
  const { token } = useAxiosConfig();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    slug: "",
    parent_id: "",
    display_type: "",
  });
  
  useEffect(() => {
    if (categoryData) {
      setFormData({
        name_en: categoryData.name_en || "",
        name_ar: categoryData.name_ar || "",
        slug: categoryData.slug || "",
        parent_id: categoryData.parent_id || "",
        display_type: categoryData.display_type || "",
      });
    }
  }, [categoryData]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const fetchCategories = async () => {
    if (!token) return;

    const res = await axios.get(getCategoryTree);
    const flat = flattenCategories(res.data.data);

    // ✅ If Update Mode
    if (categoryData?.id) {
      const currentId = categoryData.id;
  
      // get all children recursively
      const descendantIds = getAllDescendantIds(flat, currentId);
  
      // remove self + children
      const filtered = flat.filter(
        (item) =>
          item.id !== currentId &&
          !descendantIds.includes(item.id)
      );
  
      setParentCategories(filtered);
    } else {
      setParentCategories(flat);
    }
  };
  
  useEffect(() => {
    fetchCategories();
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

      if (categoryData) {
        const res = await axios.put(UpdateCategoryById(categoryData.id), payload);

        if (res.status === 200) {
          toast.success("Category updated successfully!", {
            autoClose: 1000,
          });

          if (onUpdateCategory) {
            const updated = res.data;

            if (updated.parent_id) {
              const parent = parentCategories.find(
                p => p.id === updated.parent_id
              );

              updated.parent = parent
                ? { id: parent.id, name_en: parent.name_en }
                : null;
            } else {
              updated.parent = null;
            }

            onUpdateCategory(updated);
          }

          closePopup();
        }
      }
      else {
        const res = await axios.post(createCategory, payload);

        if (res.status === 201 || res.status === 200) {
          toast.success("Category added successfully!", {autoClose: 1000, onClose: closePopup, });

          if (onAddCategory) {
            const newCategory = res.data;

            if (newCategory.parent_id) {
              const parent = parentCategories.find(
                p => p.id === newCategory.parent_id
              );
            
              newCategory.parent = parent
                ? { id: parent.id, name_en: parent.name_en }
                : null;
            }
            onAddCategory(newCategory);
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
      errors.forEach(err => toast.error(err));
      setErrors([]);
    }
  }, [errors]);  
  
  return (
    <form className="mt-0" onSubmit={handleSubmit}>
      <div className="form-group">
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

      <div className="form-group mt-3">
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

      <div className="row">
        <div className="form-group mt-3 col-md-6">
          <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
            Parent Category
          </label>
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

            {parentCategories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {"— ".repeat(cat.level || 0)}
                {cat.name_en}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mt-3 col-md-6">
          <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
            Display Type
          </label>
          <select
            name="display_type"
            type="text"
            className="form-select textarea-hover-dark text-secondary"
            value={formData.display_type}
            onChange={(e) =>
              setFormData({ ...formData, display_type: e.target.value })}>
            <option value="Default">Default</option>
            <option value="Products">Products</option>
            <option value="Subcategories">Subcategories</option>
            <option value="Both">Both</option>
          </select>
        </div>
      </div>

      <div className="col-md-12 px-1 mt-3">
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
          onClick={closePopup}
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

export default AddCategory;
