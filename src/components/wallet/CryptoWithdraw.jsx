import { paymentType } from "@/_mock/payment";
import Button from "@/components/libs/Button";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { CryptoWithdrawSchema } from "@/schema/payment";
import { useDepositeWithdrawMutation } from "@/store/features/depositWithdraw";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";
import NotVarifiedBudge from "./NotVarifiedBudge";
const amount = [10, 100, 150];

const CryptoWithdraw = () => {
  const [selectedAmount, setSeletectedAmount] = useState(0);
  const [withDrowBallance, { isLoading }] = useDepositeWithdrawMutation();
  const { user } = useSelector((state) => state.user);
  const withdrawFee = useGetCostFromCostCenter(
    "withdrawal_fee_manual_percentage"
  );
  const dollarRate = useGetCostFromCostCenter("dollar_rate");

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(CryptoWithdrawSchema),
    defaultValues: {
      crypto_wallet_address: "",
      amount: "",
    },
  });

  const totalAmount = watch("amount");

  async function onSubmit(payload) {
    try {
      payload.currency = "USDT";
      payload.type = "withdraw";
      payload.payment_method = paymentType.crypto_transfer;
      await withDrowBallance(payload).unwrap();
      toast.success("Withdraw request successfully sent");
      reset();
      setSeletectedAmount(0);
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || "Internal Server Error"
      );
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-3">
      <OutlinedInput
        label="Wallet address (USDT TRC20 wallet)"
        {...register("crypto_wallet_address")}
        type="text"
        placeholder="Wallet address (USDT TRC20 wallet)"
        error={errors.crypto_wallet_address?.message}
      />

      <div>
        <div className="flex items-start justify-between gap-5 lg:gap-10">
          <div className="grow">
            <OutlinedInput
              label="Amount $"
              type="number"
              placeholder="Enter amount $"
              {...register("amount", { required: true })}
              error={errors.amount?.message}
            />

            <Typography variant="body2">
              $1 = {dollarRate.cost} BDT // Payout{" "}
              <span className="text-warning">
                {(
                  parseFloat(totalAmount || 0) *
                  (1 - withdrawFee.cost / 100) *
                  dollarRate.cost
                ).toFixed(4)}{" "}
                BDT
              </span>
            </Typography>
          </div>

          <div className="space-y-3">
            <Typography align="center" variant="body2" className="input">
              Fee $
              {(
                parseFloat(totalAmount || 0) *
                (withdrawFee.cost / 100)
              ).toFixed(4)}
            </Typography>
            <div className="!border-warning input flex items-center gap-5 flex-nowrap">
              <Typography variant="body2" color="warning">
                Total:
              </Typography>
              <Typography variant="body2" className="text-nowrap">
                $
                {(
                  parseFloat(totalAmount || 0) *
                  (1 - withdrawFee.cost / 100)
                ).toFixed(4)}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mb-3 mt-2 md:mt-0">
          {amount.map((value, index) => (
            <Button
              type="button"
              key={index}
              variant={value == selectedAmount ? "contain" : "outline"}
              onClick={() => {
                setSeletectedAmount(value);
                setValue("amount", value, {
                  shouldValidate: true,
                });
              }}
            >
              $ {value}
            </Button>
          ))}
        </div>
        {!user?.is_verified ? (
          <NotVarifiedBudge message="Please verify your account first" />
        ) : (
          <div className="mt-5">
            <Button
              loading={isLoading}
              disabled={
                parseInt(user?.wallet_balance?.earning_balance || 0) <
                parseInt(totalAmount || 0)
              }
              variant="contain"
            >
              {parseInt(user?.wallet_balance?.earning_balance || 0) <
              parseInt(totalAmount || 0)
                ? "Not enough balance"
                : "Withdraw"}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default CryptoWithdraw;
