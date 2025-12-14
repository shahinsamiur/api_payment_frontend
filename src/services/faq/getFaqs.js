import { config } from "@/config";

export async function getFaqs() {
  const apiUrl = `${config.apiBaseUrl}/faqs`;
  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Internal Server Error");
  }
  return res.json();
}
