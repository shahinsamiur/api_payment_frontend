import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Switch = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 ${
        enabled ? "bg-primary-darker/90" : "bg-gray-300"
      }`}
    >
      <p
        className={`absolute left-0 size-7 flex justify-center items-center transform rounded-full text-white transition-transform duration-300 ${
          enabled ? "translate-x-4 bg-primary-darker" : "translate-x-0 bg-black"
        }`}
      >
        {!enabled ? (
          <MdOutlineLightMode className="text-lg" />
        ) : (
          <MdDarkMode className="text-lg" />
        )}
      </p>
    </button>
  );
};

export default Switch;
