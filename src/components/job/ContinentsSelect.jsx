"use client";

import { notes } from "@/_mock/notes";
import Button from "@/components/libs/Button";
import Typography from "../libs/Typography";

export default function cuntrySelect({
  continents,
  selectedContinent,
  setSelectedContinent,
}) {
  return (
    <div className="space-y-5">
      <Typography
        color="warning"
        align="center"
        variant="body2"
        className="font-semibold"
      >
        {notes.job_post_contry_select_note}
        <span className="text-black dark:text-white"> (Optional)</span>
      </Typography>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {continents.map((label, index) => (
          <div key={index} className="relative">
            <Button
              className="justify-center w-full"
              onClick={() => {
                setSelectedContinent(label.id);
              }}
              variant={selectedContinent === label.id ? "contain" : "outline"}
            >
              {label.country_category_name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
