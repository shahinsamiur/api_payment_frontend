import Instructions from "./Instructions";
import JobHeader from "./JobHeader";
import JobPerformance from "./JobPerformance";
import JobStatus from "./JobStatus";
import ProviderInfo from "./ProviderInfo";
import QuestionsDetails from "./QuestionsDetails";
import RequiredProofs from "./RequiredProofs";
import TimeLine from "./TimeLine";

const SingleJobPresenter = ({ data, isProvider = false }) => {
  return (
    <div>
      <JobHeader data={data} isProvider={isProvider} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <Instructions steps={JSON.parse(data.steps)} />
          <QuestionsDetails data={data} isProvider={isProvider} />
          {isProvider ? (
            <JobPerformance
              impressions={data.impression_count}
              clicks={data.click_count}
            />
          ) : (
            <ProviderInfo provider={data.provider} />
          )}
        </div>

        <div className="space-y-6">
          <TimeLine
            end_date={data.end_date}
            start_date={data.start_date}
            submitted_at={data.created_at}
          />
          <RequiredProofs requiredProofs={JSON.parse(data.required_proofs)} />
          {isProvider && <JobStatus job={data} />}
        </div>
      </div>
    </div>
  );
};

export default SingleJobPresenter;
