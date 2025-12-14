"use client";
import { config } from "@/config";
import {
  setIsUpdate,
  setJobId,
  setJobPostFinalForm,
  setJobPostFirstForm,
} from "@/store/slices/jobform";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Typography from "../libs/Typography";
import JobForm from "./JobForm";

function UpdateJob({ data }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.data) {
      const firstForm = {
        title: data.data.title,
        description: data.data.description,
        steps: data.data.steps,
        required_proofs:
          data.data.required_proofs ||
          JSON.stringify([{ type: "", description: "" }]),
        question_condition:
          data.data.question_condition ||
          JSON.stringify([
            {
              id: 1,
              answer_type: "",
              text: "",
              condition: {
                operator: "",
                value: "",
              },
            },
          ]),
        thumbnail_url: data.data.thumbnail_url,
      };
      const finalForm = {
        status: data.data.status,
        total_workers_required: data.data.total_workers_required,
        pay_per_task: data.data.pay_per_task,
        require_screenshots: data.data.require_screenshots,
        estimated_day: data.data.estimated_day,
        job_category_id: data.data.job_sub_category.parent_category.id,
        job_sub_category_id: data.data.job_sub_category_id,
        country_ids: data.data.countries.map((country) => country.id),
      };
      dispatch(setJobPostFinalForm(finalForm));
      dispatch(setJobPostFirstForm(firstForm));
      dispatch(setIsUpdate(true));
      dispatch(setJobId(data.data.id));
    }
  }, [data]);

  if (!data?.data) {
    return (
      <div>
        <Typography align="center">Something went wrong</Typography>
      </div>
    );
  }

  return <JobForm thumbnail={config.fileBaseUrl + data.data.thumbnail_url} />;
}

export default UpdateJob;
