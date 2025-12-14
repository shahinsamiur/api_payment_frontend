import FaqContent from "@/components/faq/FaqContent";
import { getFaqs } from "@/services/faq/getFaqs";

async function FaqPage() {
  const data = await getFaqs();
  return (
    <div className="my-15">
      <FaqContent data={data?.faq_data || []} />
    </div>
  );
}

export default FaqPage;
