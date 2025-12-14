import { config } from "@/config";

export const getGeneralData = async () => {
  const res = await fetch(`${config.apiBaseUrl}/general-data`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch general data");
  }
  return res.json();
};
