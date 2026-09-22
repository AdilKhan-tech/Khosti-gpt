"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import RangeChart from "@/components/dashboard/stats/RangeChart";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import {
  getAllBranches,
  getAllCategories,
  getAllOcassions,
  getAllOrdersRoute,
  getAllProductsRoute,
} from "@/utils/apiRoutes";

const initialCatalog = [
  {
    label: "Products",
    value: 0,
    icon: "bi-box-seam",
    href: "/dashboard/product",
    tone: "primary",
  },
  {
    label: "Categories",
    value: 0,
    icon: "bi-grid",
    href: "/dashboard/setting/category",
    tone: "success",
  },
  {
    label: "Branches",
    value: 0,
    icon: "bi-geo-alt",
    href: "/dashboard/setting/branches",
    tone: "warning",
  },
  {
    label: "Occasions",
    value: 0,
    icon: "bi-calendar-heart",
    href: "/dashboard/setting/occasion",
    tone: "info",
  },
];

const initialMetrics = [
  {
    label: "Total orders",
    value: "0",
    change: "Live",
    note: "all time",
    icon: "bi-bag-check",
    tone: "primary",
  },
  {
    label: "Customers",
    value: "0",
    change: "Live",
    note: "unique customers",
    icon: "bi-people",
    tone: "success",
  },
  {
    label: "Revenue",
    value: "SAR 0",
    change: "Live",
    note: "from orders",
    icon: "bi-wallet2",
    tone: "warning",
  },
  {
    label: "Average order",
    value: "SAR 0",
    change: "Live",
    note: "per order",
    icon: "bi-graph-up-arrow",
    tone: "info",
  },
];

const formatCurrency = (value) =>
  `SAR ${Number(value || 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}`;

const getCount = (response) =>
  response?.data?.pagination?.total ?? response?.data?.data?.length ?? 0;

