"use client";
import React, { useState } from "react";
import Card from "../libs/Card";
import PaymentForm from "./PaymentForm";
import PaymentMethods from "./PaymentMethods";

const AutomaticPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [crypto, setCrypto] = useState(false);
  const [type, setType] = useState("");

  return (
    <Card>
      {paymentMethod ? (
        <PaymentForm
          setPaymentMethod={setPaymentMethod}
          paymentMethodId={paymentMethod}
          type={type}
        />
      ) : (
        <PaymentMethods
          setPaymentMethod={setPaymentMethod}
          title="to deposit"
          type="deposit"
          setGatewayType={setType}
          crypto={crypto}
          setCrypto={setCrypto}
        />
      )}
    </Card>
  );
};

export default AutomaticPayment;
