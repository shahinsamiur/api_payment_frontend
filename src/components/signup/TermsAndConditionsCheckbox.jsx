"use client";

import Link from "next/link";
import Typography from "../libs/Typography";

const TermsAndConditionsCheckbox = ({ register, errors }) => {
  return (
    <>
      <div className="flex items-start md:items-center gap-1">
        <input
          type="checkbox"
          id="terms"
          {...register("acceptedTerms", { required: true })}
          className="!w-fit"
        />
        <label
          htmlFor="terms"
          className="flex cursor-pointer items-center gap-1 flex-wrap text-sm"
        >
          I agree to <span className="hidden md:block">Workdear’s</span>
          <Link href="/terms-and-conditions" className="text-warning underline">
            Terms of Service
          </Link>
          and
          <Link href="/privacy-policy" className="text-warning underline">
            Privacy Policy
          </Link>
        </label>
      </div>
      {errors.acceptedTerms && (
        <Typography variant="error">{errors.acceptedTerms.message}</Typography>
      )}
    </>
  );
};

export default TermsAndConditionsCheckbox;
