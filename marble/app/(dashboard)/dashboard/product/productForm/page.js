"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getAllGenders, getAllBranches, getCategoryTree, updateProductByIdRoute, getProductByIdRoute, getAllTags, getAllOcassions, createProductRoute } from "@/utils/apiRoutes";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import MultiSelectDropdown from "@/components/dashboard/MultiSelectDropdown";
import axios from "axios";
import Common from "@/utils/Common"
import { toast, ToastContainer } from "react-toastify";
import { useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const MemoJoditEditor = React.memo(JoditEditor);

const AddProduct = ({ onAddProduct }) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const { token } = useAxiosConfig();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const isEditMode = Boolean(id);
  const [productData, setProductData] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const descriptionRef = useRef("");
  const [genders, setGenders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const [branchIds, setBranchIds] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagIds, setTagIds] = useState([]);
  const [occasionIds, setOccasionIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    tag_ids: [],
    description: "",
    occasion_ids: [],
    gender_id: "",
    regular_price: "",
    sale_price: "",
    tax_status: "Taxable",
    tax_class: "Standard",
    branch_ids: [],
    category_ids: []
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFile(files);
  };

  const fetchGenders = async () => {
    try {
      const response = await axios.get(getAllGenders);
      setGenders(response?.data?.data);
    } catch (error) {
      console.error("Error fetching Genders", error);
    }
  };

  // fetchProduct
  useEffect(() => {
    if (!token || !isEditMode) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(getProductByIdRoute(id));
        setProductData(res.data);
      } catch (error) {
        console.error("Product fetch failed", error);
      }
    };

    fetchProduct();
  }, [token, id, isEditMode]);


  /* ===== PREFILL (IMPORTANT PART) ===== */
  useEffect(() => {
    if (!productData || !isEditMode) return;
  
    setFormData({
      name_en: productData.name_en || "",
      name_ar: productData.name_ar || "",
      description: productData.description || "",
      gender_id: productData.gender_id || "",
      regular_price: productData.regular_price || "",
      sale_price: productData.sale_price || "",
      tax_status: productData.tax_status || "",
      tax_class: productData.tax_class || "",
    });
  
    setBranchIds(productData.branches?.map(b => b.id) || []);
    setCategoryIds(productData.categories?.map(c => c.id) || []);
    setOccasionIds(productData.occasions?.map(o => o.id) || []);
    setTagIds(productData.tags?.map(t => t.id) || []);
  }, [productData, isEditMode]);


  const fetchBranches = async () => {
    try {
      const res = await axios.get(getAllBranches);
      setBranches(res?.data?.data || []);
    } catch (err) {
      console.error("Branch fetch error", err);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await axios.get(getAllTags);
      setTags(res?.data?.data || []);
    } catch (err) {
      console.error("Tag fetch error", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(getCategoryTree);
      const flatCategories = Common.flattenCategories(res.data.data);
      setParentCategories(flatCategories);
    } catch (err) {
      console.error("Category fetch error", err);
    }
  };

  const fetchOccasions = async () => {
    try {
      const res = await axios.get(getAllOcassions);
      setOccasions(res?.data?.data || []);
    } catch (err) {
      console.error("Occasion fetch error", err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchGenders();
    fetchBranches();
    fetchTags();
    fetchCategories();
    fetchOccasions();
  }, [token]);

  const editorConfig = useMemo(() => ({
    height: 300,
    toolbarAdaptive: false,
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough',
      '|', 'superscript', 'subscript',
      '|', 'ul', 'ol', 'outdent', 'indent',
      '|', 'font', 'fontsize', 'brush', 'paragraph',
      '|', 'image', 'video', 'table', 'link',
      '|', 'align', 'undo', 'redo', 'fullsize'
    ],
    style: { background: '#f8f9fa', color: '#212529' }
  }), []);

  const validateForm = () => {
    const errors = [];
    if (!formData.name_en) errors.push("Name English is require!");
    if (!formData.name_ar) errors.push("Name Arabic is require!");
    if (!formData.description) errors.push("Description is require!");
    // if (!formData.gender_id) errors.push("Gender is require!");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      validationErrors.forEach((err) => toast.error(err));
      return;
    }
  
    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
  
    branchIds.forEach(id => payload.append("branch_ids[]", id));
    categoryIds.forEach(id => payload.append("category_ids[]", id));
    occasionIds.forEach(id => payload.append("occasion_ids[]", id));
    tagIds.forEach(id => payload.append("tag_ids[]", id));
    selectedFile.forEach(file => payload.append("image_url", file));
  
    try {
      if (isEditMode) {
        await axios.put(updateProductByIdRoute(id), payload);
    
        toast.success("Product updated successfully!", {
          autoClose: 1000,
          onClose: () => {
            router.push("/dashboard/product");
          },
        });
    
      } else {
        await axios.post(createProductRoute, payload);
    
        toast.success("Product added successfully!", {
          autoClose: 1000,
          onClose: () => {
            router.push("/dashboard/product");
          },
        });
      }
    
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex">
            <i
              className="bi bi-arrow-left fs-3 me-2"
              type="button"
              onClick={() => router.back()}
            ></i>
            <h1 className="fs-4 fnt-color fw-semibold mb-0 mt-1">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h1>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fs-18 fw-semibold">Product Information</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fs-14 fw-medium fnt-color opacity-75">Product Name (English) <span className="text-danger">*</span></label>
                    <input
                      name="name_en"
                      type="text"
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                      className="form-control fs-14 mt-2 textarea-hover-dark text-secondary"
                      placeholder="Enter product name in English"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fs-14 fw-medium fnt-color opacity-75">Product Name (Arabic) <span className="text-danger">*</span></label>
                    <input
                      name="name_ar"
                      type="text"
                      value={formData.name_ar}
                      onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                      className="form-control fs-14 mt-2 textarea-hover-dark text-secondary"
                      placeholder="أدخل اسم المنتج باللغة العربية"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fs-14 fw-medium fnt-color opacity-75">Description <span className="text-danger">*</span></label>
                  <div className="border rounded overflow-hidden">
                    <MemoJoditEditor
                      value={formData.description}
                      config={editorConfig}
                      onChange={(content) => {
                        descriptionRef.current = content;
                      }}
                      onBlur={(newContent) => {
                        setFormData(prev => ({
                          ...prev,
                          description: newContent
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fs-14 fw-medium fnt-color opacity-75">Product Tags <span className="text-danger">*</span></label>
                    <MultiSelectDropdown
                      label=""
                      items={tags}
                      selectedIds={tagIds}
                      setSelectedIds={setTagIds}
                      placeholder="Select tags..."
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fs-14 fw-medium fnt-color opacity-75">Gender <span className="text-danger">*</span></label>
                    <select
                      className="form-select form-select-lg"
                      value={formData.gender_id}
                      onChange={(e) =>
                        setFormData({ ...formData, gender_id: e.target.value })
                      }
                    >
                      <option value="">Select Gender</option>
                      {genders.map((gender) => (
                        <option key={gender.id} value={gender.id}>
                          {gender.name_en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fs-18 fw-semibold">Pricing & Tax</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fs-14 fw-medium fnt-color opacity-75">Regular Price</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text">$</span>
                      <input
                        name="regular_price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.regular_price}
                        onChange={(e) => setFormData({ ...formData, regular_price: e.target.value })}
                        className="form-control textarea-hover-dark border-start-0 rounded-start-0"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fs-14 fw-medium fnt-color opacity-75">Sale Price</label>
                    <div className="input-group input-group-lg">
                      <span className="input-group-text">$</span>
                      <input
                        name="sale_price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.sale_price}
                        onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                        className="form-control textarea-hover-dark border-start-0 rounded-start-0"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fs-14 fw-medium fnt-color opacity-75">Tax Status</label>
                    <select
                      name="tax_status"
                      className="form-select form-select-lg"
                      value={formData.tax_status}
                      onChange={(e) => setFormData({ ...formData, tax_status: e.target.value })}
                    >
                      <option value="Taxable">Taxable</option>
                      <option value="Shipping only">Shipping only</option>
                      <option value="None">None</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fs-14 fw-medium fnt-color opacity-75">Tax Class</label>
                    <select
                      name="tax_class"
                      className="form-select form-select-lg"
                      value={formData.tax_class}
                      onChange={(e) => setFormData({ ...formData, tax_class: e.target.value })}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Popular">Popular</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fs-18 fw-semibold">Product Image</h5>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <div
                    className="dropzone border-dashed rounded-3 p-5 mb-3"
                    style={{
                      background: selectedFile.length > 0 ? '#f8f9fa' : '#fff',
                      border: '2px dashed #dee2e6',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onClick={() => document.getElementById('fileInput').click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = '#0d6efd';
                      e.currentTarget.style.background = '#f0f8ff';
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      e.currentTarget.style.borderColor = '#dee2e6';
                      e.currentTarget.style.background = selectedFile.length > 0 ? '#f8f9fa' : '#fff';
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      handleFileChange({ target: { files: e.dataTransfer.files } });
                      e.currentTarget.style.borderColor = '#dee2e6';
                      e.currentTarget.style.background = '#f8f9fa';
                    }}
                  >
                    {selectedFile.length > 0 ? (
                      <div>
                        <i className="bi bi-check-circle-fill text-success fs-1"></i>
                        <p className="mt-3 mb-1 fs-14 fw-medium fnt-color opacity-75">{selectedFile.length} file(s) selected</p>
                        <p className="text-muted small">Click or drag to change</p>
                      </div>
                    ) : (
                      <div>
                        <i className="bi bi-cloud-arrow-up fs-1 text-muted"></i>
                        <p className="mt-3 mb-1 fs-14 fw-medium fnt-color opacity-75">Click to upload or drag & drop</p>
                        <p className="text-muted small">JPG, JPEG or PNG (Max. 2MB each)</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    multiple
                    className="d-none"
                  />

                  <div className="mt-3">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => document.getElementById('fileInput').click()}
                    >
                      <i className="bi bi-plus-circle me-1"></i>Add More Images
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-white py-3">
                <h5 className="mb-0 fs-18 fw-semibold">Categories & Organization</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fs-14 fw-medium fnt-color opacity-75">Categories <span className="text-danger">*</span></label>
                  <MultiSelectDropdown
                    label=""
                    items={parentCategories}
                    selectedIds={categoryIds}
                    setSelectedIds={setCategoryIds}
                    placeholder="Select categories..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fs-14 fw-medium fnt-color opacity-75">Branches <span className="text-danger">*</span></label>
                  <MultiSelectDropdown
                    label=""
                    items={branches}
                    selectedIds={branchIds}
                    setSelectedIds={setBranchIds}
                    placeholder="Select branches..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fs-14 fw-medium fnt-color opacity-75">Occasions <span className="text-danger">*</span></label>
                  <MultiSelectDropdown
                    label=""
                    items={occasions}
                    selectedIds={occasionIds}
                    setSelectedIds={setOccasionIds}
                    placeholder="Select occasions..."
                  />
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <h6 className="fs-18 fw-semibold mb-3">Ready to Publish?</h6>
                <p className="text-muted small mb-4">Review all information before submitting.  fields are marked with *</p>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="border-0 p-2 px-3 btn btn-success text-white fs-16 px-28"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        {isEditMode ? "Update Product" : "Add Product"}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => router.back()}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;