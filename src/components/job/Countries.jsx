import Button from "@/components/libs/Button";
import { setJobPostFinalForm } from "@/store/slices/jobform";
import { useDispatch, useSelector } from "react-redux";

export default function Countries({ contries }) {
  const { jobPostFinalForm } = useSelector((state) => state.jobForm);
  const dispatch = useDispatch();

  function handleSelectOrUnselect(id) {
    if (!id) return;

    if (jobPostFinalForm.country_ids.includes(id)) {
      dispatch(
        setJobPostFinalForm({
          ...jobPostFinalForm,
          country_ids: jobPostFinalForm.country_ids.filter(
            (item) => item !== id
          ),
        })
      );
    } else {
      dispatch(
        setJobPostFinalForm({
          ...jobPostFinalForm,
          country_ids: [...jobPostFinalForm.country_ids, id],
        })
      );
    }
  }

  const containerClass =
    "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-gray-100/50 dark:bg-border/20 border px-5 py-7 border-border rounded-xl";

  return (
    <div className={containerClass}>
      {contries.map((label, index) => (
        <Button
          className="justify-center"
          key={index}
          variant={
            !jobPostFinalForm.country_ids?.includes(label.id)
              ? "contain"
              : "outline"
          }
          onClick={() => handleSelectOrUnselect(label.id)}
        >
          {label.country_name}
        </Button>
      ))}
    </div>
  );
}
