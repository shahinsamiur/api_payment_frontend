import * as yup from "yup";

export const JobBasicDetailsSchema = yup.object({
  title: yup
    .string()
    .min(5, "Minimum 5 characters")
    .max(30, "Maximum 30 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(5, "Minimum 5 characters")
    .max(30, "Maximum 30 characters")
    .required("Short Title is required"),
  thumbnail: yup
    .mixed()
    .required("Thumbnail is required")
    .test(
      "fileType",
      "Thumbnail must be in jpg,jpeg or png format",
      (value) => {
        if (value) {
          if (typeof value === "string") return true;
          return (
            value.type === "image/jpeg" ||
            value.type === "image/png" ||
            value.type === "image/jpg"
          );
        }
        return true;
      }
    )
    .test("fileSize", "Thumbnail size must be less than 10MB", (value) => {
      if (value) {
        if (typeof value === "string") return true;
        return value.size <= 10 * 1024 * 1024;
      }
      return true;
    }),
  steps: yup.array().of(
    yup.object().shape({
      step_number: yup.number().required("Step number is required"),
      instruction: yup
        .string()
        .min(5, "Minimum 5 characters")
        .max(150, "Maximum 150 characters")
        .required("Step instruction is required"),
    })
  ),
  required_proofs: yup
    .array()
    .of(
      yup.object().shape({
        type: yup.string().required("Proof type is required"),
        description: yup.string().required("Proof description is required"),
      })
    )
    .min(1, "At least one proof is required"),

  question_condition: yup.array().of(
    yup
      .object()
      .shape({
        id: yup.number().nullable(),
        answer_type: yup.string().nullable(),
        text: yup.string().nullable(),
        condition: yup.object().shape({
          operator: yup.string().nullable(),
          value: yup.string().nullable(),
        }),
      })
      .test("all-or-nothing", null, function (fields) {
        if (!fields) return true;

        const { answer_type, text, condition } = fields;
        const operator = condition?.operator;
        const value = condition?.value;

        // Case 1: all empty
        if (!answer_type && !text && !operator && !value) return true;

        // Case 2: all filled
        if (answer_type && text && operator && value) return true;

        const errors = [];

        if (!answer_type) {
          errors.push(
            new yup.ValidationError(
              "Answer type is required",
              fields,
              `${this.path}.answer_type`
            )
          );
        }

        if (!text) {
          errors.push(
            new yup.ValidationError(
              "Question is required",
              fields,
              `${this.path}.text`
            )
          );
        }

        if (!operator) {
          errors.push(
            new yup.ValidationError(
              "Operator is required",
              fields,
              `${this.path}.condition.operator`
            )
          );
        }

        if (!value) {
          errors.push(
            new yup.ValidationError(
              "Value is required",
              fields,
              `${this.path}.condition.value`
            )
          );
        }

        // Throw all errors together
        if (errors.length > 0) {
          throw new yup.ValidationError(errors);
        }

        return true;
      })
  ),
});

export const JobEstimationSchema = (generalData, jobPostFinalForm) => {
  return yup.object({
    total_workers_required: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .min(
        generalData?.job_minimum_worker,
        `minimum worker need ${generalData?.job_minimum_worker}`
      )
      .required("Worker is required"),
    pay_per_task: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .min(
        parseFloat(jobPostFinalForm.minimum_pay || 0),
        `minimum ${jobPostFinalForm.minimum_pay} is required`
      )
      .required("Each worker earn is required"),
    require_screenshots: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .typeError("Required screenshot must be a number")
      .max(10, "Maximum 10 required screenshot is required")
      .required("Required screenshot is required"),
    estimated_day: yup
      .number()
      .transform((value, originalValue) =>
        String(originalValue).trim() === "" ? undefined : value
      )
      .min(
        generalData?.job_minimum_estimated_day,
        `Minimum ${generalData?.job_minimum_estimated_day} day`
      )
      .required("Estimated day is required")
      .max(
        generalData?.job_maximum_estimated_day,
        `Maximum ${generalData?.job_maximum_estimated_day} days`
      ),
    status: yup.string().trim().required("Status is required"),
  });
};

export const WorderExtendSchema = yup
  .object()
  .shape({
    worker_quantity: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .min(1, "Worker quantity must be at least 1")
      .integer("Worker quantity must be a whole number")
      .typeError("Worker quantity must be a number"),
    day_extend: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .min(1, "Day extend must be at least 1")
      .integer("Day extend must be a whole number")
      .typeError("Day extend must be a number"),
  })
  .test(
    "at-least-one-required",
    "At least one field is required",
    function (values) {
      const { worker_quantity, day_extend } = values;
      if (worker_quantity == null && day_extend == null) {
        return this.createError({
          path: "form_validation",
          message: "At least one field is required ",
        });
      }
      return true;
    }
  );
