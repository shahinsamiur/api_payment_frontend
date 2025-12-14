"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useRef } from "react";

function TestimonialSliders({ children }) {
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  return (
    <div className="py-[2rem] overflow-hidden" ref={emblaRef}>
      {children}
    </div>
  );
}

export default TestimonialSliders;
