"use client";
import AutomaticWithdraw from "@/components/wallet/AutomaticWithdraw";

const WalletPage = () => {
  return (
    <div>
      {/* {withdraw === "manual" && <ManualWithdraw />} */}
      <AutomaticWithdraw />
    </div>
  );
};

export default WalletPage;
