import Typography from "@/components/libs/Typography";
import Payment from "@/components/payment/Payment";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Typography>Loading...</Typography>}>
      <Payment />
    </Suspense>
  );
};

export default page;
