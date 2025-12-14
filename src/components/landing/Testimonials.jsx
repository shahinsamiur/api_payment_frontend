import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa";
import Animation from "../libs/Animation";
import Button from "../libs/Button";
import Card from "../libs/Card";
import Ratings from "../libs/Ratings";
import Typography from "../libs/Typography";
import TestimonialSliders from "./TestimonialSliders";

export default function Testimonials() {
  const userVoices = [
    {
      name: "Sarah Johnson",
      title: "Graphic Designer",
      quote:
        "WorkDear has completely transformed my freelancing career. I've landed over 50 projects and built lasting relationships with amazing clients. The platform's security and payment protection give me peace of mind.",
      image: "/profile.jpg",
      tag: "Verified Freelancer",
      role: "freelancer",
      earn: 45000,
      success: null,
      job_post: null,
      paid: null,
      rating: 4.8,
    },
    {
      name: "Mike Chen",
      title: "Web Developer",
      quote:
        "The quality of projects on WorkDear is outstanding. I've found clients who truly value my expertise and are willing to pay premium rates. It's not just about quantity, it's about quality partnerships",
      image: "/profile1.jpg",
      tag: "Top Rated",
      role: "freelancer",
      earn: null,
      success: 98,
      job_post: null,
      paid: null,
      rating: 4.8,
    },
    {
      name: "Sara Malik",
      title: "Content Writer",
      quote:
        "As a client, finding the right talent was always a challenge until I discovered WorkDear. The platform's vetting process ensures I work with skilled professionals who deliver exceptional results every time.",
      image: "/profile3.jpg",
      tag: "Premium Client",
      role: "client",
      earn: null,
      success: null,
      job_post: 200,
      paid: null,
      rating: 4.8,
    },
    {
      name: "Emma Watson",
      title: "Digital Marketer",
      quote:
        "The quality of projects on WorkDear is outstanding. I've found clients who truly value my expertise and are willing to pay premium rates. It's not just about quantity, it's about quality partnerships.",
      image: "/profile4.jpg",
      tag: "Verified Client",
      role: "client",
      earn: null,
      success: null,
      job_post: null,
      paid: 12000,
      rating: 4.8,
    },
  ];
  return (
    <div data-testid="home-page-testimonials-section" className="space-y-5">
      <div>
        <Animation
          inViewClass="opacity-100 translate-x-0"
          outViewClass="opacity-0 -translate-x-10"
        >
          <Typography align="center" variant="h3" color="primary">
            What Our Community Says
          </Typography>
        </Animation>
        <Animation
          inViewClass="opacity-100 translate-y-0"
          outViewClass="opacity-0 translate-y-10"
          animationDelay={2}
        >
          <Typography align="center" variant="body2" className="mt-1">
            Join thousands of satisfied freelancers and clients
            <br className="hidden md:block" /> who've found success on our
            platform
          </Typography>
        </Animation>
      </div>

      <TestimonialSliders>
        <div className="flex">
          {userVoices.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full lg:w-[50%] xl:w-[33.3333%]"
            >
              <Card className="h-full lg:mr-3 hover:-translate-y-2 transition-all duration-300">
                <div className="flex flex-col justify-between gap-1 h-full">
                  <div className="flex items-center gap-3 flex-wrap">
                    <Image
                      src={item.image}
                      alt="user profile"
                      width={64}
                      height={64}
                      className="object-cover size-[4rem] rounded-full border-primary-dark border-4"
                    />
                    <div>
                      <Typography variant="body2" className="font-medium">
                        {item.name}
                      </Typography>
                      <Typography variant="caption" className="font-medium">
                        {item.title}
                      </Typography>
                    </div>
                    <div className="flex justify-end grow">
                      <Ratings rating={item.rating} />
                    </div>
                  </div>

                  {/* Quote Text */}
                  <Typography variant="body2" className="my-4">
                    {item.quote}
                  </Typography>

                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <Button variant="outline">
                      <FaCheck />
                      {item.tag}
                    </Button>
                    <Typography
                      variant="body2"
                      color="primary"
                      className="font-medium"
                    >
                      {item.earn
                        ? `Earned $${item.earn}+`
                        : item.success
                        ? `${item.success}% Success Rate`
                        : item.paid
                        ? `Paid $${item.paid}+`
                        : item.job_post
                        ? `${item.job_post} Jobs Posted`
                        : null}
                    </Typography>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </TestimonialSliders>
    </div>
  );
}
