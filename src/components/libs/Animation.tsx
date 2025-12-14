"use client";
import { useEffect, useRef, useState } from "react";

export default function Animation(props: AnimationProps) {
  const {
    children,
    threshold = 0.3,
    root = null,
    rootMargin = "0px",
    triggerOnce = true,
    className = "",
    inViewClass = "opacity-100 translate-y-0",
    outViewClass = "opacity-0 translate-y-10",
    transitionClass = "transition-all duration-700 ease-out",
    animationDelay = 0,
    onInViewChange,
  } = props;

  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    let modifiedThreshold = threshold;
    if (threshold > 1) {
      modifiedThreshold = 1;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          onInViewChange?.();
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { root, rootMargin, threshold: modifiedThreshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin, triggerOnce]);

  return (
    <div
      ref={ref}
      className={`${className} ${transitionClass} animate-delay-${animationDelay} ${
        inView ? inViewClass : outViewClass
      }`}
    >
      {children}
    </div>
  );
}
