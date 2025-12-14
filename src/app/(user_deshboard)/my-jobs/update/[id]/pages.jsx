import UpdateJob from "@/components/job/UpdateJob";
import { config } from "@/config";
import { redirect } from "next/navigation";

async function page({ params }) {
  const { id } = await params;
  const res = await fetch(`${config.apiBaseUrl}/jobs/job/${id}`, {
    headers: {
      "Content-type": "Application/json",
      Accept: "Application/json",
      "X-API-Key": config.apiKey,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    if (res.status === 404) {
      redirect("/not-found");
    } else {
      throw new Error("Internal Server Error");
    }
  }

  const data = await res.json();

  return <UpdateJob data={data} />;
}

export default page;
