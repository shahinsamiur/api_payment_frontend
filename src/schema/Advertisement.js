import * as yup from "yup";

export const Advertisementschema = yup.object({
  title: yup.string().required("Title is required"),
  target_url: yup.string().required("Link is required"),
  cost_id: yup.number().required("Time duration is required"),
  status: yup.string().required("Status is required"),
  banner_image: yup
    .mixed()
    .required("Banner image is required")
    .test(
      "fileType",
      "Banner Image must be in jpg, jpeg, or png format",
      (value) => {
        if (!value) return false;
        if (typeof value === "string") return true;
        return (
          value.type === "image/jpeg" ||
          value.type === "image/png" ||
          value.type === "image/jpg"
        );
      }
    )
    .test("fileSize", "Banner Image size must be less than 2MB", (value) => {
      if (!value) return false;
      if (typeof value === "string") return true;
      return value.size <= 1 * 1024 * 1024;
    }),
});
