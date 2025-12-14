import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobPostFirstForm: {
    title: "",
    description: "",
    steps: JSON.stringify([{ step_number: 1, instruction: "" }]),
    required_proofs: JSON.stringify([{ type: "", description: "" }]),
    question_condition: JSON.stringify([
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
  },
  jobPostFinalForm: {
    status: "PENDING",
    total_workers_required: "",
    pay_per_task: "",
    require_screenshots: "",
    estimated_day: "",
    job_category_id: null,
    job_sub_category_id: null,
    country_ids: [],
  },
};

export const jobForm = createSlice({
  name: "jobForm",
  initialState: {
    jobPostFirstForm: initialState.jobPostFirstForm,
    jobPostFinalForm: initialState.jobPostFinalForm,
    isUpdate: false,
    jobId: null,
  },
  reducers: {
    setJobPostFirstForm: (state, action) => {
      state.jobPostFirstForm = action.payload;
    },
    setJobPostFinalForm: (state, action) => {
      state.jobPostFinalForm = action.payload;
    },
    setClearJobPostFirstForm: (state) => {
      state.jobPostFirstForm = initialState.jobPostFirstForm;
    },
    setClearJobPostFinalForm: (state) => {
      state.jobPostFinalForm = initialState.jobPostFinalForm;
    },
    setIsUpdate: (state, action) => {
      state.isUpdate = action.payload;
    },
    setJobId: (state, action) => {
      state.jobId = action.payload;
    },
  },
});

export const {
  setJobPostFirstForm,
  setJobPostFinalForm,
  setClearJobPostFinalForm,
  setClearJobPostFirstForm,
  setIsUpdate,
  setJobId,
} = jobForm.actions;
