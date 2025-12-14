"use client";
import IconButton from "@/components/libs/IconButton";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const [isScrollled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isScrollled && (
      <IconButton
        onClick={handleScrollToTop}
        className="fixed bottom-10 right-4"
      >
        <FaArrowUp />
      </IconButton>
    )
  );
};

export default ScrollToTopButton;
