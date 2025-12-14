"use client";
import { useState } from "react";
import { BiCopy } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import Card from "../libs/Card";
import IconButton from "../libs/IconButton";
import Typography from "../libs/Typography";

const PaymentDetailsCard = ({ payment, user, usdAmount }) => {
  const [copied, setCopied] = useState("");

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <Card className="!space-y-3">
      <Typography variant="h4">Payment details</Typography>

      <div>
        <Typography variant="body1">Tnx ID:</Typography>
        <div className="flex items-center flex-wrap gap-2">
          <Typography variant="body2">{payment.transaction_id}</Typography>
          <IconButton
            size="sm"
            className="rounded-md"
            onClick={() =>
              copyToClipboard(payment.transaction_id, "transaction_id")
            }
          >
            {copied === "transaction_id" ? <FaCheck /> : <BiCopy />}
          </IconButton>
        </div>
      </div>

      <div>
        <Typography variant="body1">Customer ID:</Typography>
        <div className="flex items-center gap-2">
          <Typography variant="body2">{user.id}</Typography>

          <IconButton
            size="sm"
            className="rounded-md"
            onClick={() => copyToClipboard(user.id, "customer_id")}
          >
            {copied === "customer_id" ? <FaCheck /> : <BiCopy />}
          </IconButton>
        </div>
      </div>

      <div>
        <Typography variant="body1">Amount</Typography>
        <Typography variant="h4">
          {payment.amount} {payment.currency}{" "}
          {payment.currency !== "USD" && (
            <span className="text-warning">({usdAmount}$)</span>
          )}
        </Typography>
      </div>

      <div>
        <Typography variant="body1">Payment method</Typography>
        <Typography variant="body2" className="capitalize">
          {payment.payment_system?.replace("_", " ") || "N/A"}
        </Typography>
      </div>

      <div>
        <Typography variant="body1">Transaction Date</Typography>
        <Typography variant="body2">
          {new Date(payment.created_at).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}
        </Typography>
      </div>
    </Card>
  );
};

export default PaymentDetailsCard;
