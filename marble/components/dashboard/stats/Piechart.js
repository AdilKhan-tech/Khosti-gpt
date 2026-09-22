"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Piechart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById("chartjs-doughnut");

    const existingChart = Chart.getChart("chartjs-doughnut");
    if (existingChart) existingChart.destroy();

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "New Order", "Pending"],
        datasets: [
          { 
            data: [60, 30, 10],
            backgroundColor: ["#007bff", "#28a745", "#dc3545"],
            borderWidth: 0 
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Hide default legend
          }
        }
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, []);

  return (
    <div style={{ width: "250px", height: "250px" }}>
      <canvas id="chartjs-doughnut"></canvas>
      {/* Custom HTML Legend */}
      <div className="d-flex justify-content-center gap-5 mt-5">
        {["Completed", "Order", "Pending"].map((label, index) => {
          const colors = ["#007bff", "#28a745", "#dc3545"];
          return (
            <div key={label} className="d-flex align-items-center gap-2">
              <div 
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: colors[index],
                  borderRadius: "2px"
                }}
              />
              <span className="text-dark fs-14">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}