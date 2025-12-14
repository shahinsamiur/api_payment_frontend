import { BsBank2 } from "react-icons/bs";
import { FaBitcoin } from "react-icons/fa";
import { MdOutlineSendToMobile } from "react-icons/md";

export const paymentType = {
  bank_transfer: "bank_transfer",
  crypto_transfer: "crypto_wallet",
  mobile_deposit: "mobile_banking",
};

export const paymentMethods = [
  {
    icon: BsBank2,
    title: "Bank transfer",
    method: paymentType.bank_transfer,
    withdraw: true,
  },
  {
    icon: FaBitcoin,
    title: "Crypto transfer",
    method: paymentType.crypto_transfer,
    withdraw: true,
  },
  {
    icon: MdOutlineSendToMobile,
    title: "Mobile banking",
    method: paymentType.mobile_deposit,
    withdraw: true,
  },
];
