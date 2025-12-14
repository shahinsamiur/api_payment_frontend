import PremiumContent from "@/components/premium/PremeumContent";
import { config } from "@/config";

const revalidate = 60 * 5;

export default async function page() {
  const res = await fetch(`${config.apiBaseUrl}/subscription-packages`, {
    headers: {
      "Content-type": "Application/json",
      Accept: "Application/json",
      "X-API-Key": config.apiKey,
    },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return <PremiumContent premiumPackages={data} />;
}
