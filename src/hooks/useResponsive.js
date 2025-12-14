import { useEffect, useState } from "react";

// Tailwind default breakpoints in pixels
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export default function useResponsive(direction = "down", breakpoint = "md") {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    if (!breakpoints[breakpoint]) {
      console.warn(`Invalid breakpoint: ${breakpoint}`);
      return;
    }

    const width = breakpoints[breakpoint];
    const query =
      direction === "up"
        ? `(min-width: ${width}px)`
        : `(max-width: ${width - 0.02}px)`; // subtract a little to avoid overlap

    const mediaQuery = window.matchMedia(query);

    const handleChange = () => setIsMatch(mediaQuery.matches);
    handleChange();

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [direction, breakpoint]);

  return isMatch;
}
