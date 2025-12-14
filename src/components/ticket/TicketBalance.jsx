"use client";

import { useState } from "react";
import Button from "../libs/Button";
import Card from "../libs/Card";
import Modal from "../libs/Modal";
import Typography from "../libs/Typography";
import BuyTicketModal from "./buyTicketModal";

export default function TicketBalance({ data, unitPrice }) {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const handleModal = () => {
    setShowBuyModal((prev) => !prev);
  };

  const balance = [
    {
      title: "This Season",
      value: data ? data.seasonal_ticket : 0,
    },
    {
      title: "All Time",
      value: data ? data.all_ticket : 0,
    },
  ];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <Typography variant="h5">Your ticket balance</Typography>
        <Button variant="contain" onClick={handleModal}>
          Buy Ticket
        </Button>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-5">
        {balance.map((data, index) => (
          <div
            key={index}
            className="border border-border/80 pb-6 pt-4 px-7 rounded-2xl grow bg-border/30 w-full md:w-auto"
          >
            <Typography variant="h5">{data.title}</Typography>
            <Typography variant="h3" className="mt-4">
              {data.value}
            </Typography>
          </div>
        ))}
      </div>

      {showBuyModal && (
        <BuyTicketModal
          unitPrice={unitPrice}
          open={showBuyModal}
          onClose={() => setShowBuyModal(false)}
        />
      )}
    </Card>
  );
}
