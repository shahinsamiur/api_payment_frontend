"use client";
import JobsItem from "@/components/jobs/JobsItem";
import NoJobsMessage from "@/components/jobs/NoJobsMessage";
import Animation from "@/components/libs/Animation";
import { useJobImpressionAndClickMutation } from "@/store/features/jobs";
import JobSkelaton from "./JobSkelaton";

export default function JobsList({ jobsData, jobsLoading }) {
  const [jobImpressionAndClick] = useJobImpressionAndClickMutation();
  const data = jobsData?.data?.data
    ? Array.isArray(jobsData.data.data)
      ? jobsData.data.data
      : typeof jobsData.data.data === "object"
      ? Object.values(jobsData.data.data)
      : []
    : [];

  async function handleInViewChange(jobId) {
    try {
      await jobImpressionAndClick({ jobId, data: { type: "impression" } });
    } catch (error) {
      console.error("Error recording job impression:", error);
    }
  }

  async function handleJobClick(jobId) {
    try {
      await jobImpressionAndClick({ jobId, data: { type: "click" } });
    } catch (error) {
      console.error("Error recording job click:", error);
    }
  }

  return (
    <div className="space-y-4">
      {jobsLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <JobSkelaton key={index} />
        ))
      ) : data.length ? (
        data.map((item, index) => (
          <Animation
            key={item.id}
            inViewClass="opacity-100 translate-y-0"
            outViewClass="opacity-0 translate-y-10"
            animationDelay={index}
            onInViewChange={() => handleInViewChange(item.id)}
          >
            <JobsItem data={item} onJobClick={() => handleJobClick(item.id)} />
          </Animation>
        ))
      ) : (
        <NoJobsMessage />
      )}
    </div>
  );
}
