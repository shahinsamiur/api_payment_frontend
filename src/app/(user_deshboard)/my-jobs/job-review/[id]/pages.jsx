import SubmissionContent from "@/components/my-jobs/job-review/submission/SubmissionContent";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return <SubmissionContent id={id} />;
};

export default page;
