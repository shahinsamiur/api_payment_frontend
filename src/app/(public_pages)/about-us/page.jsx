import Statistic from "@/components/aboutUs/Statistic";
import Typography from "@/components/libs/Typography";
import Image from "next/image";

function AboutUs() {
  return (
    <div>
      <div className="h-[400px] md:h-[500px] xl:h-[600px] w-full bg-[url('/about-image.png')] bg-center bg-cover bg-no-repeat relative">
        <div className="absolute inset-0 bg-[#6E6D6D80] flex flex-col justify-center">
          <div className="px-4 flex flex-col justify-center items-center space-y-3 ">
            <Typography variant="h4" color="white">
              It’s All Start With “We”
            </Typography>
            <Typography
              variant="h1"
              color="white"
              className="text-5xl xl:text-8xl font-bold"
            >
              About Us
            </Typography>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-3">
        <div className="lg:grid grid-cols-5 gap-5 md:gap-10 py-10 space-y-5">
          <Statistic />
          <div className="col-span-3 space-y-3">
            <Typography variant="h2" align="center">
              Your Satisfaction is Our Commitment
            </Typography>
            <Typography variant="body1" align="justify">
              Work dear is a crowdsource service with to more than 900,000+
              Workers. Work dear is a freelancing, outsourcing and crowdsourcing
              marketplace. We connect clients and freelancers globally from all
              over the World. Through our marketplace, clients can hire
              freelancers to do work in areas such as promoting on social
              networks, writing, testing websites, data entry
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 pt-5 lg:pt-10 pb-10 lg:pb-20">
          <div className="space-y-3">
            <Typography variant="h2">Ask People To Help You</Typography>
            <Typography variant="body1" align="justify">
              This is how Small Gigs are great work! They are easy to do and
              require little time to finish. There are jobs like take a survey,
              categorize images, help promote content and many others. Get
              credited immediately after task is reviewed and dont wait a month
              or more for a pay out. Our team helps individuals, small
              businesses and professionals to create low cost publicity and
              marketing campaigns to increase sales, ranking, backlinks and much
              more..
            </Typography>
          </div>
          <div>
            <Image
              src="/about-image-2.png"
              alt="about image"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
