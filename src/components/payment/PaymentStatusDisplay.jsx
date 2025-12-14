"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import { CgLock } from "react-icons/cg";
import { LuRefreshCw } from "react-icons/lu";
import { TbAlertTriangle } from "react-icons/tb";
import Button from "../libs/Button";
import Card from "../libs/Card";
import Typography from "../libs/Typography";

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "success":
      return <BiCheckCircle className="size-7 text-success" />;
    case "pending":
      return <CgLock className="size-7 text-warning" />;
    case "failed":
      return <BiXCircle className="size-7 text-error" />;
    default:
      return <TbAlertTriangle className="w-8 h-8 text-gray-500" />;
  }
};

const PaymentStatusDisplay = ({ payment }) => {
  const router = useRouter();
  const handleRetryPayment = () => {
    if (payment.redirect_url) window.location.href = payment.redirect_url;
    else router.push("/deposit");
  };

  const status = payment.status.toLowerCase();

  switch (status) {
    case "pending":
      return (
        <Card>
          <div className="flex items-start flex-wrap gap-2 mb-4">
            {getStatusIcon(status)}
            <div>
              <Typography
                variant="body1"
                className="font-medium"
                color="warning"
              >
                Payment pending
              </Typography>
              <Typography variant="body2" color="warning">
                Your payment is being processed
              </Typography>
            </div>
          </div>
          <div className="bg-warning/20 border border-warning/70 rounded-lg p-4">
            <Typography variant="body2" color="warning" className="mb-3">
              Your payment is currently being processed but couldn't complete
            </Typography>
            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={handleRetryPayment}
                className="bg-warning hover:bg-warning/80"
              >
                <LuRefreshCw className="size-5" />
                Retry Payment
              </Button>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-warning text-warning"
                >
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      );

    case "success":
      return (
        <Card>
          <div className="flex items-start gap-2 mb-4">
            {getStatusIcon(status)}
            <div>
              <Typography
                variant="body1"
                className="font-medium"
                color="success"
              >
                Payment successful!
              </Typography>
              <Typography variant="body2" color="success">
                Your payment has been processed successfully
              </Typography>
            </div>
          </div>
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <Typography variant="body2" color="success" className="mb-3">
              Congratulations! Your payment of {payment.amount}{" "}
              {payment.currency} has been successfully processed.
            </Typography>
          </div>
        </Card>
      );

    case "failed":
      return (
        <Card>
          <div className="flex items-start gap-2 mb-4">
            {getStatusIcon(status)}
            <div>
              <Typography variant="body1" className="font-medium" color="error">
                Payment failed
              </Typography>
              <Typography variant="body2" color="error">
                Unfortunately, your payment could not be processed
              </Typography>
            </div>
          </div>
          <div className="bg-error/20 border border-error rounded-lg p-4">
            <Typography variant="body2" color="error" className="mb-3">
              Your payment is failed due to some reason. Please try again or
              contact our support team
            </Typography>
            <div className="flex gap-3 flex-wrap">
              <Link href="/deposit">
                <Button className="bg-error hover:bg-error/80">
                  <LuRefreshCw className="size-5" />
                  Retry Payment
                </Button>
              </Link>
              <Link href="/live-support">
                <Button variant="outline">Contact Support</Button>
              </Link>
            </div>
          </div>
        </Card>
      );

    default:
      return null;
  }
};

export default PaymentStatusDisplay;
