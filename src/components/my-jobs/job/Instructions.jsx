"use client";

import Card from "@/components/libs/Card";
import Typography from "@/components/libs/Typography";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa";

const Instructions = ({ steps }) => {
  const [copied, setCopied] = useState(false);

  function handleCopy(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <Card>
      <Typography variant="h4" className="mb-4">
        Instructions
      </Typography>
      <div className="space-y-4">
        {steps.map((data, index) => (
          <div
            key={index}
            className="flex items-start gap-1 break-words whitespace-pre-wrap mt-2"
          >
            <Typography variant="body2">{`${data.step_number}. `}</Typography>
            {/^https?:\/\//.test(data.instruction) ? (
              <div className="relative flex items-center gap-2">
                <Link
                  href={data.instruction}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline break-words"
                >
                  Open Link
                </Link>
                <button onClick={() => handleCopy(data.instruction)}>
                  {copied ? <FaCheck /> : <FaRegCopy />}
                </button>
              </div>
            ) : (
              <Typography variant="body2">{data.instruction}</Typography>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Instructions;
