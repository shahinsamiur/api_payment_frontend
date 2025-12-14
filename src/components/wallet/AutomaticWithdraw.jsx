import React, { useState } from "react";
import PaymentMethods from "../deposit/PaymentMethods";
import Card from "../libs/Card";
import WithdrawForm from "./WithdrawForm";

const AutomaticWithdraw = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [crypto, setCrypto] = useState(false);
  const [type, setType] = useState("");

  return (
    <Card>
      {paymentMethod ? (
        <WithdrawForm
          setPaymentMethod={setPaymentMethod}
          paymentMethodId={paymentMethod}
          type={type}
        />
      ) : (
        <PaymentMethods
          setPaymentMethod={setPaymentMethod}
          setGatewayType={setType}
          title="to withdraw"
          type="withdrawal"
          crypto={crypto}
          setCrypto={setCrypto}
        />
      )}
    </Card>
  );
};

export default AutomaticWithdraw;
