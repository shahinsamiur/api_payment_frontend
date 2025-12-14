import React from "react";
import { useSelector } from "react-redux";
import IconButton from "../libs/IconButton";

export default function Stepper({ steps = [], currentStep = 0, setSteper }) {
  const { jobPostFirstForm } = useSelector((state) => state.jobForm);
  return (
    <div className="flex items-center grow w-full md:max-w-2/3 mx-auto mb-10">
      {steps.map((_step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        const circleColorClasses = isCompleted
          ? "bg-success text-white dark:text-white"
          : isActive
          ? "bg-success dark:text-white text-white"
          : "!bg-gray-300 !text-gray-700";

        return (
          <React.Fragment key={index}>
            <IconButton
              className={`rounded-full font-bold transition-all duration-300 ${circleColorClasses}`}
              onClick={() => {
                if (jobPostFirstForm?.title) {
                  setSteper(index);
                }
              }}
            >
              {index + 1}
            </IconButton>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className={`h-1 flex-1 bg-gray-300`}>
                <div
                  className="h-full bg-success transition-all duration-300"
                  style={{ width: isCompleted ? "100%" : "0%" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
