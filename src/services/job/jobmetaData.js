import { config } from "@/config";
import { getJob } from "./getJob";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = await getJob(id);
  const data = job?.data;
  const category = data?.job_sub_category?.parent_category?.category_name ?? "";
  const subCategory = data?.job_sub_category?.sub_category_name ?? "";
  return {
    title: `Job - ${data.title} | ${category}/${subCategory} | Workdear`,
    description: data.description,
    openGraph: {
      title: `Earn $${data.pay_per_task} - ${data.title}`,
      description: data.description,
      images: [
        {
          url: `${config.fileBaseUrl}${data.thumbnail_url}`,
          width: 800,
          height: 600,
          alt: data.title,
        },
      ],
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `Earn $${data.pay_per_task} - ${data.title}`,
      description: data.description,
      images: [`${config.fileBaseUrl}${data.thumbnail_url}`],
    },
  };
}
