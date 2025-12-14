import Link from "next/link";
import React, { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import QRCode from "react-qr-code";
import Button from "../libs/Button";
import IconButton from "../libs/IconButton";
import Typography from "../libs/Typography";

const QrCodePayment = ({ data }) => {
  const [copy, setCopy] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(data.link);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  }

  return (
    <div className="space-y-4 dark:text-white">
      <div className="flex gap-4 items-center">
        <QRCode value={data.link} className="size-40 bg-white p-1 rounded" />
        <Link href={`/payment?orderId=${data.orderId}&type=${data.type}`}>
          <Button>I've paid</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="grow">
          <Typography variant="h5">
            {!data.opt2Disabled
              ? "Scan and pay"
              : "Option 1: Scan and pay (Recommended)"}
          </Typography>
          <ol>
            <li>
              1. Open your <span className="text-warning">{data.name} app</span>{" "}
              <br />
              {!data.opt2Disabled && (
                <div className="flex items-center gap-1">
                  <input className="!py-1 !w-fit" value={data.link} disabled />
                  <IconButton
                    onClick={handleCopy}
                    className="rounded-md"
                    size="sm"
                  >
                    {copy ? <FaCheck /> : <FaCopy />}
                  </IconButton>
                </div>
              )}
            </li>
            <li>2. Tap on “Scan QR” or the QR Code icon in your app.</li>
            <li>3. Scan the QR code shown on this screen.</li>
            <li>
              4. Enter the payment amount{" "}
              <span className="text-warning">{data.amount}</span>.
            </li>
            <li>5. Confirm and complete the payment.</li>
            <li>
              6. Once payment is successful, return to this page and click{" "}
              <span className="text-warning">“I've Paid”</span>.
            </li>
          </ol>
        </div>
        {data.opt2Disabled && (
          <div>
            <Typography variant="h5">
              Option 2: Pay Using Payment Link
            </Typography>
            <ol>
              <li className="flex  items-center gap-1">
                1. <input className="!py-1" value={data.link} disabled />
                <IconButton
                  onClick={handleCopy}
                  className="rounded-md"
                  size="sm"
                >
                  {copy ? <FaCheck /> : <FaCopy />}
                </IconButton>
              </li>
              <li>
                2. <span className="text-warning">Copy and paste</span> it into
                your <span className="text-warning">{data.name} app</span> or
                open it directly on your mobile browser.
              </li>
              <li>
                3. Verify merchant details and enter the amount{" "}
                <span className="text-warning">{data.amount}</span>.
              </li>
              <li>4. Confirm and complete the payment.</li>
              <li>
                5. Once payment is successful, return to this page and click{" "}
                <span className="text-warning">“I've Paid”</span>.
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCodePayment;
