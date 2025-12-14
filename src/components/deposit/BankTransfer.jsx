"use client";
import { paymentType } from "@/_mock/payment";
import Button from "@/components/libs/Button";
import DropdownMenus from "@/components/libs/DropdownMenus";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { BankTransferSchema } from "@/schema/payment";
import { useDepositeWithdrawMutation } from "@/store/features/depositWithdraw";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import IconButton from "../libs/IconButton";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";

const amount = [500, 1000, 1500];

export default function BankTransfer({ data }) {
  const depositFee = useGetCostFromCostCenter("deposit_fee_manual_percentage");
  const [deposit, { isLoading }] = useDepositeWithdrawMutation();
  const dollarRate = useGetCostFromCostCenter("dollar_rate");
  const [selectedAmount, setSeletectedAmount] = useState(0);
  const [selectedBank, setSelectedBank] = useState(null);
  const [totalAmount, setTotalAmount] = useState("");

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BankTransferSchema),
    defaultValues: {
      destination_bank: "",
      bank_name: "",
      bank_branch: "",
      account_holder_name: "",
      bank_account_number: "",
      amount: "",
      screenshot: null,
    },
  });

  const banks = data?.map((item) => ({
    label: item.bank_name,
    value: item.id,
  }));

  async function onSubmit(payload) {
    try {
      payload.amount = (
        parseFloat(payload.amount || 0) / dollarRate.cost
      ).toFixed(4);
      payload.currency = "USD";
      payload.type = "deposit";
      payload.payment_method = paymentType.bank_transfer;
      payload.payment_method_gateway = selectedBank?.bank_name || "";
      delete payload.destination_bank;

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
      setSelectedBank(null);
      setSeletectedAmount(0);
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Internal Server Error"
      );
      reset();
      setTotalAmount("");
    }
  }

  const screenshot = watch("screenshot");

  return (
    <div className="grow space-y-5">
      <div className="space-y-3">
        <Typography variant="h5" className="font-medium">
          Bank Deposit
        </Typography>

        {selectedBank && (
          <div>
            <RenderItem label="Bank Name" value={selectedBank.bank_name} />
            <RenderItem label="Branch Name" value={selectedBank.bank_branch} />
            <RenderItem
              label="Account Name"
              value={selectedBank.account_name}
            />
            <RenderItem
              label="Account Number"
              value={selectedBank.account_number}
            />
            <RenderItem
              label="Routing Number"
              value={selectedBank.routing_number}
            />
            <RenderItem label="SWIFT Code" value={selectedBank.swift_code} />
          </div>
        )}
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Select a Bank</label>
          <Controller
            control={control}
            name="destination_bank"
            render={({ field }) => (
              <DropdownMenus
                options={banks || []}
                selected={field.value}
                setSelected={(value) => {
                  field.onChange(value);
                  const bank = data.find((item) => item.id === value);
                  setSelectedBank(bank);
                }}
                error={errors.destination_bank}
                placeholder="Select a Bank"
              />
            )}
          />
          {errors.destination_bank && (
            <Typography variant="error">
              {errors.destination_bank.message}
            </Typography>
          )}
        </div>

        <OutlinedInput
          label="Your bank name"
          placeholder="Enter bank name"
          {...register("bank_name")}
          error={errors.bank_name?.message}
        />

        <OutlinedInput
          label="Your bank branch"
          placeholder="Enter branch name"
          {...register("bank_branch")}
          error={errors.bank_branch?.message}
        />

        <OutlinedInput
          label="Your account holder name"
          placeholder="Enter account holder name"
          {...register("account_holder_name")}
          error={errors.account_holder_name?.message}
        />

        <OutlinedInput
          label="Your account number"
          placeholder="Enter account number"
          {...register("bank_account_number")}
          error={errors.bank_account_number?.message}
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
                variant={value == selectedAmount ? "contain" : "outline"}
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
              Deposit ${" "}
              {(
                (parseFloat(totalAmount || 0) / dollarRate.cost) *
                (1 - depositFee.cost / 100)
              ).toFixed(4)}
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

function RenderItem({ label, value }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value);
    setCopied(true);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <Typography variant="body2">
      {label}: {value}
      <IconButton type="button" size="sm" onClick={handleCopy}>
        {copied ? <FaCheck /> : <FaRegCopy />}
      </IconButton>
    </Typography>
  );
}
