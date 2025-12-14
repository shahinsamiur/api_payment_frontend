import BlogPostDetail from "@/components/blogs/BlogPostDetail";
import { getBlog } from "@/services/blog/BlogFetcher";
import { generateMetadata } from "@/services/blog/BlogMetadata";

export { generateMetadata };

async function Page({ params }) {
  const { slug } = await params;
  const data = await getBlog(slug);
  return <BlogPostDetail blog={data.data} />;
}

export default Page;
