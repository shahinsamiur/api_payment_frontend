"use client";
import "../../css/animations.css";
export default function Drawer({
  open,
  onClose,
  title,
  children,
  className = "",
}) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40  transition-opacity duration-300 ease-out z-40  ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`
    fixed top-0 right-0 h-full bg-card shadow-2xl z-50 pt-20
    w-full max-w-md 
    ${open ? "animate-drawer-in" : "animate-drawer-out"}
    ${className}
  `}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg dark:text-white font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-xl hover:text-primary transition dark:text-white"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          {children}
        </div>
      </div>
    </>
  );
}
