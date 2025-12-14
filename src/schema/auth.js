import * as yup from "yup";

export const EditProfileSchema = yup.object().shape({
  name: yup.string(),
  age: yup.number().typeError("Age must be a number"),
  email: yup.string().email("Invalid email"),
  phone: yup.string(),
  country: yup.string(),
  about_me: yup.string(),
});

export const ResetPasswordSchema = yup.object().shape({
  old_password: yup.string().required(" Old password is required"),
  password: yup.string().required("New password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const ForgetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: yup.boolean(),
  device_name: yup.string(),
});

export const RegisterSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Minimum 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  password_confirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  country_id: yup.string().required("Country is required"),
  manager_id: yup.string(),
  acceptedTerms: yup
    .boolean()
    .oneOf([true], "You must accept the Terms and Privacy Policy"),
});

export const AccountVerificationSchema = yup.object().shape({
  verifyType: yup
    .string()
    .required("Verification type is required")
    .default(""),
  fullName: yup.string().required("Full Name is required"),
  cardNumber: yup
    .string()
    .required("Card number is required")
    .matches(/^\d+$/, "Card number must contain only digits"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must contain only digits")
    .min(11, "Phone number must be at least 11 digits"),
  frontImage: yup
    .mixed()
    .required("Front image is required")
    .test(
      "fileSize",
      "Front image must be less than 2048KB",
      (value) => value && value.size <= 2048 * 1024
    ),
  selfieImage: yup
    .mixed()
    .required("Selfie image is required")
    .test(
      "fileSize",
      "Selfie image must be less than 2048KB",
      (value) => value && value.size <= 2048 * 1024
    ),
});
