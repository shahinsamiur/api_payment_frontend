"use client";
import ContentRenderer from "./ContentRenderer";
import Typography from "./Typography";

const PageContentRenderer = ({ content }) => {
  return (
    <div className="my-18 w-full container mx-auto px-5 dark:text-white">
      {content ? (
        <ContentRenderer content={content} />
      ) : (
        <div>
          <Typography about="center">No Content Available</Typography>
        </div>
      )}
    </div>
  );
};

export default PageContentRenderer;
