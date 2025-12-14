"use client";
import clsx from "clsx";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Card from "../libs/Card";
import ContentRenderer from "../libs/ContentRenderer";
import Typography from "../libs/Typography";

export default function FaqContent({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto dark:text-white overflow-hidden !p-0">
      <Typography
        variant="h5"
        align="center"
        color="white"
        className="px-5 py-3 bg-primary-dark"
      >
        Frequently Asked Question
      </Typography>

      <div className="p-5">
        {data?.length ? (
          data.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="mb-2 bg-border/90 rounded-md border border-border overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-border transition-colors"
                >
                  <span className="text-lg font-medium">
                    {index + 1}. {item.question}
                  </span>
                  {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>

                <div
                  className={clsx(
                    "transition-all duration-300 ease-in-out px-4 overflow-hidden bg-border/5 rounded-b-md",
                    {
                      "max-h-[300px] py-3 opacity-100": isOpen,
                      "max-h-0 py-0 opacity-0": !isOpen,
                    }
                  )}
                >
                  <ContentRenderer content={item.answer} />
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <Typography align="center">No FAQ found.</Typography>
          </div>
        )}
      </div>
    </Card>
  );
}
