import Link from "next/link";
import React from "react";
import Typography from "../libs/Typography";

const NotVarifiedBudge = ({ message }) => {
  return (
    <Link href="/verification">
      <div className="bg-gradient-to-b from-red-700 to-red-900 px-8 py-3 rounded-3xl text-white text-center shadow-md hover:shadow-lg transition mt-5">
        <Typography variant="body1" className="font-medium" align="center">
          Account Not Verified!
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </div>
    </Link>
  );
};

export default NotVarifiedBudge;
