import React from "react";

const JobSkelaton = () => {
  return (
    <div className="border lg:border-2 border-border rounded-xl dark:bg-transparent px-3 md:px-5 py-3 cursor-pointer space-y-2">
      <div className="h-5 w-full bg-gray-300 dark:bg-gray-500 rounded-md animate-pulse" />
      <div className="flex justify-between items-center">
        <div className="h-5 w-full max-w-md bg-gray-300 dark:bg-gray-500 rounded-md animate-pulse" />
        <div className="h-5 w-full max-w-20 bg-gray-300 dark:bg-gray-500 rounded-md animate-pulse" />
      </div>
      <div className="flex justify-between items-center gap-3 md:gap-5">
        <div className="grow flex justify-center">
          <div className="h-2 w-full max-w-md bg-gray-300 dark:bg-gray-500 rounded-md animate-pulse" />
        </div>
        <div className="h-3 w-full max-w-24 bg-gray-300 dark:bg-gray-500 rounded-md animate-pulse" />
      </div>
    </div>
  );
};

export default JobSkelaton;
