import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import IconButton from "./IconButton";
import Typography from "./Typography";

function Modal({ open, setOpen, title = "", children, className }) {
  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 bg-opacity-50 px-3 "
    >
      <div
        className={`bg-card rounded-lg shadow-md dark:shadow-gray-100/10 max-w-5xl max-h-3/4 overflow-y-auto relative animate-modal ${className}`}
      >
        <div className="sticky top-0 flex justify-between items-center bg-card px-4 pt-2 z-10">
          <Typography variant="h5">{title}</Typography>
          <IconButton
            onClick={() => setOpen(false)}
            className="bg-transparent hover:!bg-border"
          >
            <IoClose />
          </IconButton>
        </div>
        <div className="dark:text-white p-3 md:p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
