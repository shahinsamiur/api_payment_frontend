import Image from "next/image";
import Animation from "../libs/Animation";
import Typography from "../libs/Typography";
import NewsLetterForm from "./NewsLetterForm";

export default function NewsLetter() {
  return (
    <div data-testid="home-page-newsletter-section" className="space-y-7">
      <div>
        <Animation
          inViewClass="opacity-100 translate-x-0"
          outViewClass="opacity-0 -translate-x-10"
        >
          <Typography variant="h3" align="center" color="primary">
            Stay Ahead of the Game
          </Typography>
        </Animation>
        <Animation
          inViewClass="opacity-100 translate-y-0"
          outViewClass="opacity-0 translate-y-10"
          animationDelay={2}
        >
          <Typography variant="body2" align="center" className="mt-1">
            Get exclusive access to premium job opportunities, industry
            insights, success <br className="hidden md:block" /> stories, and
            expert tips delivered straight to your inbox. Join our community of{" "}
            <br className="hidden md:block" /> 50,000+ successful freelancers.
          </Typography>
        </Animation>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 w-full">
        <NewsLetterForm />

        {/* Avatar Display */}
        <Animation
          inViewClass="opacity-100 translate-y-0"
          outViewClass="opacity-0 translate-y-10"
          animationDelay={4}
          className="flex items-center justify-center mt-2"
        >
          <div className="flex items-center justify-center w-[20%] lg:w-[30%]">
            <Image
              alt="user"
              src="/profile.jpg"
              className={`rounded-full relative size-[2rem] lg:size-[3rem] `}
              width={50}
              height={50}
            />
            <Image
              alt="user"
              src="/profile5.jpg"
              className={`rounded-full relative size-[2rem] lg:size-[3rem] -left-[10px] lg:-left-[15px]`}
              width={50}
              height={50}
            />
            <Image
              alt="user"
              src="/profile2.jpg"
              className={`rounded-full relative size-[2rem] lg:size-[3rem] -left-[20px] lg:-left-[30px]`}
              width={50}
              height={50}
            />
            <Image
              alt="user"
              src="/profile3.jpg"
              className={`rounded-full relative size-[2rem] lg:size-[3rem] -left-[30px] lg:-left-[45px]`}
              width={50}
              height={50}
            />
          </div>
          <Typography variant="body2" align="center" className="font-medium">
            4,000+ already subscribed
          </Typography>
        </Animation>
      </div>
    </div>
  );
}
