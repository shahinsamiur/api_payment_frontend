import { useGetJobsByCategoryQuery } from "@/store/features/jobs";
import { setJobPostFinalForm } from "@/store/slices/jobform";
import { useDispatch, useSelector } from "react-redux";
import LoadingIndicator from "../common/LoadingIndicator";
import Button from "../libs/Button";
import Typography from "../libs/Typography";
import NextAndPrevButton from "./NextAndPrevButton";

export default function SelectCategories({ setSteper }) {
  const { data, isLoading } = useGetJobsByCategoryQuery();
  const dispatch = useDispatch();
  const { jobPostFinalForm } = useSelector((state) => state.jobForm);

  function handleSelectCategory(id) {
    dispatch(setJobPostFinalForm({ ...jobPostFinalForm, job_category_id: id }));
  }
  function handleSelectSubCategory(id, minimum_pay) {
    dispatch(
      setJobPostFinalForm({
        ...jobPostFinalForm,
        job_sub_category_id: id,
        minimum_pay: minimum_pay,
      })
    );
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!data?.data?.length) {
    return (
      <Typography variant="caption" align="center">
        No category available
      </Typography>
    );
  }

  const subCategories = data?.data?.find(
    (item) => item.id === jobPostFinalForm.job_category_id
  )?.sub_categories;

  const containerClass =
    "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-gray-100/50 dark:bg-border/20 border px-5 py-7 border-border rounded-xl";

  return (
    <div className="space-y-7">
      {!jobPostFinalForm.job_category_id ? (
        <Typography
          color="warning"
          align="center"
          variant="body2"
          className="font-semibold"
        >
          **Please select a category to continue.**
        </Typography>
      ) : null}
      <div className="flex justify-center">
        <Button variant="contain">Select category</Button>
      </div>

      <div className={containerClass}>
        {data.data.map((label, index) => (
          <Button
            className="justify-center"
            key={index}
            variant={
              jobPostFinalForm.job_category_id === label.id
                ? "contain"
                : "outline"
            }
            onClick={() => {
              handleSelectCategory(label.id);
            }}
          >
            {label.category_name}
          </Button>
        ))}
      </div>

      {jobPostFinalForm.job_category_id ? (
        <div className="space-y-3">
          <Typography variant="h5">Select Sub category</Typography>
          <div className="flex gap-3 flex-wrap items-center">
            {subCategories?.map((subCategory, index) => (
              <Button
                key={index}
                variant={
                  jobPostFinalForm.job_sub_category_id === subCategory.id
                    ? "contain"
                    : "outline"
                }
                onClick={() =>
                  handleSelectSubCategory(
                    subCategory.id,
                    subCategory.minimum_pay
                  )
                }
              >
                {subCategory.sub_category_name}
              </Button>
            ))}
          </div>
        </div>
      ) : null}

      <NextAndPrevButton
        setSteper={setSteper}
        disabledNext={
          !jobPostFinalForm.job_category_id ||
          !jobPostFinalForm.job_sub_category_id
        }
      />
    </div>
  );
}
