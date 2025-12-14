import { getFaqs } from "@/services/faq/getFaqs";
import Animation from "../libs/Animation";
import Typography from "../libs/Typography";
import HomeFaqContent from "./HomeFaqContent";

const Faq = async ({ siteName }) => {
  const faqData = await getFaqs();
  const data = faqData?.faq_data || [];
  const firstFive = data.slice(0, 7);

  return (
    <div data-testid="home-page-faq-section" className="space-y-7">
      <div>
        <Animation
          inViewClass="opacity-100 translate-x-0"
          outViewClass="opacity-0 -translate-x-10"
        >
          <Typography variant="h3" align="center" color="primary">
            Frequently Asked Questions
          </Typography>
        </Animation>
        <Animation
          inViewClass="opacity-100 translate-y-0"
          outViewClass="opacity-0 translate-y-10"
          animationDelay={2}
        >
          <Typography variant="body2" align="center" className="mt-1">
            Everything you need to know about {siteName}
          </Typography>
        </Animation>
      </div>
      <HomeFaqContent faqs={firstFive} />
    </div>
  );
};

export default Faq;
