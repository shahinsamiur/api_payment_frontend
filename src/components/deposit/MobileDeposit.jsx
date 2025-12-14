"use client";
import { paymentType } from "@/_mock/payment";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { MobileTransferSchema } from "@/schema/payment";
import { useDepositeWithdrawMutation } from "@/store/features/depositWithdraw";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import DropdownMenus from "../libs/DropdownMenus";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";

const amount = [500, 1000, 1500];

export default function MobileDeposit({ data }) {
  const [selectedAmount, setSeletectedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [deposit, { isLoading }] = useDepositeWithdrawMutation();
  const [accuountNo, setAccountNo] = useState("");
  const dollarRate = useGetCostFromCostCenter("dollar_rate");
  const depositFee = useGetCostFromCostCenter("deposit_fee_manual_percentage");

  const paymentMethods =
    data?.map((item) => {
      return {
        label: item.mobile_banking_name,
        value: item.id,
      };
    }) || [];

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MobileTransferSchema),
    defaultValues: {
      payment_method_id: "",
      mobile_transaction_id: "",
      mobile_banking_number: "",
      amount: "",
      screenshot: null,
    },
  });

  async function onSubmit(payload) {
    try {
      payload.amount = (
        parseFloat(payload.amount || 0) / dollarRate.cost
      ).toFixed(4);
      payload.currency = "USD";
      payload.type = "deposit";
      payload.payment_method = paymentType.mobile_deposit;
      payload.payment_method_gateway = data.find(
        (item) => parseInt(item.id) === parseInt(payload.payment_method_id)
      )?.mobile_banking_name;
      delete payload.payment_method_id;

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "screenshot" && typeof value[0] === "object") {
          formData.append(key, value[0]);
        } else {
          formData.append(key, value);
        }
      });

      await deposit(formData).unwrap();
      toast.success("Deposit request sent successfully");
      reset();
      setTotalAmount("");
      setAccountNo("");
      setSeletectedAmount(0);
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Internal Server Error"
      );
      setTotalAmount("");
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  function handleCopy() {
    navigator.clipboard.writeText(accuountNo);
    setCopied(true);
  }

  const screenshot = watch("screenshot");

  return (
    <div className="grow space-y-5">
      <div className="space-y-3">
        <Typography variant="h5" className="font-medium">
          Mobile Deposit
        </Typography>
        <Typography variant="body2">
          <span className="text-warning font-medium">
            Do send money at this number:
          </span>{" "}
          <br className="md:hidden" />
          <span className="dark:text-white">
            {accuountNo || "Select payment method"}
          </span>
          {accuountNo && (
            <button
              type="button"
              className="dark:text-white inline ml-1 md:ml-2"
              onClick={handleCopy}
            >
              {copied ? <FaCheck /> : <FaRegCopy />}
            </button>
          )}
        </Typography>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Payment Gateway</label>
          <Controller
            name="payment_method_id"
            control={control}
            render={({ field }) => (
              <DropdownMenus
                options={paymentMethods}
                selected={field.value}
                setSelected={(value) => {
                  field.onChange(value);
                  const method = data?.find((item) => item.id === value);
                  if (method) {
                    setAccountNo(method.mobile_banking_number);
                  }
                }}
                placeholder="Select"
                error={errors.payment_method_id}
              />
            )}
          />
          {errors.payment_method_id && (
            <Typography variant="error">
              {errors.payment_method_id.message}
            </Typography>
          )}
        </div>

        <OutlinedInput
          type="number"
          label="Your number"
          {...register("mobile_banking_number")}
          placeholder="Enter your number"
          error={errors.mobile_banking_number?.message}
        />

        <OutlinedInput
          label="Transaction ID"
          {...register("mobile_transaction_id")}
          placeholder="Enter transaction ID"
          error={errors.mobile_transaction_id?.message}
        />

        <div>
          <OutlinedInput
            label="Deposit amount"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter amount in BDT"
            value={totalAmount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                const normalized = value.replace(/^0+(?!$)/, ""); // remove leading zeroes
                setTotalAmount(normalized);
                setValue("amount", normalized, { shouldValidate: true });
              }
            }}
            error={errors.amount?.message}
          />
          <div className="mt-2 flex gap-2 flex-wrap">
            {amount.map((value, index) => (
              <Button
                type="button"
                key={index}
                variant={value === selectedAmount ? "contain" : "outline"}
                onClick={() => {
                  setSeletectedAmount(value);
                  setTotalAmount(value);
                  setValue("amount", value, { shouldValidate: true });
                }}
              >
                BDT {value}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <OutlinedInput
            label="Upload screenshot"
            type="file"
            accept="image/*"
            {...register("screenshot")}
            error={errors.screenshot?.message}
          />
          {/* preview image */}
          {screenshot && typeof screenshot[0] === "object" && (
            <div className="mt-2">
              <Image
                height={80}
                width={80}
                src={URL.createObjectURL(screenshot[0])}
                alt="preview"
                className="size-20 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <Typography variant="body2" color="warning" className="font-medium">
          Deposit Fee {depositFee.cost}%
        </Typography>

        <div className="flex flex-col justify-center items-center">
          <div className="mt-2 space-y-2 flex flex-col justify-center items-center">
            <Button type="submit" loading={isLoading} variant="contain">
              Deposit{" "}
              {totalAmount
                ? `$ ${(
                    (parseFloat(totalAmount || 0) / dollarRate.cost) *
                    (1 - depositFee.cost / 100)
                  ).toFixed(4)}`
                : ""}
            </Button>
            <Typography variant="body2" color="warning" className="font-medium">
              How to deposit?
            </Typography>
          </div>
        </div>
      </form>
    </div>
  );
}
