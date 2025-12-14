// import Faq from "@/components/landing/Faq";
// import Hero from "@/components/landing/Hero";
// import HowWorks from "@/components/landing/HowWorks";
// import NewsLetter from "@/components/landing/NewsLetter";
// import PremiumPkg from "@/components/landing/PremiumPkg";
// import RecentActivity from "@/components/landing/RecentActivity";
// import Services from "@/components/landing/Services";
// import Testimonials from "@/components/landing/Testimonials";
// import { getGeneralData } from "@/services/general/GeneralFetcher";
// import { generateMetadata } from "@/services/general/HomePageMetadata";
// import { getHomePageStructuredData } from "@/services/general/HomePageStructuredData";
// import Head from "next/head";

// export { generateMetadata };

// export default async function Home() {
//   const data = await getGeneralData();
//   const structuredData = getHomePageStructuredData(data);

//   return (
//     <div>
//       <Head>
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//         />
//       </Head>
//       <Hero data={data} />
//       <RecentActivity siteName={data.site_name} />
//       <div className="container mx-auto px-5 space-y-20 my-20">
//         <Services data={data?.experience_the_best_services ?? []} />
//         <HowWorks />
//       </div>
//       <PremiumPkg />
//       <div className="container mx-auto px-5  space-y-20 my-20">
//         <Faq siteName={data.site_name} />
//         <Testimonials />
//         <NewsLetter />
//       </div>
//     </div>
//   );
// }
import Typography from "@/components/libs/Typography";
import SignInForm from "@/components/signin/SignInForm";
import { Suspense } from "react";

export default function page() {
  return (
    <div className="flex-1 container mx-auto px-3 md:px-5  flex items-center flex-col lg:flex-row pb-18 pt-24 md:py-24 justify-center gap-5 md:gap-10">
      <Suspense fallback={<Typography>Loading...</Typography>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
