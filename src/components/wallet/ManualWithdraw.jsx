import { paymentMethods, paymentType } from "@/_mock/payment";
import Button from "@/components/libs/Button";
import Card from "@/components/libs/Card";
import BankWithdraw from "@/components/wallet/BankWithdraw";
import CryptoWithdraw from "@/components/wallet/CryptoWithdraw";
import MobileWithdraw from "@/components/wallet/MobileWithdraw";
import useGetCostFromCostCenter from "@/hooks/useGetCostFromCostCenter";
import { useGetmanualPaymentMethodsQuery } from "@/store/features/deposit";
import { useState } from "react";
import { useSelector } from "react-redux";
import Typography from "../libs/Typography";

function ManualWithdraw() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentType.mobile_deposit
  );

  const { user } = useSelector((state) => state.user);
  const { generalData } = useSelector((state) => state.settings);
  const withdrawFee = useGetCostFromCostCenter(
    "withdrawal_fee_manual_percentage"
  );
  const dollarRate = useGetCostFromCostCenter("dollar_rate");
  const { data } = useGetmanualPaymentMethodsQuery("withdraw");

  return (
    <Card className="!px-0 !space-y-4">
      <div className="space-y-1 p-3 md:p-7 border-b dark:border-b-border">
        <div className="flex items-center justify-between">
          <Typography variant="h4">Withdraw</Typography>
          <Typography variant="body2" color="warning">
            $ {user?.wallet_balance?.earning_balance}
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <Typography variant="body2" color="warning">
            Minimum ${generalData?.withdraw_min_amount} /
            <span className="text-lg xl:text-xl">৳</span>
            {(
              parseFloat(generalData?.withdraw_min_amount || 0) *
              dollarRate.cost
            ).toFixed(4)}{" "}
            <span></span>& Admin Fee {withdrawFee.cost || 0}%
          </Typography>
          <Typography variant="h5">
            <span className="text-xl md:text-2xl">৳</span>
            {parseFloat(user?.wallet_balance?.earning_balance || 0) *
              dollarRate.cost}
          </Typography>
        </div>
      </div>

      <div className="px-3 md:px-7 ">
        <Typography variant="body1">Select Payment method</Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 ">
          {paymentMethods.map((method, index) => (
            <Button
              type="button"
              onClick={() => setSelectedPaymentMethod(method.method)}
              className="justify-start"
              key={index}
              variant={
                method.method === selectedPaymentMethod ? "contain" : "outline"
              }
            >
              <method.icon className="text-xl" />
              <Typography variant="body2">{method.title}</Typography>
            </Button>
          ))}
        </div>

        {selectedPaymentMethod === paymentType.bank_transfer ? (
          <BankWithdraw />
        ) : selectedPaymentMethod === paymentType.mobile_deposit ? (
          <MobileWithdraw data={data?.data?.mobile_banking} />
        ) : selectedPaymentMethod === paymentType.crypto_transfer ? (
          <CryptoWithdraw />
        ) : null}
      </div>
    </Card>
  );
}

export default ManualWithdraw;
