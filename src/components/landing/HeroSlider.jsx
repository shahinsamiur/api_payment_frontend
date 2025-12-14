"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Button from "../libs/Button";
import Typography from "../libs/Typography";

function HeroSliders({}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [titleAnimate, setTitleAnimate] = useState("animate-from-bottom");
  const [buttonAnimate, setButtonAnimate] = useState(".animate-from-left");

  const heroData = [
    {
      id: 1,
      title: (
        <>
          Best Microjob & Freelancing Site to
          <br className="hidden md:block" /> Make Money Online
        </>
      ),
      buttonText: "Start earning now",
      image: "/banner-1.png",
    },
    {
      id: 2,
      title: (
        <>
          Turn Your Skills Into Income, Join the Top
          <br className="hidden lg:block" /> Microjob Platform
        </>
      ),
      buttonText: "Start Your First Job",
      image: "/banner-2.jpg",
    },
    {
      id: 3,
      title: (
        <>
          Work Anytime, Anywhere Earn Online
          <br className="hidden md:block" /> with Microjobs
        </>
      ),
      buttonText: "Begin Your Journey",
      image: "/banner-3.jpg",
    },
  ];

  useEffect(() => {
    let timer;
    const interval = setInterval(() => {
      setTitleAnimate("animate-to-up");
      setButtonAnimate("animate-to-up");
      timer = setTimeout(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % heroData.length);
        setTitleAnimate("animate-from-bottom");
        setButtonAnimate("animate-from-left");
      }, 800);
    }, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`h-[400px] md:h-[500px] xl:h-[600px] w-full bg-center bg-cover bg-no-repeat relative`}
      style={{
        backgroundImage: `url(${heroData[currentSlide].image})`,
      }}
    >
      <div className="absolute inset-0 backdrop-blur-sm bg-[#15241d82] flex flex-col justify-center">
        <div className="container mx-auto px-4 ">
          <Typography
            variant="h1"
            color="text"
            className={`${titleAnimate} text-white`}
          >
            {heroData[currentSlide].title}
          </Typography>
          <Link href="/jobs">
            <Button variant="contain" className={`mt-5 ${buttonAnimate}`}>
              <span>{heroData[currentSlide].buttonText}</span>
              <FaArrowRight className="animate-bounce-right" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSliders;