const timeAgo = (date) => {
  const minutes = Math.max(
    1,
    Math.round((Date.now() - new Date(date).getTime()) / 60000),
  );
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.round(hours / 24)} days ago`;
};

function Home() {
  const { token } = useAxiosConfig();
  const [orders, setOrders] = useState([]);
  const [catalog, setCatalog] = useState(initialCatalog);
  const [metrics, setMetrics] = useState(initialMetrics);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      const requests = await Promise.allSettled([
        axios.get(getAllOrdersRoute),
        axios.get(getAllProductsRoute, { params: { page: 1, limit: 1 } }),
        axios.get(getAllCategories, { params: { page: 1, limit: 1 } }),
        axios.get(getAllBranches, { params: { page: 1, limit: 1 } }),
        axios.get(getAllOcassions, { params: { page: 1, limit: 1 } }),
      ]);

      const [
        ordersResult,
        productsResult,
        categoriesResult,
        branchesResult,
        occasionsResult,
      ] = requests;
      const liveOrders =
        ordersResult.status === "fulfilled"
          ? ordersResult.value.data?.data || []
          : [];
      const revenue = liveOrders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0,
      );
      const customers = new Set(
        liveOrders.map(
          (order) =>
            order.customer_email || order.customer_phone || order.customer_name,
        ),
      ).size;

      setOrders(liveOrders);
      setMetrics([
        { ...initialMetrics[0], value: liveOrders.length.toLocaleString() },
        { ...initialMetrics[1], value: customers.toLocaleString() },
        { ...initialMetrics[2], value: formatCurrency(revenue) },
        {
          ...initialMetrics[3],
          value: formatCurrency(
            liveOrders.length ? revenue / liveOrders.length : 0,
          ),
        },
      ]);
      setCatalog([
        {
          ...initialCatalog[0],
          value: getCount(
            productsResult.status === "fulfilled" ? productsResult.value : null,
          ),
        },
        {
          ...initialCatalog[1],
          value: getCount(
            categoriesResult.status === "fulfilled"
              ? categoriesResult.value
              : null,
          ),
        },
        {
          ...initialCatalog[2],
          value: getCount(
            branchesResult.status === "fulfilled" ? branchesResult.value : null,
          ),
        },
        {
          ...initialCatalog[3],
          value: getCount(
            occasionsResult.status === "fulfilled"
              ? occasionsResult.value
              : null,
          ),
        },
      ]);
      setIsLoading(false);
    };

    fetchDashboardData();
  }, [token]);

  const activity = useMemo(
    () =>
      orders.slice(0, 4).map((order) => ({
        title: `Order ${order.status}`,
        detail: `${order.order_number} · ${order.customer_name}`,
        time: timeAgo(order.created_at),
        icon:
          order.status === "completed" ? "bi-check2-circle" : "bi-bag-check",
        tone: order.status === "cancelled" ? "danger" : "primary",
      })),
    [orders],
  );

  return (
    <div className="dashboard-home container-fluid px-3 px-xl-4 py-4">
      <div className="dashboard-hero rounded-4 p-4 p-lg-5 mb-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-8">
            <span className="dashboard-eyebrow">Store overview</span>
            <h1 className="display-6 fw-bold mb-2">Good morning, Admin</h1>
            <p className="mb-0 text-secondary">
              Live data from your Marble Slab store.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end">
            <span className="dashboard-date d-inline-flex align-items-center gap-2">
              <i className="bi bi-calendar3"></i>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {metrics.map((metric) => (
          <div className="col-12 col-sm-6 col-xl-3" key={metric.label}>
            <div className="dashboard-kpi h-100 rounded-4 p-4 bg-white">
              <div className="d-flex justify-content-between align-items-start mb-4">
                <span
                  className={`dashboard-icon dashboard-icon-${metric.tone}`}
                >
                  <i className={`bi ${metric.icon}`}></i>
                </span>
                <span className="dashboard-trend">
                  <i className="bi bi-broadcast-pin"></i> {metric.change}
                </span>
              </div>
              <p className="text-secondary small mb-1">{metric.label}</p>
              <h2 className="fw-bold mb-1">
                {isLoading ? "..." : metric.value}
              </h2>
              <small className="text-muted">{metric.note}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-xl-8">
          <section className="dashboard-panel bg-white rounded-4 h-100">
            <div className="dashboard-panel-header p-4 d-flex justify-content-between align-items-center">
              <div>
                <span className="dashboard-eyebrow">Performance</span>
                <h2 className="h5 fw-bold mb-0 mt-1">Sales overview</h2>
              </div>
              <span className="badge rounded-pill text-bg-light">Live</span>
            </div>
            <div className="p-3 p-lg-4 dashboard-chart">
              <RangeChart orders={orders} />
            </div>
          </section>
        </div>
        <div className="col-xl-4">
          <section className="dashboard-panel bg-white rounded-4 h-100">
            <div className="dashboard-panel-header p-4 d-flex justify-content-between align-items-center">
              <div>
                <span className="dashboard-eyebrow">Catalog</span>
                <h2 className="h5 fw-bold mb-0 mt-1">Quick summary</h2>
              </div>
              <span className="badge rounded-pill text-bg-light">Live</span>
            </div>
            <div className="p-4 pt-1">
              {catalog.map((item) => (
                <Link
                  href={item.href}
                  className="dashboard-catalog-row d-flex align-items-center gap-3 py-3 text-decoration-none"
                  key={item.label}
                >
                  <span
                    className={`dashboard-icon dashboard-icon-${item.tone}`}
                  >
                    <i className={`bi ${item.icon}`}></i>
                  </span>
                  <span className="flex-grow-1">
                    <span className="d-block text-dark fw-medium">
                      {item.label}
                    </span>
                    <small className="text-muted">Manage collection</small>
                  </span>
                  <strong className="text-dark">
                    {isLoading ? "..." : item.value}
                  </strong>
                  <i className="bi bi-chevron-right text-muted small"></i>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-xl-7">
          <section className="dashboard-panel bg-white rounded-4">
            <div className="dashboard-panel-header p-4 d-flex justify-content-between align-items-center">
              <div>
                <span className="dashboard-eyebrow">Workspace</span>
                <h2 className="h5 fw-bold mb-0 mt-1">Quick actions</h2>
              </div>
              <span className="small text-muted">Common tasks</span>
            </div>
            <div className="p-4 pt-1 row g-3">
              {[
                [
                  "/dashboard/product/productForm",
                  "bi-plus-lg",
                  "Add product",
                  "Create a new catalog item",
                ],
                [
                  "/dashboard/setting/occasion",
                  "bi-calendar-plus",
                  "Add occasion",
                  "Build a seasonal collection",
                ],
                [
                  "/dashboard/setting/branches",
                  "bi-building-add",
                  "Manage branches",
                  "Update store locations",
                ],
                [
                  "/dashboard/cake/cakeSize",
                  "bi-sliders",
                  "Configure cakes",
                  "Adjust sizes and flavors",
                ],
              ].map(([href, icon, title, description]) => (
                <div className="col-sm-6" key={title}>
                  <Link
                    href={href}
                    className="dashboard-action d-flex align-items-center gap-3 rounded-3 p-3 text-decoration-none"
                  >
                    <span className="dashboard-action-icon">
                      <i className={`bi ${icon}`}></i>
                    </span>
                    <span>
                      <strong className="d-block text-dark">{title}</strong>
                      <small className="text-muted">{description}</small>
                    </span>
                    <i className="bi bi-arrow-up-right ms-auto text-muted"></i>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="col-xl-5">
          <section className="dashboard-panel bg-white rounded-4 h-100">
            <div className="dashboard-panel-header p-4 d-flex justify-content-between align-items-center">
              <div>
                <span className="dashboard-eyebrow">Live feed</span>
                <h2 className="h5 fw-bold mb-0 mt-1">Recent activity</h2>
              </div>
              <span className="badge rounded-pill text-bg-light">Today</span>
            </div>
            <div className="px-4 pb-3">
              {activity.length === 0 && (
                <p className="text-muted small py-3">No recent activity yet.</p>
              )}
              {activity.map((item) => (
                <div
                  className="dashboard-activity d-flex gap-3 py-3"
                  key={`${item.title}-${item.detail}`}
                >
                  <span
                    className={`dashboard-icon dashboard-icon-${item.tone}`}
                  >
                    <i className={`bi ${item.icon}`}></i>
                  </span>
                  <div className="flex-grow-1">
                    <strong className="d-block small">{item.title}</strong>
                    <span className="text-muted small">{item.detail}</span>
                  </div>
                  <time className="text-muted small">{item.time}</time>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
