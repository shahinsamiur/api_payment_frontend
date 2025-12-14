import JobsItem from "@/components/jobs/JobsItem";
import Animation from "@/components/libs/Animation";
import { config } from "@/config";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Button from "../libs/Button";
import Typography from "../libs/Typography";

export default async function RecentActivity({ siteName }) {
  const res = await fetch(`${config.apiBaseUrl}/home/jobs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const jobs = data?.data;

  return (
    <div
      data-testid="home-page-recent-activity-section"
      className="relative min-h-64 bg-card"
    >
      <div className="container mx-auto px-5 py-3 lg:py-10 h-full">
        <Animation
          inViewClass="opacity-100 translate-y-0"
          outViewClass="opacity-0 -translate-y-10"
        >
          <Typography variant="body2" className="font-medium">
            {siteName}
          </Typography>
        </Animation>

        <Animation
          inViewClass="opacity-100 translate-x-0"
          outViewClass="opacity-0 -translate-x-10"
        >
          <Typography variant="h3" className="mb-5 mt-2" color="primary">
            Recent Activity
          </Typography>
        </Animation>

        <div className="space-y-5 h-full">
          {jobs && jobs?.length ? (
            jobs.map((data, index) => (
              <Animation
                key={index}
                inViewClass="opacity-100 translate-y-0"
                outViewClass="opacity-0 translate-y-10"
                animationDelay={index}
              >
                <JobsItem data={data} />
              </Animation>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <Typography variant="caption">
                There is no recent activity
              </Typography>
            </div>
          )}

          {jobs?.length > 5 && (
            <div className="flex justify-center items-center">
              <Animation
                inViewClass="opacity-100 translate-x-0"
                outViewClass="opacity-0 translate-x-10"
              >
                <Link href="/jobs">
                  <Button variant="contain">
                    Explore more jobs
                    <FaArrowRight size={14} />
                  </Button>
                </Link>
              </Animation>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
