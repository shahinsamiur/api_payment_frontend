"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ContentRenderer from "../libs/ContentRenderer";
import Typography from "../libs/Typography";

const HomeFaqContent = ({ faqs }) => {
  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      {faqs.map((faq) => (
        <div key={faq.id} className="bg-border py-3 px-4 rounded-md">
          <button
            className="flex justify-between items-center w-full"
            onClick={() => toggleFaq(faq.id)}
          >
            <Typography variant="h5">{faq.question}</Typography>
            <div className="dark:text-white">
              {openFaqId === faq.id ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </button>
          <div
            className={clsx(
              "transition-all duration-300 ease-in-out dark:text-white overflow-hidden bg-border/5 rounded-b-md text-base",
              {
                "max-h-[300px] py-3 opacity-100 mt-3": openFaqId === faq.id,
                "max-h-0 py-0 opacity-0": openFaqId !== faq.id,
              }
            )}
          >
            <ContentRenderer content={faq.answer} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeFaqContent;
