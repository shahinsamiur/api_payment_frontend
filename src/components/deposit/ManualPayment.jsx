import { paymentMethods, paymentType } from "@/_mock/payment";
import BankTransfer from "@/components/deposit/BankTransfer";
import CryptoTransfer from "@/components/deposit/CryptoTransfer";
import MobileDeposit from "@/components/deposit/MobileDeposit";
import Card from "@/components/libs/Card";
import { useGetmanualPaymentMethodsQuery } from "@/store/features/deposit";
import { useState } from "react";
import Typography from "../libs/Typography";

const ManualPayment = () => {
  const [selecMethod, setSelectMethod] = useState(paymentType.mobile_deposit);
  const { data } = useGetmanualPaymentMethodsQuery("deposit");

  return (
    <Card>
      <div className="text-center">
        <Typography variant="h2" align="center">
          Services for worldwide
        </Typography>
        <Typography variant="body2" align="center" className="hidden md:block">
          Secure payments. Global reach, Total peace of mind.
        </Typography>
      </div>
      <div className="space-y-5">
        <div className="flex items-center justify-center flex-wrap gap-5">
          {paymentMethods.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectMethod(item.method)}
              className={`border flex flex-col justify-center items-center rounded-2xl p-4 hover:-translate-y-1 transition-all duration-300 ${
                selecMethod === item.method
                  ? "border-primary-light"
                  : "border-border"
              } `}
            >
              <item.icon
                className={`size-20 ${
                  selecMethod === item.method
                    ? "text-primary-light"
                    : "text-gray-400 dark:text-gray-200"
                }`}
              />
              <Typography
                variant="body1"
                color={selecMethod === item.method ? "primary" : "text"}
              >
                {item.title}
              </Typography>
            </button>
          ))}
        </div>

        {selecMethod === paymentType.mobile_deposit ? (
          <MobileDeposit data={data?.data?.mobile_banking} />
        ) : selecMethod === paymentType.bank_transfer ? (
          <BankTransfer data={data?.data?.bank_transfer} />
        ) : selecMethod === paymentType.crypto_transfer ? (
          <CryptoTransfer data={data?.data?.crypto_wallet} />
        ) : null}
      </div>
    </Card>
  );
};

export default ManualPayment;
