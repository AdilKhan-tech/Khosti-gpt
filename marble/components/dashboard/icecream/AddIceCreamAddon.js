import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { createIceCreamAddOn, updateIceCreamAddOnById } from "@/utils/apiRoutes";

const AddIceCreamAddon = ({ closePopup, IceCreamAddonData = null, onAddIceCreamAddon, onUpdateIceCreamAddon }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    slug: "",
    type:"",
    status: "Active",
  });
  
  useEffect(() => {
    if (IceCreamAddonData) {
      setFormData({
        name_en: IceCreamAddonData.name_en || "",
        name_ar: IceCreamAddonData.name_ar || "",
        slug: IceCreamAddonData.slug || "",
        type: IceCreamAddonData.type || "",
        status: IceCreamAddonData.status || "Active",
      });
    }
  }, [IceCreamAddonData]);

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
    if (!formData.type) errors.push("Addon Type is required.");
  
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
      
      if (IceCreamAddonData) {
        const res = await axios.put(updateIceCreamAddOnById(IceCreamAddonData.id), payload);

        if (res.status === 200) {
          toast.success("Icecream Addon updated successfully!");

          if (onUpdateIceCreamAddon) {
            onUpdateIceCreamAddon(res.data);
          }

          closePopup();
        }
      }
      //  CREATE
      else {
        const res = await axios.post(createIceCreamAddOn, payload);

        if (res.status === 201 || res.status === 200) {
          toast.success("Icecream Addon created successfully!");

          if (onAddIceCreamAddon) {
            onAddIceCreamAddon(res.data);
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

      <div className="form-group mt-2">
        <label className="form-label text-secondary">Name Arabic</label>
        <input 
          name="name_ar" 
          type="text" 
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_ar} 
          onChange={handleChange}
        />
      </div>

      <div className="form-group mt-2">
        <label className="form-label text-secondary">Slug</label>
        <input 
          name="slug" 
          type="text" 
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.slug} 
          onChange={handleChange}
        />
      </div>

      <div className="form-group mt-2">
        <label className="form-label text-secondary">Addon Type</label>
        <select 
          name="type" 
          className="form-select textarea-hover-dark text-secondary"
          value={formData.type} 
          onChange={handleChange}
        >
          <option value="">Select Addon Type</option>
          <option value="Flavor">Flavor</option>
          <option value="Mix-ins">Mix-ins</option>
          <option value="Sauces">Sauces</option>
        </select>
      </div>

      <div className="col-md-12 mt-3">
        <div className="form-check form-switch m-2">
          <input 
            className="form-check-input fs-5" 
            type="checkbox"
            role="switch" 
            checked={formData.status === "Active"} 
            onChange={(e) => setFormData((prev) => ({
              ...prev,status: e.target.checked ? "Active" : "Inactive",
            }))}
          />
          <label className="form-check-label ms-2 mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "Active"? "Active": "Inactive"}
          </label>
        </div>
      </div>
      
      <div className="col-md-12 px-1 mt-2">
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

export default AddIceCreamAddon;
