import { services } from "@/_mock/icons";
import { BsCheck } from "react-icons/bs";
import Animation from "../libs/Animation";
import Card from "../libs/Card";
import Typography from "../libs/Typography";

export default function Services({ data }) {
  return (
    <div data-testid="home-page-services-section">
      <div className=" flex flex-col justify-center items-end  mb-5">
        <Animation
          inViewClass="opacity-100 translate-x-0"
          outViewClass="opacity-0 translate-x-10"
        >
          <Typography align="right" variant="h3">
            Experience the best
          </Typography>
        </Animation>
        <Animation
          inViewClass="opacity-100 translate-x-0"
          outViewClass="opacity-0 translate-x-10"
          animationDelay={2}
        >
          <Typography align="right" variant="h3">
            Services
          </Typography>
        </Animation>

        <Animation
          inViewClass="opacity-100 translate-y-0"
          outViewClass="opacity-0 translate-y-10"
          animationDelay={4}
        >
          <div className="flex justify-end items-center">
            <div className="size-3 bg-primary-light rounded-full" />
            <div className="w-40 lg:w-48 h-1 bg-primary-light" />
          </div>

          <div className="flex justify-end items-center">
            <div className="size-3 bg-primary-light rounded-full" />
            <div className="w-56 lg:w-72 h-1 bg-primary-light" />
          </div>
        </Animation>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-8 pt-10">
        {data?.map((item, index) => (
          <Animation
            threshold={0.3 * index}
            inViewClass="opacity-100 translate-y-0"
            outViewClass="opacity-0 translate-y-20"
            key={item.id}
          >
            <Card className="transition-all duration-300 hover:-translate-y-2 h-full">
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="flex justify-center bg-primary-dark size-18 rounded-full items-center mb-2">
                    {services[index]}
                  </div>
                </div>

                <div className="text-center">
                  <Typography variant="h4" align="center">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="gray" align="center">
                    {item.description}
                  </Typography>
                </div>

                <div className="divide-y divide-border mt-5">
                  {item.features.map((desc, index) => (
                    <div className="flex items-center gap-2 py-1" key={index}>
                      <BsCheck className="text-primary-dark size-7" />
                      <Typography variant="body2">{desc}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </Animation>
        ))}
      </div>
    </div>
  );
}
