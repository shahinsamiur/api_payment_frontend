import JobDetailsAndSubmission from "@/components/jobs/details/JobDetailsAndSubmission";
import { getJob } from "@/services/job/getJob";
import { generateMetadata } from "@/services/job/jobmetaData";

export { generateMetadata };

export default async function JobPage({ params }) {
  const { id } = await params;
  const job = await getJob(id);
  return <JobDetailsAndSubmission data={job} jobId={job?.data?.id} />;
}
