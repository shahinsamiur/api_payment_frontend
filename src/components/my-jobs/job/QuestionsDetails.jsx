import { selectOptions } from "@/_mock/selectOptions";
import Card from "@/components/libs/Card";
import Typography from "@/components/libs/Typography";

const QuestionsDetails = ({ data, isProvider }) => (
  <Card>
    <Typography variant="h4" className="mb-4">
      Questions
    </Typography>

    {data.question_condition ? (
      <>
        {JSON.parse(data.question_condition || "[]").map((q, index) => (
          <div key={index} className="mb-3">
            <Typography variant="body2" className="font-medium">
              Q {index + 1}. {q.text}
            </Typography>
            {isProvider && (
              <div className="bg-border rounded p-3 ">
                <Typography variant="body2">
                  Answer type:{" "}
                  <span className="text-primary-main capitalize">
                    {q.answer_type}
                  </span>
                </Typography>
                <Typography variant="body2">
                  Condition:{" "}
                  <span className="text-primary-main capitalize">
                    {
                      selectOptions.job.question_condition_operator.find(
                        (opt) => opt.value === q.condition.operator
                      )?.label
                    }
                  </span>
                </Typography>
                <Typography variant="body2">
                  Answer:{" "}
                  <span className="text-primary-main capitalize">
                    {q.condition.value}
                  </span>
                </Typography>
              </div>
            )}
          </div>
        ))}
      </>
    ) : (
      <Typography variant="caption" align="center">
        There are no questions
      </Typography>
    )}
  </Card>
);

export default QuestionsDetails;
