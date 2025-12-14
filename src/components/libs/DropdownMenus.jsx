"use client";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "./Button";

export default function DropdownMenus({
  placeholder = "Select",
  selected,
  setSelected,
  options,
  className = "",
  disabled = false,
  error = false,
  size = "md",
}) {
  const [showList, setShowList] = useState(false);
  const [label, setLabel] = useState(placeholder);

  const toggleList = () => setShowList((prev) => !prev);
  const listItemRef = useOutsideClick(() => setShowList(false));

  useEffect(() => {
    if (selected) {
      const selectedOption = options.find(
        (option) => option.value === selected
      );
      if (selectedOption) {
        setLabel(selectedOption.label);
      } else {
        setLabel(placeholder);
      }
    }
  }, [selected]);

  return (
    <div ref={listItemRef} className={`relative ${className}`}>
      <Button
        type="button"
        variant="outline"
        size={size}
        className={`w-full !justify-between !font-normal !px-4 ${
          // error
          //   ? "!border-error !text-error"
          //   :
          label !== placeholder
            ? "!border-border !text-black dark:!text-white"
            : "!border-border !text-gray-500 dark:!text-gray-400"
        }`}
        onClick={toggleList}
        borderBottom={!showList}
        disabled={disabled}
      >
        {label}
        {!showList ? (
          <FaChevronDown />
        ) : (
          <FaChevronDown className="rotate-180 transition-all" />
        )}
      </Button>

      {showList && (
        <div className="absolute top-full overflow-hidden w-full bg-card border border-border border-t-0 shadow-lg divide-y divide-border rounded-b-md md:rounded-b-lg 2xl:rounded-b-xl z-50 overflow-y-auto max-h-48">
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              role="menuitem"
              onClick={() => {
                setSelected(option.value);
                setLabel(option.label);
                setShowList(false);
              }}
              className={`w-full p-2 text-nowrap text-left transition-all ${
                selected === option.value
                  ? "bg-gray-300 dark:bg-border/60 dark:text-white"
                  : "hover:bg-gray-200 dark:hover:bg-border dark:text-white"
              } `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
