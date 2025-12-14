import ContentRenderer from "@/components/libs/ContentRenderer";
import Typography from "@/components/libs/Typography";
import { config } from "@/config";
import Image from "next/image";

const BlogPostDetail = ({ blog }) => {
  return (
    <div className="container mx-auto px-4 py-14 space-y-2 mt-2 md:mt-3">
      <Typography variant="body2" color="primary" className="font-medium">
        {blog.job_category.category_name}
      </Typography>
      <div>
        <Typography variant="h4">{blog.title}</Typography>
        <Typography variant="caption">
          Published on:{" "}
          {new Date(blog.published_at).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </div>
      <div>
        <Image
          src={`${config.fileBaseUrl}${blog.thumbnail_image}`}
          alt={blog.title}
          width={900}
          height={400}
          className="rounded-md max-h-[400px] mx-auto my-7"
        />
      </div>
      <div className="dark:text-white">
        <ContentRenderer content={blog.content} />
      </div>
    </div>
  );
};

export default BlogPostDetail;
