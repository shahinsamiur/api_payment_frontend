import HeaderParts from "./HeaderParts";
import JoSubmission from "./JoSubmission";
import WarninText from "./WarninText";
import WorkDetails from "./WorkDetails";

function JobDetailsAndSubmission({ data, jobId }) {
  return (
    <div>
      <HeaderParts data={data?.data} />
      <WarninText />
      <div className="space-y-4 lg:space-y-8">
        <WorkDetails data={data?.data} />
        <JoSubmission data={data} jobId={jobId} />
      </div>
    </div>
  );
}

export default JobDetailsAndSubmission;
