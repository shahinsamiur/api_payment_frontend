export const selectOptions = {
  job: {
    required_proof_type: [
      { label: "None", value: "" },
      { label: "Text", value: "text" },
      { label: "Number", value: "number" },
      { label: "Image", value: "image" },
    ],
    question_condition_type: [
      { label: "None", value: "" },
      { label: "Text", value: "text" },
      { label: "Number", value: "number" },
    ],
    question_condition_operator: [
      { label: "None", value: "" },
      { label: "Same as", value: "==" },
      { label: "Not same", value: "!=" },
      { label: "Greater than", value: ">" },
      { label: "Less than", value: "<" },
      { label: "Greater than or equal", value: ">=" },
      { label: "Less than or equal", value: "<=" },
    ],

    status_type: [
      {
        id: 1,
        label: "All",
        value: "",
      },
      {
        id: 2,
        label: "DRAFT",
        value: "DRAFT",
      },
      {
        id: 3,
        label: "PENDING",
        value: "PENDING",
      },
      {
        id: 4,
        label: "APPROVED",
        value: "APPROVED",
      },
      {
        id: 5,
        label: "REJECTED",
        value: "REJECTED",
      },
      {
        id: 6,
        label: "COMPLETED",
        value: "COMPLETED",
      },
      {
        id: 7,
        label: "EXPIRED",
        value: "EXPIRED",
      },
      {
        id: 8,
        label: "CLOSED",
        value: "CLOSED",
      },
    ],
  },
  ads: {
    status_type: [
      {
        id: 1,
        label: "All",
        value: "",
      },
      {
        id: 2,
        label: "Active",
        value: "ACTIVE",
      },
      {
        id: 3,
        label: "Inactive",
        value: "INACTIVE",
      },
      {
        id: 4,
        label: "Pending",
        value: "PENDING",
      },
      {
        id: 5,
        label: "Approved",
        value: "APPROVED",
      },
      {
        id: 6,
        label: "Rejected",
        value: "REJECTED",
      },
      {
        id: 7,
        label: "Expired",
        value: "EXPIRED",
      },
    ],
  },
};
