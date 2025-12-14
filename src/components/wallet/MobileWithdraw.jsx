import { paymentType } from "@/_mock/payment";
import Button from "@/components/libs/Button";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { MObileWithdrawSchema } from "@/schema/payment";
import { useDepositeWithdrawMutation } from "@/store/features/depositWithdraw";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DropdownMenus from "../libs/DropdownMenus";
import OutlinedInput from "../libs/OutlinedInput";
import Typography from "../libs/Typography";
import NotVarifiedBudge from "./NotVarifiedBudge";
const amount = [10, 100, 150];

const MobileWithdraw = ({ data }) => {
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
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(MObileWithdrawSchema),
    defaultValues: {
      amount: "",
      mobile_banking_number: "",
      payment_method_gateway: "",
    },
  });

  const totalAmount = watch("amount");

  const paymentGatewayOptions =
    data?.map((item) => ({
      label: item.mobile_banking_name,
      value: item.mobile_banking_name,
    })) || [];

  async function onSubmit(payload) {
    try {
      payload.currency = "USD";
      payload.type = "withdraw";
      payload.payment_method = paymentType.mobile_deposit;
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
      <div>
        <label>Your Mobile Banking Name</label>
        <Controller
          name="payment_method_gateway"
          control={control}
          render={({ field }) => (
            <DropdownMenus
              selected={field.value}
              setSelected={field.onChange}
              error={errors.payment_method_gateway}
              options={paymentGatewayOptions}
              placeholder="Select payment gateway"
            />
          )}
        />
        {errors.payment_method_gateway && (
          <Typography variant="error">
            {errors.payment_method_gateway.message}
          </Typography>
        )}
      </div>

      <OutlinedInput
        label="Mobile banking number"
        {...register("mobile_banking_number")}
        type="number"
        placeholder="Enter your mobile banking number"
        error={errors.mobile_banking_number?.message}
      />

      <div>
        <label>Amount</label>
        <div className="flex items-start justify-between gap-5 lg:gap-10">
          <div className="grow">
            <OutlinedInput
              label="Amount $"
              type="number"
              placeholder="Enter amount $"
              error={errors.amount?.message}
              {...register("amount")}
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
            <Typography align="center" className="input">
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

export default MobileWithdraw;
