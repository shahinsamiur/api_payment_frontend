import { config } from "@/config";
import { redirect } from "next/navigation";
import { cache } from "react";

const revalidate = 60 * 5;

export const getJob = cache(async (id) => {
  const res = await fetch(`${config.apiBaseUrl}/jobs/job/${id}`, {
    headers: {
      "Content-type": "Application/json",
      Accept: "Application/json",
      "X-API-Key": config.apiKey,
    },
    next: { revalidate },
  });
  if (!res.ok) {
    if (res.status === 404) {
      redirect("/not-found");
    } else {
      throw new Error("Internal Server Error");
    }
  }
  return res.json();
});
