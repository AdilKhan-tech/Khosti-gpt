"use client";
import React, { useEffect, useRef, useState } from "react";

export default function MultiSelectDropdown({
  label,
  items = [],
  selectedIds = [],
  setSelectedIds,
  placeholder = "Select",
  width = 470,
}) {
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.id));
    }
  };

  const selectedNames = items
    .filter((i) => selectedIds.includes(i.id))
    .map((i) => i.name_en || i.name);

  return (
    <div className="form-group mt-0 position-relative" ref={wrapperRef}>
      <label className="form-label text-secondary">{label}</label>

      <div
        className="form-control d-flex justify-content-between align-items-center"
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer" }}
      >
        <div className="d-flex flex-wrap gap-1">
          {selectedNames.length ? (
            selectedNames.map((name, index) => (
              <span
                key={index}
                className="px-2 py-1 border rounded small"
              >
                {name}
              </span>
            ))
          ) : (
            placeholder
          )}
        </div>
        <i className={`bi bi-chevron-${open ? "up" : "down"}`} />
      </div>

      {open && (
        <div
          className="border bg-white p-2 position-absolute mt-1 rounded-3"
          style={{ width : "325px", zIndex: 2000 }}
        >
          <div className="form-check border-bottom pb-1">
            <input
              type="checkbox"
              checked={selectedIds.length === items.length}
              onChange={toggleAll}
            />
            <label className="ps-2 fs-14 fw-bold">Select All</label>
          </div>

          {items.map((item) => (
            <div key={item.id} className="form-check py-1">
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => toggleItem(item.id)}
              />
              <label className="ps-2 fs-14">
                {item.name_en || item.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
