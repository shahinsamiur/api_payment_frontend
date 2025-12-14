import { metaData } from "@/_mock/metadata";
import { config } from "@/config";
import { getGeneralData } from "./GeneralFetcher";

export async function generateMetadata() {
  const title = metaData.title;
  const description = metaData.description;
  const keywords = metaData.keywords;

  try {
    const data = await getGeneralData();

    const url = config.siteUrl;
    const images = [
      {
        url: config.fileBaseUrl + data.site_favicon,
        width: 1200,
        height: 630,
        alt: title,
      },
    ];

    return {
      title,
      description,
      keywords,
      openGraph: {
        type: "website",
        url,
        title,
        description,
        keywords,
        siteName: data.site_name,
        images,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        keywords,
        images,
      },
      alternates: {
        canonical: url,
      },
    };
  } catch (error) {
    return {
      title,
      description,
      keywords,
    };
  }
}
