import { config } from "@/config";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import useGetSingleGateWay from "@/hooks/useGetSingleGateWay";
import {
  useApayDepositMutation,
  useDepositWithPassimpayMutation,
  useGetCurrencyConversationDataQuery,
} from "@/store/features/payment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { toast } from "react-toastify";
import LoadingIndicator from "../common/LoadingIndicator";
import Button from "../libs/Button";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";
import PaymentInfoCard from "./PaymentInfoCard";
import QrCodePayment from "./QrCodePayment";

const PaymentForm = ({ setPaymentMethod, paymentMethodId, type }) => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [apayDeposit, { isLoading: apayDepositLoading }] =
    useApayDepositMutation();
  const [passimpayDeposit, { isLoading: passimpayDepositLoading }] =
    useDepositWithPassimpayMutation();
  const { data: currencyData } = useGetCurrencyConversationDataQuery();
  const depositFee = useGetCostFromCostCenter("deposit_fee_gateway_percentage");
  const { data, isLoading } = useGetSingleGateWay({
    id: paymentMethodId,
    type,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function handleApayDeposit(payload) {
    payload.payment_system = data?.data?.name;
    payload.data = payload.data || {};
    payload.data.return_url = config.paymentPageUrl;
    const res = await apayDeposit(payload).unwrap();
    if (res?.data?.gateway_url) {
      if (/^https?:\/\//.test(res.data?.gateway_url || "")) {
        window.location.href = res.data.gateway_url;
      } else {
        setQrCodeData({
          link: res.data.gateway_url,
          name: paymentMethod.name,
          amount: payload.amount,
          currency: payload.currency,
          orderId: res.data?.gateway_order_id,
          type: "apay",
          opt2Disabled: true,
        });
      }
    } else {
      throw { message: "Payment gateway URL not found" };
    }
  }

  async function handlePassimpayDeposit(payload) {
    payload.currency_id = data?.data?.gateway_id;
    const res = await passimpayDeposit(payload).unwrap();
    setQrCodeData({
      link: res.makePaymentAddress,
      name: "Binance",
      amount: payload.amount,
      currency: res.cryptoCalculation.currency_details.currency,
      orderId: res.order_id,
      type: "passimpay",
      opt2Disabled: false,
    });
  }

  const onSubmit = async (payload) => {
    try {
      if (type === "apay") {
        await handleApayDeposit(payload);
      } else if (type === "passimpay") {
        await handlePassimpayDeposit(payload);
      }
    } catch (error) {
      toast.error(
        error.data?.message || error?.message || "Internal Server Error"
      );
    }
  };

  if (isLoading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5">Payment</Typography>
          <Button onClick={() => setPaymentMethod(null)} variant="outline">
            <MdKeyboardArrowLeft className="mr-1" />
            Go back
          </Button>
        </div>
        <LoadingIndicator />
      </section>
    );
  }

  if (!data?.data) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5">Payment</Typography>
          <Button onClick={() => setPaymentMethod(null)} variant="outline">
            <MdKeyboardArrowLeft className="mr-1" />
            Go back
          </Button>
        </div>
        <div className="text-center py-8">
          <Typography variant="caption">No payment method found</Typography>
        </div>
      </section>
    );
  }

  const paymentMethod = data.data;
  const form =
    data.data?.deposit_frontend_data &&
    typeof data.data?.deposit_frontend_data === "string"
      ? JSON.parse(data.data.deposit_frontend_data)
      : data.data.deposit_frontend_data;

  const currency =
    paymentMethod.type === "apay" ? paymentMethod.currency : "USD";

  const conversionRate = currencyData?.find(
    (c) => c.to_currency === currency
  )?.rate;

  const amount = watch("amount") || 0;
  const equivalentUSD =
    currency === "USD"
      ? amount
      : conversionRate
      ? (parseFloat(amount) / parseFloat(conversionRate)).toFixed(2)
      : 0;
  const networkFee = data?.data?.fee_network || 0;

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5">{data.data.description}</Typography>
        <Button onClick={() => setPaymentMethod(null)} variant="outline">
          <MdKeyboardArrowLeft className="mr-1" />
          Go back
        </Button>
      </div>

      {/* Payment Method Info Card */}
      <PaymentInfoCard
        conversionRate={conversionRate}
        currency={currency}
        data={data}
        fee={depositFee.cost}
        networkFee={networkFee}
        paymentMethod={paymentMethod}
        type={type}
        formType="Deposit"
      />

      {/* Payment Form */}
      {!qrCodeData ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Amount Field */}
          <div>
            <OutlinedInput
              label={`Amount (${currency})`}
              {...register("amount", {
                required: "Amount is required",
                min: {
                  value: paymentMethod.min_deposit,
                  message: `Minimum deposit amount is ${paymentMethod.min_deposit}`,
                },
                max: {
                  value: paymentMethod.max_deposit,
                  message: `Maximum deposit amount is ${paymentMethod.max_deposit}`,
                },
              })}
              type="number"
              placeholder="Enter amount"
              error={errors.amount?.message}
            />
            {type === "apay" && (
              <Typography variant="body2">
                Equivalent amount:{" "}
                <span className="text-warning">{equivalentUSD}$</span>
              </Typography>
            )}
          </div>

          {form?.form_fields?.map((field) => (
            <OutlinedInput
              key={field.key}
              label={field.label}
              {...register(`data.${field.key}`, field.validation)}
              type={field.type}
              placeholder={field.placeholder}
              error={errors.data?.[field.key]?.message}
            />
          ))}

          <div className="flex justify-end">
            <Typography variant="body2" className="font-medium">
              Deposit Amount:{" "}
              <span className="text-warning">
                {equivalentUSD -
                  (equivalentUSD * networkFee) / 100 -
                  (equivalentUSD * depositFee.cost) / 100}
                $
              </span>
            </Typography>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              loading={apayDepositLoading || passimpayDepositLoading}
              type="submit"
            >
              Deposit
            </Button>
          </div>
        </form>
      ) : (
        <QrCodePayment data={qrCodeData} />
      )}
    </section>
  );
};

export default PaymentForm;
