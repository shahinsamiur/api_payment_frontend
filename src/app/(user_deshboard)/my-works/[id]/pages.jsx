import SingleTaskPresenter from "@/components/my-work/singleTask/SingleTaskPresenter";
import { config } from "@/config";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`${config.apiBaseUrl}/my-task/show/${id}`, {
    headers: {
      "Content-type": "Application/json",
      Accept: "Application/json",
      "X-API-Key": config.apiKey,
    },
  });

  if (!res.ok) {
    if (res.status === 404) {
      redirect("/not-found");
    } else {
      throw new Error("Internal Server Error");
    }
  }

  const data = await res.json();
  return <SingleTaskPresenter data={data.data} />;
};

export default page;
