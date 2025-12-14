"use client";
import { paymentType } from "@/_mock/payment";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { CryptoTransferSchema } from "@/schema/payment";
import { useDepositeWithdrawMutation } from "@/store/features/depositWithdraw";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import Button from "../libs/Button";
import DropdownMenus from "../libs/DropdownMenus";
import IconButton from "../libs/IconButton";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";

const amount = [50, 100, 150];

export default function CryptoTransfer({ data }) {
  const [selectedAmount, setSeletectedAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [deposit, { isLoading }] = useDepositeWithdrawMutation();
  const dollarRate = useGetCostFromCostCenter("dollar_rate");
  const depositFee = useGetCostFromCostCenter("deposit_fee_manual_percentage");

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CryptoTransferSchema),
    defaultValues: {
      wallet_id: "",
      amount: "",
      crypto_wallet_address: "",
      screenshot: null,
    },
  });

  const cryptoWallets =
    data?.map((item) => {
      return {
        label: item.crypto_name,
        value: item.id,
      };
    }) || [];

  async function onSubmit(payload) {
    try {
      payload.amount = (
        parseFloat(payload.amount || 0) / dollarRate.cost
      ).toFixed(4);
      payload.currency = "USDT";
      payload.type = "deposit";
      payload.payment_method = paymentType.crypto_transfer;
      payload.payment_method_gateway = selectedWallet?.crypto_name || "";
      delete payload.wallet_id;

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
      setSelectedWallet(null);
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
          Crypto deposit with Binance
        </Typography>
        {selectedWallet && <CryptoDetails item={selectedWallet} />}
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Select Wallet</label>
          <Controller
            name="wallet_id"
            control={control}
            render={({ field }) => (
              <DropdownMenus
                options={cryptoWallets}
                selected={field.value}
                setSelected={(value) => {
                  field.onChange(value);
                  const wallet = data.find((item) => item.id === value);
                  setSelectedWallet(wallet);
                }}
                error={errors.wallet_id}
                placeholder="Select Wallet"
              />
            )}
          />
          {errors.wallet_id && (
            <Typography variant="error">{errors.wallet_id.message}</Typography>
          )}
        </div>

        <OutlinedInput
          label="Your wallet address"
          placeholder="Enter your wallet address"
          {...register("crypto_wallet_address")}
          error={errors.crypto_wallet_address?.message}
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
                {value} <span className="text-sm">USDT</span>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <OutlinedInput
            label="Upload Screenshot"
            type="file"
            accept="image/*"
            {...register("screenshot")}
            error={errors.screenshot?.message}
          />

          {/* preview image */}
          {screenshot && typeof screenshot[0] === "object" && (
            <Image
              height={80}
              width={80}
              src={URL.createObjectURL(screenshot[0])}
              alt="Screenshot Preview"
              className="size-20 object-cover rounded-md"
            />
          )}
        </div>

        <Typography variant="body2" color="warning" className="font-medium">
          Deposit Fee {depositFee.cost}%
        </Typography>

        <div className="flex flex-col justify-center items-center">
          <div className="mt-2 space-y-2 flex flex-col justify-center items-center">
            <Button type="submit" loading={isLoading} variant="contain">
              Deposit{" "}
              {totalAmount && (
                <span className="text-warning font-medium">
                  {totalAmount} <span className="text-sm">USDT</span>
                </span>
              )}
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

function CryptoDetails({ item }) {
  const [copiedName, setCopiedName] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);

  function handleCopy(text, type) {
    navigator.clipboard.writeText(text);
    if (type === "name") setCopiedName(true);
    if (type === "number") setCopiedNumber(true);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setCopiedName(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copiedName]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopiedNumber(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copiedNumber]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <Typography variant="body2">
          Wallet Name: <br className="md:hidden" />
          {item.crypto_name}
        </Typography>
        <IconButton
          size="sm"
          type="button"
          onClick={() => handleCopy(item.crypto_name, "name")}
        >
          {copiedName ? <FaCheck /> : <FaRegCopy />}
        </IconButton>
      </div>

      <div className="flex items-center gap-2">
        <Typography variant="body2">
          Wallet Address: <br className="md:hidden" />
          {item.wallet_address}
        </Typography>
        <IconButton
          type="button"
          size="sm"
          onClick={() => handleCopy(item.wallet_address, "number")}
        >
          {copiedNumber ? <FaCheck /> : <FaRegCopy />}
        </IconButton>
      </div>

      <div className="mt-2">
        <QRCode
          value={item.wallet_address}
          className="size-20 bg-white p-1 rounded"
        />
        <Typography variant="body2">Scan the QR code</Typography>
      </div>
    </div>
  );
}
