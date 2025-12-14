import { useEffect, useRef } from "react";

export default function useAutoScroll({ lastElement, dependencies }) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (lastElement.current) {
      if (!hasMounted.current) {
        lastElement.current.scrollIntoView({ behavior: "auto" });
        hasMounted.current = true;
      } else {
        lastElement.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, dependencies);
}
