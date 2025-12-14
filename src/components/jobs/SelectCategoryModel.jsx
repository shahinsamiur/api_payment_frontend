"use client";
import Drawer from "../libs/Drawer";
import Button from "../libs/Button";

export default function SelectCategoryDrawer({
  open,
  onClose,
  selected,
  data,
  applyFilter,
}) {
  function handleClear() {
    applyFilter(null);
    onClose();
  }

  function handleFilter(id) {
    applyFilter(id);
    onClose();
  }

  return (
    <Drawer open={open} onClose={onClose} title="Select Category">
      <div className="flex flex-col h-full">
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto space-y-5 p-4 pb-20">
          <div className="grid grid-cols-2 gap-3">
            {data.map((ctg, index) => (
              <Button
                key={index}
                onClick={() => handleFilter(ctg.id)}
                variant={selected === ctg.id ? "contain" : "outline"}
              >
                {ctg.category_name}
              </Button>
            ))}
          </div>
        </div>

        {/* Sticky bottom bar */}
        <div className="sticky bottom-0 bg-card p-4 border-t border-border flex justify-end">
          <Button variant="contain" onClick={handleClear}>
            Reset
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
