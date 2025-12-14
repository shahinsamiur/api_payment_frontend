"use client";
import { config } from "@/config";
import { useUpdateAdsClickCountMutation } from "@/store/features/advertisement";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => (
  <div
    className={`absolute hidden md:block top-1/2 left-2 z-10 transform -translate-y-1/2 cursor-pointer text-white bg-black/40 p-2 rounded-full hover:bg-black`}
    onClick={onClick}
  >
    <FaArrowLeft size={20} />
  </div>
);

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    className="absolute hidden md:block top-1/2 right-2 z-10 transform -translate-y-1/2 cursor-pointer text-white bg-black/40 p-2 rounded-full hover:bg-black"
    onClick={onClick}
  >
    <FaArrowRight size={20} />
  </div>
);

export default function Ads() {
  const pathname = usePathname();
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: false }));
  const { advertisement } = useSelector((state) => state.settings);
  const [updateCount] = useUpdateAdsClickCountMutation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (pathname === "/verification") {
    return null;
  }

  async function handleAdClick(adId) {
    try {
      await updateCount(adId).unwrap();
    } catch (error) {
      console.log("error happened when update the ads clicks");
    }
  }

  return (
    <div className="px-3 md:px-5 pt-5 md:pt-2 grow">
      <div
        className="overflow-hidden w-full relative rounded-2xl"
        ref={emblaRef}
      >
        <div className="flex">
          {advertisement?.length ? (
            advertisement?.map((item) => (
              <Link
                key={item.id}
                href={item.target_url}
                className="flex-[0_0_100%] relative"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAdClick(item.id)}
              >
                <Image
                  src={config.fileBaseUrl + item.banner_image}
                  alt="ads banner"
                  width={1920}
                  height={550}
                  className="w-full h-[160px] rounded-t-xl md:rounded-none md:h-[300px] xl:h-[400px] object-cover"
                />
              </Link>
            ))
          ) : (
            <div className="h-[200px] md:h-[300px] xl:h-[400px]"></div>
          )}
        </div>
        {/* Arrows */}
        <PrevArrow onClick={scrollPrev} />
        <NextArrow onClick={scrollNext} />
      </div>
    </div>
  );
}
