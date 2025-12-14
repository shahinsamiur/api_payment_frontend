import { config } from "./src/config.js";

/** @type {import('next-sitemap').IConfig} */
const nextSitemapConfig = {
  siteUrl: config.siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ["/404"],

  additionalPaths: async () => {
    const paths = [
      { loc: "/", changefreq: "daily", priority: 1.0 },
      { loc: "/about-us", changefreq: "monthly", priority: 0.8 },
      { loc: "/cancelation-policy", changefreq: "monthly", priority: 0.3 },
      { loc: "/faq", changefreq: "monthly", priority: 0.6 },
      { loc: "/live-support", changefreq: "monthly", priority: 0.7 },
      { loc: "/privacy-policy", changefreq: "monthly", priority: 0.3 },
      { loc: "/refund-policy", changefreq: "monthly", priority: 0.3 },
      { loc: "/terms-and-conditions", changefreq: "monthly", priority: 0.3 },
      { loc: "/top-job-poster", changefreq: "monthly", priority: 0.3 },
      { loc: "/top-reffer", changefreq: "monthly", priority: 0.3 },
      { loc: "/top-users", changefreq: "monthly", priority: 0.3 },
      { loc: "/top-workers", changefreq: "monthly", priority: 0.3 },
      { loc: "/deposit", changefreq: "monthly", priority: 0.3 },
      { loc: "/jobs", changefreq: "monthly", priority: 0.3 },
      { loc: "/premium", changefreq: "monthly", priority: 0.3 },
      { loc: "/ticket", changefreq: "monthly", priority: 0.3 },
      { loc: "/wallet", changefreq: "monthly", priority: 0.3 },
    ];

    // Dynamic job pages and blog pages
    try {
      const res = await fetch(`${config.apiBaseUrl}/sitemap-data`);
      const sitemapData = await res.json();
      const jobPages = sitemapData.jobs.map((job) => ({
        loc: `/jobs/${job.slug}`,
        changefreq: "daily",
        priority: 0.8,
        lastmod: job.updated_at,
      }));
      paths.push(...jobPages);
      const blogPages = sitemapData.blogs.map((blog) => ({
        loc: `/blogs/${blog.slug}`,
        changefreq: "daily",
        priority: 0.8,
        lastmod: blog.updated_at,
      }));
      paths.push(...blogPages);
    } catch (error) {
      console.error("Error fetching dynamic paths:", error);
    }

    return paths;
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: ["/404"],
      },
    ],
  },

  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};

export default nextSitemapConfig;
