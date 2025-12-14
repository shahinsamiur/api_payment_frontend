import { config } from "@/config";
import Image from "next/image";
import React from "react";
import Typography from "../libs/Typography";

const PaymentInfoCard = ({
  paymentMethod,
  type,
  currency,
  conversionRate,
  data,
  networkFee,
  fee,
  formType,
}) => {
  let range = "";
  if (formType === "Deposit") {
    range = `${paymentMethod.min_deposit ?? 0} - ${paymentMethod.max_deposit}`;
  } else if (formType === "Withdrawal") {
    range = `${paymentMethod.min_withdrawals ?? 0} - ${
      paymentMethod.max_withdrawals
    }`;
  }

  return (
    <div className="p-3 md:p-5 rounded-lg bg-border/40 mb-6 border border-border">
      <div className="flex items-center gap-4 mb-4">
        {paymentMethod.image_url ? (
          <Image
            width={60}
            height={60}
            src={config.fileBaseUrl + paymentMethod.image_url}
            alt={paymentMethod.name}
            className="size-16 object-contain bg-white p-2 rounded-lg shadow-sm"
          />
        ) : (
          <div className="size-16 bg-primary-dark flex items-center justify-center text-white rounded-lg shadow-sm">
            <Typography variant="body1" className="font-bold uppercase">
              {paymentMethod.name.slice(0, 2)}
            </Typography>
          </div>
        )}
        <div>
          <Typography variant="body1" className="font-semibold capitalize">
            {paymentMethod.name.replace("_", " ")}
          </Typography>

          {paymentMethod.network ? (
            <Typography variant="caption">{paymentMethod.network}</Typography>
          ) : (
            <Typography variant="caption">
              {paymentMethod.description}
            </Typography>
          )}
        </div>
      </div>

      {/* Payment Limits */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        {type === "passimpay" && (
          <div className="bg-border/80 border border-border p-3 rounded-lg dark:text-white grow">
            <Typography variant="body2">
              Currency: {data.data.currency}
            </Typography>
            <Typography variant="body2">
              Network fee: <span className="text-warning">{networkFee}%</span>
            </Typography>
            <Typography variant="body2">
              Rate USD:{" "}
              <span className="text-warning">{data.data.rate_usd || 0}</span>
            </Typography>
          </div>
        )}

        <div className="bg-border/80 border border-border p-3 rounded-lg grow dark:text-white">
          <Typography variant="caption" className="font-medium">
            {formType} Range
          </Typography>
          <Typography variant="body2" className="font-medium">
            {range} ({currency})
          </Typography>
          <Typography variant="body2">
            {formType} Fee: <span className="text-warning">{fee}%</span>
          </Typography>
          {type === "apay" && (
            <Typography variant="body2" color="warning">
              1 USD = {conversionRate} {currency}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoCard;
