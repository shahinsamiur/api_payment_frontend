"use client";

import useCountryFromGeolocation from "@/hooks/useCountryFromGeolocation";
import { useGetcountryQuery } from "@/store/features/jobs";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import DropdownMenus from "../libs/DropdownMenus";
import Typography from "../libs/Typography";

const CountrySelectField = ({ control, setValue, errors }) => {
  const [countriesOption, setCountriesOption] = useState([]);
  const { data: countries } = useGetcountryQuery();
  const { country } = useCountryFromGeolocation();

  useEffect(() => {
    if (!countries || !countries?.data?.length) {
      return;
    }
    const countriesOption =
      countries?.data?.map((item) => {
        return {
          value: item.id,
          label: item.country_name,
          shortName: item.short_name,
        };
      }) || [];

    const isExist = countriesOption.find((item) => item.shortName === country);

    if (isExist) {
      setValue("country_id", isExist.value);
    } else {
      const bangladesh = countriesOption.find(
        (item) => item.shortName === "BD"
      );
      if (bangladesh) {
        setValue("country_id", bangladesh.value);
      } else {
        setValue("country_id", countriesOption[0].value);
      }
    }
    setCountriesOption(countriesOption);
  }, [countries, setValue]);

  return (
    <div>
      <label>Country</label>
      <Controller
        name="country_id"
        control={control}
        render={({ field }) => (
          <DropdownMenus
            selected={field.value}
            setSelected={field.onChange}
            options={countriesOption}
            placeholder="Select your country"
            error={errors.country_id?.message}
          />
        )}
      />
      {errors.country_id && (
        <Typography variant="error">{errors.country_id.message}</Typography>
      )}
    </div>
  );
};

export default CountrySelectField;
