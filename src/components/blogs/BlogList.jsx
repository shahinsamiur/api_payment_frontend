"use client";
import Card from "@/components/libs/Card";
import Link from "next/link";
import Typography from "../libs/Typography";

const BlogList = ({ blogs, isLoading }) => {
  const data = blogs?.data?.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      {isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <div className="h-60 bg-card p-5 rounded-md space-y-2" key={index}>
            <div className="h-10 bg-border animate-pulse rounded-lg" />
            <div className="h-8 bg-border animate-pulse rounded-lg" />
            <div className="h-8 bg-border animate-pulse rounded-lg" />
            <div className="h-8 bg-border animate-pulse rounded-lg" />
            <div className="h-8 bg-border animate-pulse rounded-lg" />
          </div>
        ))
      ) : data?.length ? (
        data?.map((blog) => (
          <Card
            dark
            key={blog.id}
            className="!mt-0 transform hover:-translate-y-1 transition-transform cursor-pointer"
          >
            <Link
              href={`/blogs/${blog.slug}`}
              className="flex flex-col justify-between h-full"
            >
              <div>
                <Typography
                  variant="body2"
                  color="primary"
                  className="mb-2 font-medium"
                >
                  {blog.job_category.category_name}
                </Typography>
                <Typography variant="h5" className="mb-2 line-clamp-2 min-w-0">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="gray" className="mb-4">
                  {blog.short_description}
                </Typography>
              </div>
              <Typography variant="caption">
                {new Date(blog.updated_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Link>
          </Card>
        ))
      ) : (
        <div className="col-span-4">
          <Typography align="center" variant="body2">
            No blog found
          </Typography>
        </div>
      )}
    </div>
  );
};

export default BlogList;
