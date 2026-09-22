import React from "react";
import ApexChart from "@/components/dashboard/stats/ApexChart";
import LineChart from "@/components/dashboard/stats/LineChart";
import Piechart from "@/components/dashboard/stats/Piechart";

function Profitchart() {
    const businessUnits = [
    {
      id: 1,
      customer: "Finance",
      created: "10/10/2025",
      total: "$9,095",
      profit: "$1,254",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Finance",
      created: "10/10/2025",
      total: "$9,095",
      profit: "$1,254",
      status: "Rejected",
    },
    {
      id: 3,
      customer: "Finance",
      created: "10/10/2025",
      total: "$9,095",
      profit: "$1,254",
      status: "Confirmed",
    },
  ];
  return (
    <>
      {/* Performance Charts Section */}
      <section className="dashboard-charts-section">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="dashboard-card">
                <div className="card-header-custom">
                  <h3 className="card-title">Revenue Trends</h3>
                  <p className="card-subtitle">Monthly performance analysis</p>
                </div>
                <div className="card-body-custom">
                  <LineChart />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="dashboard-card">
                <div className="card-header-custom">
                  <h3 className="card-title">Inflation Analysis</h3>
                  <p className="card-subtitle">Yearly inflation rates</p>
                </div>
                <div className="card-body-custom">
                  <ApexChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="dashboard-metrics-section">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="dashboard-card performance-card">
                <div className="card-body-custom">
                  <div className="performance-header">
                    <div>
                      <h3 className="fs-16">Best Seller Of The Month</h3>
                      <h3 className="fs-16 text-primary">Michael Marquez!</h3>
                      <h2 className="lh-1 fs-20">$3.5K<span className="fs-16 text-body">(Sales)</span></h2>
                    </div>
                    <div className="performance-icon">
                      <img src="./assets/images/Dashboard/male.png" alt="Best Seller"/>
                    </div>
                  </div>
                  <a href="#" className="btn btn-outline-primary btn-sm">View Details</a>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="dashboard-card">
                <div className="card-header-custom">
                  <h3 className="card-title">New Customers</h3>
                  <p className="card-subtitle">This month's growth</p>
                </div>
                <div className="card-body-custom">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h2 className="display-4 fw-bold text-success mb-0">2,537</h2>
                      <p className="text-muted mb-0">New customers joined</p>
                    </div>
                    <div className="trend-badge">
                      <span className="badge bg-success-subtle text-success fs-7">
                        <i className="bi bi-arrow-up me-1"></i>2.75%
                      </span>
                    </div>
                  </div>
                  
                  <div className="customer-avatars mt-4">
                    <span className="fs-16 text-body d-block mb-3">Recent Joiners</span>
                    <div className="d-flex">
                      {[...Array(5)].map((_, i) => (
                        <img 
                          key={i}
                          src="assets/images/Dashboard/adil.png" 
                          className="customer-avatar image-fluid rounded-5" 
                          alt={`user${i + 12}`}
                        />
                      ))}
                      <div className="customer-count">
                        <span className="text-white fs-16 fw-medium">+27</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Orders Table */}
      <section className="dashboard-table-section">
        <div className="container-fluid">
          <div className="dashboard-card">
            <div className="card-header-custom">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="card-title mb-0">Recent Orders</h3>
                </div>
                <div className="d-flex gap-3">
                  <div className="dropdown">
                    <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      Show All
                    </button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Shipped</a></li>
                      <li><a className="dropdown-item" href="#">Confirmed</a></li>
                      <li><a className="dropdown-item" href="#">Pending</a></li>
                      <li><a className="dropdown-item" href="#">Rejected</a></li>
                    </ul>
                  </div>
                  <div className="search-box">
                    <i className="bi bi-search"></i>
                    <input type="search" className="form-control" placeholder="Search orders..."/>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card-body-custom p-0">
              <div className="table-responsive">
                <table className="table table-custom">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Created</th>
                      <th>Total</th>
                      <th>Profit</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessUnits.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <span className="order-id">#{item.id.toString().padStart(4, '0')}</span>
                        </td>
                        <td>
                          <div className="customer-info">
                            <img src="assets/images/Dashboard/adil.png" className="customer-avatar-sm image-fluid rounded-5" alt="customer"/>
                            <span>Adil Khan</span>
                          </div>
                        </td>
                        <td>{item.created}</td>
                        <td className="fw-bold text-primary">{item.total}</td>
                        <td className="fw-bold text-success">{item.profit}</td>
                        <td>
                          <span className={`status-badge status-${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn btn-sm btn-light">
                              <i className="bi bi-eye text-primary"></i>
                            </button>
                            <button className="btn btn-sm btn-light">
                              <i className="bi bi-trash3 text-danger"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Summary Section */}
      <section className="dashboard-summary-section">
        <div className="container-fluid">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="dashboard-card">
                <div className="card-header-custom">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3 className="card-title mb-0">Order Summary</h3>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        This Day
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">This Day</a></li>
                        <li><a className="dropdown-item" href="#">This Week</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body-custom">
                  <div className="summary-stats">
                    <div className="stat-item">
                      <span className="stat-label">Completed</span>
                      <span className="stat-value">60%</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">New Orders</span>
                      <span className="stat-value">30%</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Pending</span>
                      <span className="stat-value">10%</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <Piechart />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="dashboard-card">
                <div className="card-header-custom">
                  <h3 className="card-title mb-0">Top Sellers</h3>
                </div>
                <div className="card-body-custom">
                  <div className="sellers-list">
                    <div className="seller-item">
                      <div className="seller-rank">1</div>
                      <div className="seller-info">
                        <h5>Michael Marquez</h5>
                        <p className="text-muted mb-0">357 sales • $12.4K</p>
                      </div>
                      <div className="trend-badge">
                        <span className="badge bg-success-subtle text-success">
                          <i className="bi bi-arrow-up"></i> 12%
                        </span>
                      </div>
                    </div>
                    <div className="seller-item">
                      <div className="seller-rank">2</div>
                      <div className="seller-info">
                        <h5>Sarah Johnson</h5>
                        <p className="text-muted mb-0">289 sales • $9.8K</p>
                      </div>
                      <div className="trend-badge">
                        <span className="badge bg-success-subtle text-success">
                          <i className="bi bi-arrow-up"></i> 8%
                        </span>
                      </div>
                    </div>
                    <div className="seller-item">
                      <div className="seller-rank">3</div>
                      <div className="seller-info">
                        <h5>Robert Chen</h5>
                        <p className="text-muted mb-0">245 sales • $8.2K</p>
                      </div>
                      <div className="trend-badge">
                        <span className="badge bg-warning-subtle text-warning">
                          <i className="bi bi-arrow-down"></i> 3%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profitchart;