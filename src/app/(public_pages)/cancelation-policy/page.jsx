import PageContentRenderer from "@/components/libs/PageContentRenderer";
import { config } from "@/config";

async function CancelationPolicy() {
  const apiUrl = `${config.apiBaseUrl}/content/pages/cancelation_policy`;
  const res = await fetch(apiUrl, {
    next: { revalidate: 60 },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();

  return (
    <PageContentRenderer
      name={data?.content_data?.name}
      content={data?.content_data?.content}
    />
  );
}

export default CancelationPolicy;
