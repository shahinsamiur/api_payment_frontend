"use client";

import Button from "@/components/libs/Button";
import { useState } from "react";
import Typography from "../libs/Typography";
import PackageCard from "./PackageCard";
import PremiumPurchaseModal from "./PremiumPurchaseModal";

export default function PremeumContent({ premiumPackages }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});

  const handleBuyNowClick = (pkg) => {
    setSelectedPackage({
      duration: pkg.duration,
      package_id: pkg.id,
      price: pkg.price,
    });
    setOpenModal(true);
  };

  if (!premiumPackages?.subscription_package_list?.length) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Typography variant="caption" align="center">
          There is no available package
        </Typography>
      </div>
    );
  }
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 ">
      {premiumPackages?.subscription_package_list.map((item, index) => (
        <PackageCard key={index} data={item}>
          <Button onClick={() => handleBuyNowClick(item)}>Buy now</Button>
        </PackageCard>
      ))}

      <PremiumPurchaseModal
        open={openModal}
        onClose={setOpenModal}
        premiumPkg={selectedPackage}
      />
    </section>
  );
}
