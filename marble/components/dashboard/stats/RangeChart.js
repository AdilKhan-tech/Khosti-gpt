"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RangeAreaChart({ orders = [] }) {
  const monthNames = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index), 1);
    return date.toLocaleDateString("en-US", { month: "short" });
  });

  const monthlyTotals = monthNames.map((month, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index), 1);
    const year = date.getFullYear();
    const monthNumber = date.getMonth();
    const monthOrders = orders.filter((order) => {
      const createdAt = new Date(order.created_at);
      return (
        createdAt.getFullYear() === year && createdAt.getMonth() === monthNumber
      );
    });
    const total = monthOrders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0,
    );
    return { month, total, count: monthOrders.length };
  });

  const maxTotal = Math.max(...monthlyTotals.map((item) => item.total), 1);
  const series = [
    {
      type: "rangeArea",
      name: "Sales Range",
      data: monthlyTotals.map((item) => ({
        x: item.month,
        y: [0, item.total],
      })),
    },
    {
      type: "line",
      name: "Orders",
      data: monthlyTotals.map((item) => ({ x: item.month, y: item.count })),
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "rangeArea",
      animations: { speed: 500 },
      toolbar: { show: false },
    },
    colors: ["#36bac7", "#25313c"],
    dataLabels: { enabled: false },
    fill: { opacity: [0.24, 1] },
    stroke: { curve: "straight", width: [0, 2] },
    legend: { show: true },
    yaxis: { min: 0, max: Math.ceil(maxTotal * 1.15) },
    noData: { text: "No order data yet" },
    markers: { hover: { sizeOffset: 5 } },
  };

  return (
    <Chart options={options} series={series} type="rangeArea" height={350} />
  );
}
