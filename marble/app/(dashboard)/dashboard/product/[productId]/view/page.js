"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { getProductByIdRoute } from "@/utils/apiRoutes";

export default function Page() {
  const { productId } = useParams();
  const router = useRouter();
  const { token } = useAxiosConfig();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(getProductByIdRoute(productId));
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !productId) return;
    fetchProduct();
  }, [productId, token]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          Failed to load product details. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h2 fw-bold text-dark mb-1">Product Details</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="#" className="text-decoration-none text-muted">Products</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">Details</li>
                </ol>
              </nav>
            </div>
            <button
              onClick={() => router.back()}
              className="btn btn-outline-secondary d-flex align-items-center"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Back
            </button>
          </div>
          {/* Main Card */}
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
                <div className="d-flex justify-content-between">
                <div>
                  <h1 className="h3 fw-bold text-dark mb-1">Product Information</h1>
                  <p className="text-muted mb-0">Complete information about the product</p>
                </div>

                <div className="badge bg-light text-dark border me-3 fs-6 px-3 py-2 h-25 mt-2">
                  ID: #{productId}
                </div>
                </div>
              <hr />
              {/* Product Image and Basic Info */}
              <div className="row mb-5">
                <div className="col-lg-4 col-md-5 mb-4 mb-md-0">
                  <div className="card border rounded-3 overflow-hidden shadow-sm">
                    <div className="card-body p-3">
                      <div className="position-relative" style={{ height: "300px" }}>
                        <img
                          src={product.image_url}
                          alt={product.name_en}
                          className="img-fluid rounded w-100 h-100 object-fit-cover"
                        />
                      </div>
                    </div>
                    <div className="card-footer bg-light border-top py-3">
                        <span className="badge bg-primary fs-6 px-3 w-100 py-2">
                          ${product.regular_price}
                        </span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-8 col-md-7">
                  {/* Product Names */}
                  <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                      <div className="p-3 bg-light rounded-3">
                        <h4 className="fs-16 fw-medium mb-0 text-break mb-0">{product.name_en}</h4>
                        <h6 className="fs-14 fw-normal mt-2">English Name</h6>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="p-3 bg-light rounded-3">
                        <h4 className="fs-16 fw-medium text-break mb-0">{product.name_ar}</h4>
                        <h6 className="fs-14 fw-normal mt-2">Arabic Name</h6>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <div className="p-3 bg-light rounded-3">
                      <div
                        className="fs-16 fw-medium mb-0"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                      <h6 className="fs-14 fw-normal mt-2">Product Description</h6>
                    </div>
                  </div>

                  {/* Tags and Gender */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="p-3 bg-light rounded-3 h-100">
                        <div className="d-flex flex-wrap gap-2">
                          {product?.tags?.length ? (
                            product.tags.map((tag, index) => (
                              <span key={index} className="badge bg-secondary-subtle text-dark fs-16 fw-medium">
                                {tag.name_en}
                              </span>
                            ))
                          ) : (
                            <span className="text-muted">No tags</span>
                          )}
                        </div>
                        <h6 className="fs-14 fw-normal mt-2 mt-2">Product Tags</h6>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="p-3 bg-light rounded-3 h-100">
                        <p className="text-dark fs-16 fw-medium mb-0">{product.gender.name_en}</p>
                        <h6 className="fs-14 fw-normal mt-2 mt-2">Gender</h6>

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-4" />

              {/* Detailed Information Grid */}
              <h5 className="fw-bold text-dark mb-4">Product Information</h5>

              <div className="row g-3">
                {/* First Row */}
                <div className="col-xl-3 col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <p className="text-dark fs-16 fw-medium mb-0">{product.tax_status}</p>
                      <h6 className="fs-14 fw-normal mt-2 mt-2">Tax Status</h6>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <p className="text-dark fs-16 fw-medium mb-0">{product.tax_class}</p>
                      <h6 className="fs-14 fw-normal mt-2 mt-2">Tax Class</h6>

                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <p className="text-dark fs-16 fw-medium mb-0">{product.sku || "N/A"}</p>
                      <h6 className="fs-14 fw-normal mt-2 mt-2">Product SKU</h6>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <p className="text-dark fs-16 fw-medium">
                        {product.stock || "In Stock"}
                      </p>
                      <h6 className="fs-14 fw-normal mt-2 mt-2">Stock Status</h6>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories, Branches, Occasions in SAME ROW - Just like Tags */}
              <div className="row g-3 mt-3">
                {/* Product Categories */}
                <div className="col-xl-4 col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex flex-wrap gap-2">
                        {product?.categories?.length ? (
                          product.categories.map((category, index) => (
                            <span key={index} className="badge bg-secondary-subtle text-dark">
                              <i className="bi bi-folder me-1"></i>
                              {category.name_en}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted">No categories</span>
                        )}
                      </div>
                      <h6 className="fs-14 fw-normal mt-2 mt-3">Product Categories</h6>
                    </div>
                  </div>
                </div>

                {/* Product Branches */}
                <div className="col-xl-4 col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex flex-wrap gap-2">
                        {product?.branches?.length ? (
                          product.branches.map((branch, index) => (
                            <span key={index} className="badge bg-secondary-subtle text-dark">
                              <i className="bi bi-shop me-1"></i>
                              {branch.name_en}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted">No branches</span>
                        )}
                      </div>
                      <h6 className="fs-14 fw-normal mt-2 mt-3">Product Branches</h6>
                    </div>
                  </div>
                </div>

                {/* Product Occasions */}
                <div className="col-xl-4 col-md-4">
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex flex-wrap gap-2">
                        {product?.occasions?.length ? (
                          product.occasions.map((occasion, index) => (
                            <span key={index} className="badge bg-secondary-subtle text-dark">
                              <i className="bi bi-calendar-event me-1"></i>
                              {occasion.name_en}
                            </span>
                          ))
                        ) : (
                          <span className="text-muted">No occasions</span>
                        )}
                      </div>
                      <h6 className="fs-14 fw-normal mt-2 mt-3">Product Occasions</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-top">
                <div className="d-flex justify-content-end gap-3">
                  <button
                    onClick={() => router.back()}
                    className="btn btn-outline-secondary px-4 w-25"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}