"use client";

import Card from "@/components/libs/Card";
import { useGetcontinentQuery } from "@/store/features/jobs";
import { setJobPostFinalForm } from "@/store/slices/jobform";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobBasicDetailsForm from "./JobBasicDetailsForm";
import JobsEstimationForm from "./JobsEstimationForm";
import SelectCategories from "./SelectCategories";
import SelectCountries from "./SelectCountries";
import Steper from "./Stepper";

export default function JobForm({ thumbnail = null }) {
  const [thumbnailImage, setThumbnailImage] = useState(thumbnail);
  const [steper, setSteper] = useState(0);
  const { data: countryData, isLoading: isLoadingCountryData } =
    useGetcontinentQuery();
  const { jobPostFinalForm, isUpdate } = useSelector((state) => state.jobForm);
  const dispath = useDispatch();

  const steps = [
    { label: "User Info" },
    { label: "Verify Email" },
    { label: "Payment" },
    { label: "Finish" },
  ];

  useEffect(() => {
    if (countryData && !isUpdate) {
      const countryIds = countryData.data.map((continent) => {
        return continent.countries.map((country) => country.id);
      });
      const countryIdsFlat = countryIds.flat();
      const payload = { ...jobPostFinalForm, country_ids: countryIdsFlat };
      dispath(setJobPostFinalForm(payload));
    }
  }, [countryData]);

  return (
    <Card>
      <div>
        <Steper steps={steps} currentStep={steper} setSteper={setSteper} />
        {steper === 0 ? (
          <SelectCountries
            setSteper={setSteper}
            data={countryData}
            isLoading={isLoadingCountryData}
          />
        ) : steper == 1 ? (
          <SelectCategories setSteper={setSteper} />
        ) : steper == 2 ? (
          <JobBasicDetailsForm
            setSteper={setSteper}
            setThumbnailImage={setThumbnailImage}
            thumbnailImage={thumbnailImage}
          />
        ) : steper == 3 ? (
          <JobsEstimationForm
            setSteper={setSteper}
            thumbnailImage={thumbnailImage}
          />
        ) : null}
      </div>
    </Card>
  );
}
