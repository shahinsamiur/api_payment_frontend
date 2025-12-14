import { metaData } from "@/_mock/metadata";
import { config } from "@/config";

export const getHomePageStructuredData = (data) => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        url: config.siteUrl,
        name: data.site_name,
        description: metaData.description,
        potentialAction: {
          "@type": "SearchAction",
          target: `${config.siteUrl}/jobs?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
        publisher: {
          "@type": "Organization",
          name: data.site_name,
          logo: {
            "@type": "ImageObject",
            url: config.fileBaseUrl + data.site_favicon,
          },
        },
      },
      {
        "@type": "WebPage",
        url: config.siteUrl,
        name: data.site_name,
        description: metaData.description,
        keywords: metaData.keywords,
      },
    ],
  };
};
