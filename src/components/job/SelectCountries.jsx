import { useState } from "react";
import LoadingIndicator from "../common/LoadingIndicator";
import Typography from "../libs/Typography";
import ContinentsSelect from "./ContinentsSelect";
import Countries from "./Countries";
import NextAndPrevButton from "./NextAndPrevButton";

function SelectCountries({ setSteper, data, isLoading }) {
  const [selectedContinent, setSelectedContinent] = useState(1);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (!data?.data?.length) {
    return (
      <Typography variant="caption" align="center">
        No country available
      </Typography>
    );
  }

  return (
    <div className="space-y-7">
      <ContinentsSelect
        selectedContinent={selectedContinent}
        setSelectedContinent={setSelectedContinent}
        continents={data.data}
      />
      <Countries contries={data.data[selectedContinent - 1]?.countries} />
      <NextAndPrevButton setSteper={setSteper} disabledPrev={true} />
    </div>
  );
}

export default SelectCountries;
