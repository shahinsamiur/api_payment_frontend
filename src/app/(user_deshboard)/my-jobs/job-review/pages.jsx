import Typography from "@/components/libs/Typography";
import MyJobTasksPresenter from "@/components/my-jobs/job-review/MyJobTasksPresenter";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<Typography>Loading...</Typography>}>
      <MyJobTasksPresenter />
    </Suspense>
  );
}

export default Page;
