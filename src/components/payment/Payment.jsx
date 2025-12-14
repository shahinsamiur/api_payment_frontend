"use client";
import useGetPaymentInfoQuery from "@/hooks/useGetPaymentInfo";
import { useGetCurrencyConversationDataQuery } from "@/store/features/payment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LoadingIndicator from "../common/LoadingIndicator";
import Button from "../libs/Button";
import Typography from "../libs/Typography";
import AccountInformationCard from "./AccountInformationCard";
import PaymentDetailsCard from "./PaymentDetailsCard";
import PaymentStatusDisplay from "./PaymentStatusDisplay";

const Payment = () => {
  const param = useSearchParams();
  const type = param.get("type");
  const orderId = param.get("orderId");
  const token = param.get("token");
  const { data, isLoading } = useGetPaymentInfoQuery({ token, type, orderId });
  const { data: currencyData } = useGetCurrencyConversationDataQuery();

  if (isLoading) return <LoadingIndicator className="mt-10" />;

  if (!data)
    return (
      <div className="min-h-screen flex items-center flex-col gap-2 justify-center">
        <Typography variant="body1">Something went wrong!</Typography>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );

  const payment = data.transaction_report;
  const user = data.user;

  const currency = payment.currency;
  const rate = currencyData?.find(
    (item) => item?.to_currency === currency
  )?.rate;
  const usdAmount =
    currency === "USD"
      ? payment.amount
      : (payment.amount / parseFloat(rate)).toFixed(2);

  return (
    <div className="container mx-auto px-3 md:px-5 pb-10 pt-20 space-y-6">
      <PaymentStatusDisplay payment={payment} />
      <PaymentDetailsCard payment={payment} user={user} usdAmount={usdAmount} />
      <AccountInformationCard user={user} payment={payment} />
    </div>
  );
};

export default Payment;
