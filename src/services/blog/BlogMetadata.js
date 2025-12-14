import { config } from "@/config";
import { getBlog } from "./BlogFetcher";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getBlog(slug);
  return {
    title: data.data.title,
    description: data.data.short_description,
    openGraph: {
      title: data.data.title,
      description: data.data.short_description,
      images: [
        {
          url: `${config.fileBaseUrl}${data.data.thumbnail_image}`,
          width: 800,
          height: 600,
          alt: data.data.title,
        },
      ],
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: data.data.title,
      description: data.data.short_description,
      images: [
        {
          url: `${config.fileBaseUrl}${data.data.thumbnail_image}`,
          width: 800,
          height: 600,
          alt: data.data,
          title: data.data.title,
          description: data.data.short_description,
        },
      ],
    },
  };
}
