import Image from "next/image";
import { IoClose } from "react-icons/io5";

export default function ImagePreview({ image, onRemove, isUploading }) {
  return (
    <div className="flex items-center justify-center relative">
      <Image
        src={URL.createObjectURL(image)}
        alt="image"
        width={100}
        height={60}
        className="object-contain"
      />
      <button
        disabled={isUploading}
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 dark:text-white"
      >
        <IoClose size={18} />
      </button>
      {isUploading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 dark:border-white"></div>
        </div>
      )}
    </div>
  );
}
