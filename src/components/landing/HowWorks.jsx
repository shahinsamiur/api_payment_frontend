import Image from "next/image";
import React from "react";
import { FaCheck } from "react-icons/fa";
import Animation from "../libs/Animation";
import Card from "../libs/Card";
import Typography from "../libs/Typography";

const HowWorks = () => {
  const data = [
    {
      id: 1,
      step: "STEP 1",
      title: "Sign Up & Verify",
      description:
        "Create your account and complete verification to ensure a trusted community for everyone.",
    },
    {
      id: 2,
      step: "STEP 2",
      title: "Find or Post Jobs",
      description:
        "Browse available projects or post your job requirements. Connect with the right talent instantly.",
    },
    {
      id: 3,
      step: "STEP 3",
      title: "Earn & Withdraw Securely",
      description:
        "Complete projects, receive payments, and withdraw your earnings safely through our secure platform.",
    },
  ];

  return (
    <Card data-testid="home-page-how-works-section" className="!py-14">
      <div className="text-center mb-10">
        <Animation
          inViewClass="opacity-100 translate-y-0"
          outViewClass="opacity-0 translate-y-10"
        >
          <Typography variant="h3" align="center" color="primary">
            How It Works
          </Typography>
        </Animation>
        <Typography variant="body2" align="center" className="mt-2">
          Start earning or hire talent in three simple steps
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Image */}
        <Image
          src="/banner-2.jpg"
          alt="how it works"
          width={500}
          height={500}
          className="object-cover h-96 mx-auto rounded-md"
        />

        {/* Right Steps */}
        <div className="relative space-y-10">
          {/* Vertical dotted line */}
          <div className="absolute left-5 top-0 h-full border-l-2 border-dotted border-success/30" />

          {data.map((item, index) => (
            <Animation
              key={item.id}
              inViewClass="opacity-100 translate-y-0"
              outViewClass="opacity-0 translate-y-10"
              animationDelay={index * 0.2}
            >
              <div className="relative pl-12">
                {/* Check icon */}
                <div className="absolute left-1 top-0 bg-success text-white size-8 flex items-center justify-center rounded-full">
                  <FaCheck size={18} />
                </div>

                <Typography
                  variant="body2"
                  color="gray"
                  className="uppercase font-medium"
                >
                  {item.step}
                </Typography>

                <Typography
                  variant="body1"
                  color="primary"
                  className="font-bold mb-1"
                >
                  {item.title}
                </Typography>

                <Typography variant="body2" color="gray">
                  {item.description}
                </Typography>
              </div>
            </Animation>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default HowWorks;
