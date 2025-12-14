import * as yup from "yup";

export const BankTransferSchema = yup.object().shape({
  destination_bank: yup.string().required("Destination bank is required"),
  amount: yup.string().required("Amount is required"),
  bank_name: yup.string().required("Bank name is required"),
  bank_branch: yup.string().required("Bank branch is required"),
  account_holder_name: yup.string().required("Account holder name is required"),
  bank_account_number: yup.string().required("Bank account number is required"),
  screenshot: yup.mixed().optional(),
});

export const CryptoTransferSchema = yup.object().shape({
  wallet_id: yup.string().required("Wallet ID is required"),
  amount: yup.string().required("Amount is required"),
  crypto_wallet_address: yup.string().required("Wallet address is required"),
  screenshot: yup.mixed().optional(),
});

export const MobileTransferSchema = yup.object().shape({
  mobile_transaction_id: yup.string().required("Transaction ID is required"),
  mobile_banking_number: yup.string().required("Number is required"),
  amount: yup.string().required("Amount is required"),
  payment_method_id: yup.string().required("Payment method is required"),
  screenshot: yup.mixed().optional(),
});

export const BankWithdrawSchema = yup.object().shape({
  amount: yup.string().required("Amount is required"),
  bank_name: yup.string().required("Bank name is required"),
  bank_branch: yup.string().required("Bank branch is required"),
  account_holder_name: yup.string().required("Account holder name is required"),
  bank_account_number: yup.string().required("Bank account number is required"),
});

export const CryptoWithdrawSchema = yup.object().shape({
  amount: yup.string().required("Amount is required"),
  crypto_wallet_address: yup
    .string()
    .required("Crypto wallet address is required"),
});

export const MObileWithdrawSchema = yup.object().shape({
  amount: yup.string().required("Amount is required"),
  mobile_banking_number: yup
    .string()
    .required("Mobile banking number is required"),
  payment_method_gateway: yup
    .string()
    .required("Payment method gateway is required"),
});
