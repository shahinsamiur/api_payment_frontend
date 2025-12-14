"use client";
import { useSubmitEmailForNewsLetterMutation } from "@/store/features/generalData";
import { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";
import Animation from "../libs/Animation";
import Button from "../libs/Button";
import Typography from "../libs/Typography";

const schema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is Required"),
});

function NewsLetterForm() {
  const [submitEmail, { isLoading, error }] =
    useSubmitEmailForNewsLetterMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleOnclick = async () => {
    try {
      await schema.validate({ email: emailInput });
      await submitEmail({ email: emailInput }).unwrap();
      setEmailInput("");
      toast.success("Subcribed Successfully!");
    } catch (error) {
      if (error.name === "ValidationError") {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error.data?.message || "Internal Server Error");
      }
    }
  };

  return (
    <div>
      {/* Input + Button */}
      <Animation
        inViewClass="opacity-100 translate-y-0"
        outViewClass="opacity-0 translate-y-10"
        animationDelay={3}
        className={`flex flex-row justify-center items-center gap-4 border rounded-md w-full max-w-md px-1 py-1 ${
          errorMessage ? "border-error" : "border-border"
        }`}
      >
        <input
          type="text"
          placeholder="Your email"
          className="!border-none"
          value={emailInput}
          onChange={(e) => {
            setEmailInput(e.target.value);
            setErrorMessage("");
          }}
        />
        <Button variant="contain" onClick={handleOnclick} loading={isLoading}>
          Subscribe
        </Button>
      </Animation>

      {/* Error Message */}
      {errorMessage && <Typography variant="error">{errorMessage}</Typography>}
    </div>
  );
}

export default NewsLetterForm;
