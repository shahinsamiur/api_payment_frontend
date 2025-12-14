"use client";
import { useState } from "react";
import Drawer from "../libs/Drawer";
import Button from "../libs/Button";

export default function SelectCountryDrawer({
  open,
  onClose,
  data,
  applyFilter,
}) {
  const [selected, setSelected] = useState([]);

  function handleSelect(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleApplyFilter() {
    applyFilter(selected);
    onClose();
  }

  function handleClear() {
    setSelected([]);
    applyFilter([]);
    onClose();
  }

  return (
    <Drawer open={open} onClose={onClose} title="Select Location">
      <div className="space-y-5 relative h-full flex flex-col">
        {/* Options */}
        <div className="grid grid-cols-2 gap-3 pb-24">
          {data.map((country, index) => (
            <Button
              key={index}
              onClick={() => handleSelect(country.id)}
              variant={selected.includes(country.id) ? "contain" : "outline"}
            >
              {country.country_name}
            </Button>
          ))}
        </div>

        {/* Sticky Footer */}
        <div
          className="w-full flex items-center justify-end gap-5 
          sticky bottom-0 bg-card py-3 border-t border-border"
        >
          <Button variant="outline" onClick={handleClear}>
            Reset
          </Button>
          <Button variant="contain" onClick={handleApplyFilter}>
            Apply
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
