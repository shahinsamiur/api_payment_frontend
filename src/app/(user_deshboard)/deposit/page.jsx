"use client";

import AutomaticPayment from "@/components/deposit/AutomaticPayment";

export default function page() {
  return (
    <div>
      {/* {payment === "manual" && <ManualPayment />} */}
      <AutomaticPayment />
    </div>
  );
}
