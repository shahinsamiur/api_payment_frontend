import SingleJobPresenter from "@/components/my-jobs/job/SingleJobPresenter";
import { getJob } from "@/services/job/getJob";
import React from "react";

const Page = async ({ params }) => {
  const { id } = await params;
  const job = await getJob(id);
  const data = job?.data;
  return <SingleJobPresenter data={data} isProvider={true} />;
};

export default Page;
